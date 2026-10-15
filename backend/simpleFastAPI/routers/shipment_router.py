from typing import Annotated

from dependencies import get_shipment_service
from fastapi import APIRouter, Depends, HTTPException
from models.shipment import Shipment
from services.shipment_service import ShipmentNotFoundError, ShipmentService

router = APIRouter(prefix="/shipment", tags=["shipments"])

ShipmentServiceDep = Annotated[ShipmentService, Depends(get_shipment_service)]


@router.get("s")
def list_shipments(shipment_service: ShipmentServiceDep) -> list[Shipment]:
    return shipment_service.list_shipments()


@router.get("/latest")
def get_latest(shipment_service: ShipmentServiceDep) -> Shipment:
    try:
        return shipment_service.get_latest()
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="No shipments") from None


@router.get("/{id}")
def get_shipment(id: str, shipment_service: ShipmentServiceDep) -> Shipment:
    try:
        return shipment_service.get_shipment(id)
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="Shipment not found") from None
