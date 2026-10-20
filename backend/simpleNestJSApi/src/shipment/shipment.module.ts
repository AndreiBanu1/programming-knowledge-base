import { Module } from '@nestjs/common'
import { fileURLToPath } from 'node:url'
import { ShipmentController } from './shipment.controller.js'
import { SHIPMENT_FILE, ShipmentRepository } from './shipment.repository.js'
import { ShipmentService } from './shipment.service.js'

export const DEFAULT_SHIPMENT_FILE = fileURLToPath(new URL('../../shipments.json', import.meta.url))

@Module({
  controllers: [ShipmentController],
  providers: [
    { provide: SHIPMENT_FILE, useValue: DEFAULT_SHIPMENT_FILE },
    ShipmentRepository,
    ShipmentService,
  ],
})
export class ShipmentModule {}
