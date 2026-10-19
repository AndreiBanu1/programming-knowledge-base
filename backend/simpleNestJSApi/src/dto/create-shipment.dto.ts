import { IsNumber, IsPositive, IsString, Max } from 'class-validator'

export class CreateShipmentDto {
  @IsNumber()
  @IsPositive({ message: 'Weight must be between 0 and 100' })
  @Max(100, { message: 'Weight must be between 0 and 100' })
  weight!: number

  @IsString()
  content!: string
}
