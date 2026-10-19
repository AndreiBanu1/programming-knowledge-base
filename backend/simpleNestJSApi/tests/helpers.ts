import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import request from 'supertest'
import { AppModule } from '../src/app.module.js'
import { setupDocs } from '../src/docs.js'
import { SHIPMENT_FILE } from '../src/shipment.repository.js'

export const SEED = [
  { id: 'SHP-2026-0001', weight: 2.5, content: 'Keyboard', status: 'delivered' },
  { id: 'SHP-2026-0002', weight: 18.0, content: 'Chair', status: 'in_transit' },
  { id: 'SHP-2026-0003', weight: 0.8, content: 'Cables', status: 'processing' },
]

export function makeDataFile(): string {
  const file = join(mkdtempSync(join(tmpdir(), 'shipments-')), 'shipments.json')
  writeFileSync(file, JSON.stringify(SEED))
  return file
}

export interface TestApp {
  app: INestApplication
  dataFile: string
  http: ReturnType<typeof request>
}

export async function createTestApp(): Promise<TestApp> {
  const dataFile = makeDataFile()
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(SHIPMENT_FILE)
    .useValue(dataFile)
    .compile()

  const app = moduleRef.createNestApplication({ logger: false })
  setupDocs(app)
  await app.init()

  return { app, dataFile, http: request(app.getHttpServer()) }
}
