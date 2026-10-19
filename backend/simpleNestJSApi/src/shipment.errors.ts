export class ShipmentNotFoundError extends Error {
  constructor(id: string) {
    super(`Shipment not found: ${id}`)
    this.name = 'ShipmentNotFoundError'
  }
}

export class InvalidWeightError extends Error {
  constructor(weight: number) {
    super(`Weight must be between 0 and 100, got ${weight}`)
    this.name = 'InvalidWeightError'
  }
}

export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`Invalid field: ${field}`)
    this.name = 'InvalidFieldError'
  }
}
