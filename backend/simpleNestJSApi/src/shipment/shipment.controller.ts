import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common'
import { CreateShipmentDto } from './dto/create-shipment.dto.js'
import { PatchShipmentDto } from './dto/patch-shipment.dto.js'
import { InvalidFieldError, InvalidWeightError, ShipmentNotFoundError } from './shipment.errors.js'
import type { Shipment } from './shipment.model.js'
import { ShipmentService } from './shipment.service.js'

const lenient = new ValidationPipe({ whitelist: true, transform: true, errorHttpStatusCode: 422 })
const strict = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  errorHttpStatusCode: 422,
})

interface ErrorMessages {
  notFound?: string
  invalidField?: string
}

function translateErrors<T>(fn: () => T, messages: ErrorMessages = {}): T {
  try {
    return fn()
  } catch (error) {
    if (error instanceof ShipmentNotFoundError) {
      throw new NotFoundException(messages.notFound ?? 'Shipment not found')
    }
    if (error instanceof InvalidFieldError) {
      throw new NotFoundException(messages.invalidField ?? 'Field does not exist')
    }
    if (error instanceof InvalidWeightError) {
      throw new BadRequestException('Weight must be between 0 and 100')
    }
    throw error
  }
}

@Controller()
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Get('shipments')
  listShipments(): Shipment[] {
    return this.shipmentService.listShipments()
  }

  @Get('shipment/latest')
  getLatest(): Shipment {
    return translateErrors(() => this.shipmentService.getLatest(), { notFound: 'No shipments' })
  }

  @Get('shipment/:id')
  getShipment(@Param('id') id: string): Shipment {
    return translateErrors(() => this.shipmentService.getShipment(id))
  }

  @Post('shipment')
  @HttpCode(201)
  submitShipment(@Body(lenient) body: CreateShipmentDto): Shipment {
    return translateErrors(() => this.shipmentService.createShipment(body))
  }

  @Get('shipment/:id/:field')
  getShipmentField(@Param('id') id: string, @Param('field') field: string) {
    return translateErrors(() => this.shipmentService.getShipmentField(field, id), {
      invalidField: `Field '${field}' does not exist`,
    })
  }

  @Put('shipment/:id')
  updateShipment(@Param('id') id: string, @Body(lenient) body: CreateShipmentDto): Shipment {
    return translateErrors(() => this.shipmentService.updateShipment(id, body))
  }

  @Patch('shipment/:id')
  patchShipment(@Param('id') id: string, @Body(strict) body: PatchShipmentDto): Shipment {
    return translateErrors(() => this.shipmentService.patchShipment(id, body))
  }

  @Delete('shipment/:id')
  @HttpCode(204)
  deleteShipment(@Param('id') id: string): void {
    translateErrors(() => this.shipmentService.deleteShipment(id))
  }
}
