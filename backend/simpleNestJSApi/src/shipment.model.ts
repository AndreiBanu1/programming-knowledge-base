export const SHIPMENT_STATUSES = ['pending', 'processing', 'in_transit', 'delivered'] as const

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number]

export interface Shipment {
  id: string
  weight: number
  content: string
  status: ShipmentStatus
}

export const SHIPMENT_FIELDS = ['id', 'weight', 'content', 'status'] as const satisfies readonly (keyof Shipment)[]
