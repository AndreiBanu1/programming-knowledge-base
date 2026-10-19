import { Injectable } from '@nestjs/common'
import type { CreateShipmentDto } from './dto/create-shipment.dto.js'
import type { PatchShipmentDto } from './dto/patch-shipment.dto.js'
import { InvalidFieldError, InvalidWeightError, ShipmentNotFoundError } from './shipment.errors.js'
import { SHIPMENT_FIELDS, type Shipment } from './shipment.model.js'
import { ShipmentRepository } from './shipment.repository.js'

@Injectable()
export class ShipmentService {
  constructor(private readonly repo: ShipmentRepository) {}

  listShipments(): Shipment[] {
    return this.repo.getAll()
  }

  getShipment(id: string): Shipment {
    const shipment = this.repo.getById(id)
    if (!shipment) throw new ShipmentNotFoundError(id)
    return shipment
  }

  getLatest(): Shipment {
    const shipment = this.repo.getLast()
    if (!shipment) throw new ShipmentNotFoundError('latest')
    return shipment
  }

  createShipment(dto: CreateShipmentDto): Shipment {
    if (dto.weight <= 0 || dto.weight > 100) throw new InvalidWeightError(dto.weight)

    return this.repo.addShipment({
      id: this.repo.nextId(),
      weight: dto.weight,
      content: dto.content,
      status: 'pending',
    })
  }

  getShipmentField(field: string, id: string): Record<string, unknown> {
    const shipment = this.getShipment(id)
    if (!(SHIPMENT_FIELDS as readonly string[]).includes(field)) throw new InvalidFieldError(field)
    return { [field]: shipment[field as keyof Shipment] }
  }

  updateShipment(id: string, dto: CreateShipmentDto): Shipment {
    const shipment = this.getShipment(id)
    return this.repo.updateShipment({ ...shipment, weight: dto.weight, content: dto.content })
  }

  patchShipment(id: string, patch: PatchShipmentDto): Shipment {
    const shipment = this.getShipment(id)
    const changes = Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== null && value !== undefined),
    )
    return this.repo.updateShipment({ ...shipment, ...changes })
  }

  deleteShipment(id: string): void {
    this.getShipment(id)
    this.repo.deleteShipment(id)
  }
}
