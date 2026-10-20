import { Inject, Injectable } from '@nestjs/common'
import { readFileSync, writeFileSync } from 'node:fs'
import { ShipmentNotFoundError } from './shipment.errors.js'
import type { Shipment } from './shipment.model.js'

export const SHIPMENT_FILE = Symbol('SHIPMENT_FILE')

@Injectable()
export class ShipmentRepository {
  private shipments: Shipment[]
  private byId: Map<string, Shipment>

  constructor(@Inject(SHIPMENT_FILE) private readonly dataFile: string) {
    this.shipments = JSON.parse(readFileSync(dataFile, 'utf-8')) as Shipment[]
    this.byId = new Map(this.shipments.map((s) => [s.id, s]))
  }

  getAll(): Shipment[] {
    return this.shipments
  }

  getById(id: string): Shipment | undefined {
    return this.byId.get(id)
  }

  getLast(): Shipment | undefined {
    return this.shipments.at(-1)
  }

  nextId(): string {
    const prefix = `SHP-${new Date().getFullYear()}-`
    const used = this.shipments
      .filter((s) => s.id.startsWith(prefix) && /^\d+$/.test(s.id.slice(prefix.length)))
      .map((s) => Number(s.id.slice(prefix.length)))
    const next = Math.max(0, ...used) + 1
    return `${prefix}${String(next).padStart(4, '0')}`
  }

  addShipment(shipment: Shipment): Shipment {
    this.shipments.push(shipment)
    this.byId.set(shipment.id, shipment)
    this.save()
    return shipment
  }

  updateShipment(shipment: Shipment): Shipment {
    const index = this.shipments.findIndex((s) => s.id === shipment.id)
    if (index === -1) throw new ShipmentNotFoundError(shipment.id)
    this.shipments[index] = shipment
    this.byId.set(shipment.id, shipment)
    this.save()
    return shipment
  }

  deleteShipment(id: string): void {
    this.shipments = this.shipments.filter((s) => s.id !== id)
    this.byId.delete(id)
    this.save()
  }

  private save(): void {
    writeFileSync(this.dataFile, JSON.stringify(this.shipments, null, 2))
  }
}
