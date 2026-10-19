import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createTestApp, type TestApp } from './helpers.js'

let t: TestApp

beforeEach(async () => {
  t = await createTestApp()
})

afterEach(async () => {
  await t.app.close()
})

const ids = (body: { id: string }[]) => body.map((s) => s.id)

describe('read', () => {
  it('lists all shipments', async () => {
    const res = await t.http.get('/shipments')
    expect(res.status).toBe(200)
    expect(ids(res.body)).toEqual(['SHP-2026-0001', 'SHP-2026-0002', 'SHP-2026-0003'])
  })

  it('gets a shipment by id', async () => {
    const res = await t.http.get('/shipment/SHP-2026-0002')
    expect(res.status).toBe(200)
    expect(res.body.content).toBe('Chair')
  })

  it('404s for an unknown id', async () => {
    const res = await t.http.get('/shipment/NOPE')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Shipment not found')
  })

  it('returns the last shipment for /latest (not treated as an id)', async () => {
    const res = await t.http.get('/shipment/latest')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe('SHP-2026-0003')
  })
})

describe('field', () => {
  it('returns only the requested field', async () => {
    const res = await t.http.get('/shipment/SHP-2026-0001/weight')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ weight: 2.5 })
  })

  it.each(['/shipment/SHP-2026-0001/bogus', '/shipment/NOPE/weight'])('404s for %s', async (path) => {
    expect((await t.http.get(path)).status).toBe(404)
  })

  it('explains which part is missing', async () => {
    const badField = await t.http.get('/shipment/SHP-2026-0001/bogus')
    expect(badField.body.message).toBe("Field 'bogus' does not exist")

    const badId = await t.http.get('/shipment/NOPE/weight')
    expect(badId.body.message).toBe('Shipment not found')
  })
})

describe('create', () => {
  it('creates a pending shipment with the next id', async () => {
    const res = await t.http.post('/shipment').send({ weight: 3.2, content: 'Test box' })

    expect(res.status).toBe(201)
    expect(res.body.status).toBe('pending')
    expect(res.body.weight).toBe(3.2)
    expect(res.body.id).toMatch(/-0004$/)
  })

  it('makes the created shipment retrievable', async () => {
    const created = await t.http.post('/shipment').send({ weight: 1, content: 'x' })

    expect((await t.http.get(`/shipment/${created.body.id}`)).status).toBe(200)
    expect((await t.http.get('/shipments')).body).toHaveLength(4)
  })

  it('gives consecutive creates increasing ids', async () => {
    const first = await t.http.post('/shipment').send({ weight: 1, content: 'a' })
    const second = await t.http.post('/shipment').send({ weight: 1, content: 'b' })

    expect(first.body.id).toMatch(/-0004$/)
    expect(second.body.id).toMatch(/-0005$/)
  })

  it.each([0, -1, 100.01, 500])('rejects weight %s with 422 and saves nothing', async (weight) => {
    const res = await t.http.post('/shipment').send({ weight, content: 'x' })

    expect(res.status).toBe(422)
    expect((await t.http.get('/shipments')).body).toHaveLength(3)
  })

  it.each([0.01, 100])('accepts boundary weight %s', async (weight) => {
    expect((await t.http.post('/shipment').send({ weight, content: 'x' })).status).toBe(201)
  })

  it('422s when content is missing', async () => {
    expect((await t.http.post('/shipment').send({ weight: 1 })).status).toBe(422)
  })

  it('422s when weight is not a number', async () => {
    expect((await t.http.post('/shipment').send({ weight: 'abc', content: 'x' })).status).toBe(422)
  })

  it('ignores unknown fields and cannot set id or status', async () => {
    const res = await t.http
      .post('/shipment')
      .send({ weight: 1, content: 'x', id: 'HACK', status: 'delivered' })

    expect(res.status).toBe(201)
    expect(res.body.id).toMatch(/-0004$/)
    expect(res.body.status).toBe('pending')
  })
})

describe('update (PUT)', () => {
  it('replaces weight and content but keeps id and status', async () => {
    const res = await t.http.put('/shipment/SHP-2026-0001').send({ weight: 5, content: 'Changed' })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 'SHP-2026-0001',
      weight: 5,
      content: 'Changed',
      status: 'delivered',
    })
  })

  it('does not create a duplicate', async () => {
    await t.http.put('/shipment/SHP-2026-0001').send({ weight: 5, content: 'Changed' })

    const list = (await t.http.get('/shipments')).body
    expect(list).toHaveLength(3)
    expect(ids(list).filter((id) => id === 'SHP-2026-0001')).toHaveLength(1)
  })

  it('404s for an unknown id', async () => {
    expect((await t.http.put('/shipment/NOPE').send({ weight: 5, content: 'x' })).status).toBe(404)
  })

  it('rejects an invalid weight and leaves the data unchanged', async () => {
    const res = await t.http.put('/shipment/SHP-2026-0001').send({ weight: 500, content: 'x' })

    expect(res.status).toBe(422)
    expect((await t.http.get('/shipment/SHP-2026-0001')).body.content).toBe('Keyboard')
  })
})

describe('patch', () => {
  it('changes only the fields that were sent', async () => {
    const res = await t.http.patch('/shipment/SHP-2026-0001').send({ content: 'Patched' })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 'SHP-2026-0001',
      weight: 2.5,
      content: 'Patched',
      status: 'delivered',
    })
  })

  it('can change the status', async () => {
    const res = await t.http.patch('/shipment/SHP-2026-0001').send({ status: 'in_transit' })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('in_transit')
  })

  it('treats an explicit null as not sent', async () => {
    const res = await t.http.patch('/shipment/SHP-2026-0001').send({ weight: null })

    expect(res.status).toBe(200)
    expect(res.body.weight).toBe(2.5)
  })

  it.each([
    ['weight out of range', { weight: 500 }],
    ['weight of the wrong type', { weight: 'abc' }],
    ['unknown status', { status: 'banana' }],
    ['unknown field', { hacker: 1 }],
    ['id', { id: 'SHP-2026-0002' }],
  ])('rejects %s with 422 and changes nothing', async (_label, body) => {
    const res = await t.http.patch('/shipment/SHP-2026-0001').send(body)

    expect(res.status).toBe(422)
    const unchanged = await t.http.get('/shipment/SHP-2026-0001')
    expect(unchanged.body).toEqual({
      id: 'SHP-2026-0001',
      weight: 2.5,
      content: 'Keyboard',
      status: 'delivered',
    })
    expect(ids((await t.http.get('/shipments')).body)).toHaveLength(3)
  })

  it('404s for an unknown id', async () => {
    expect((await t.http.patch('/shipment/NOPE').send({ content: 'x' })).status).toBe(404)
  })
})

describe('delete', () => {
  it('deletes a shipment and answers 204 with no body', async () => {
    const res = await t.http.delete('/shipment/SHP-2026-0002')

    expect(res.status).toBe(204)
    expect(res.text).toBe('')
  })

  it('removes the shipment from reads', async () => {
    await t.http.delete('/shipment/SHP-2026-0002')

    expect((await t.http.get('/shipment/SHP-2026-0002')).status).toBe(404)
    expect(ids((await t.http.get('/shipments')).body)).toEqual(['SHP-2026-0001', 'SHP-2026-0003'])
  })

  it('404s for an unknown id and keeps the data', async () => {
    expect((await t.http.delete('/shipment/NOPE')).status).toBe(404)
    expect((await t.http.get('/shipments')).body).toHaveLength(3)
  })

  it('404s on a second delete of the same id', async () => {
    expect((await t.http.delete('/shipment/SHP-2026-0001')).status).toBe(204)
    expect((await t.http.delete('/shipment/SHP-2026-0001')).status).toBe(404)
  })
})

describe('docs', () => {
  it('serves the OpenAPI spec and the Scalar UI', async () => {
    expect((await t.http.get('/openapi.json')).status).toBe(200)
    expect((await t.http.get('/scalar')).status).toBe(200)
  })
})
