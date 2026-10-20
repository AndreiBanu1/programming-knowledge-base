import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ShipmentNotFoundError } from '../src/shipment/shipment.errors.js'
import { ShipmentRepository } from '../src/shipment/shipment.repository.js'
import { makeDataFile } from './helpers.js'

let dataFile: string
let repo: ShipmentRepository

const saved = () => JSON.parse(readFileSync(dataFile, 'utf-8')) as { id: string; content: string }[]

beforeEach(() => {
  dataFile = makeDataFile()
  repo = new ShipmentRepository(dataFile)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('ShipmentRepository', () => {
  it('returns undefined for an unknown id', () => {
    expect(repo.getById('nope')).toBeUndefined()
  })

  it('returns the final shipment as the last one', () => {
    expect(repo.getLast()?.id).toBe('SHP-2026-0003')
  })

  describe('nextId', () => {
    it('follows the highest number for the current year', () => {
      vi.useFakeTimers({ now: new Date('2026-06-01') })
      expect(repo.nextId()).toBe('SHP-2026-0004')
    })

    it('restarts numbering in a new year', () => {
      vi.useFakeTimers({ now: new Date('2027-06-01') })
      expect(repo.nextId()).toBe('SHP-2027-0001')
    })
  })

  it('appends a shipment and persists it', () => {
    repo.addShipment({ id: 'SHP-2026-0004', weight: 1, content: 'New', status: 'pending' })

    expect(saved().map((s) => s.id).at(-1)).toBe('SHP-2026-0004')
    expect(saved()).toHaveLength(4)
    expect(new ShipmentRepository(dataFile).getById('SHP-2026-0004')).toBeDefined()
  })

  it('replaces the row on update instead of duplicating it', () => {
    const updated = { ...repo.getById('SHP-2026-0001')!, content: 'Changed' }
    repo.updateShipment(updated)

    const rows = saved()
    expect(rows).toHaveLength(3)
    expect(rows.filter((s) => s.id === 'SHP-2026-0001')).toEqual([
      { id: 'SHP-2026-0001', weight: 2.5, content: 'Changed', status: 'delivered' },
    ])
    expect(rows[0]?.id).toBe('SHP-2026-0001')
  })

  it('throws when updating a shipment that does not exist', () => {
    expect(() =>
      repo.updateShipment({ id: 'NOPE', weight: 1, content: 'x', status: 'pending' }),
    ).toThrow(ShipmentNotFoundError)
  })

  it('removes a row and persists the removal', () => {
    repo.deleteShipment('SHP-2026-0002')

    expect(saved().map((s) => s.id)).toEqual(['SHP-2026-0001', 'SHP-2026-0003'])
    expect(repo.getById('SHP-2026-0002')).toBeUndefined()
    expect(new ShipmentRepository(dataFile).getById('SHP-2026-0002')).toBeUndefined()
  })
})
