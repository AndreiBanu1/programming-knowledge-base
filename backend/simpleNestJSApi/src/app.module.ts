import { Module } from '@nestjs/common'
import { ShipmentModule } from './shipment.module.js'

@Module({ imports: [ShipmentModule] })
export class AppModule {}
