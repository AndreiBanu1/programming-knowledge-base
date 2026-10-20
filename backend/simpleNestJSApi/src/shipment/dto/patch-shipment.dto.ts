import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Max } from 'class-validator'
import { SHIPMENT_STATUSES, type ShipmentStatus } from '../shipment.model.js'

export class PatchShipmentDto {
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Weight must be between 0 and 100' })
  @Max(100, { message: 'Weight must be between 0 and 100' })
  weight?: number | null

  @IsOptional()
  @IsString()
  content?: string | null

  @IsOptional()
  @IsIn(SHIPMENT_STATUSES)
  status?: ShipmentStatus | null
}
