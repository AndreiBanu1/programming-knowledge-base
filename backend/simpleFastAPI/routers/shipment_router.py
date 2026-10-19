from typing import Annotated, Any

from dependencies import get_shipment_service
from fastapi import APIRouter, Depends, HTTPException
from models.shipment import Shipment, ShipmentCreate, ShipmentPatch
from services.shipment_service import (
    InvalidFieldError,
    InvalidWeightError,
    ShipmentNotFoundError,
    ShipmentService,
)

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


@router.post("", status_code=201)
def submit_shipment(body: ShipmentCreate, shipment_service: ShipmentServiceDep) -> Shipment:
    try:
        return shipment_service.create_shipment(body)
    except InvalidWeightError:
        raise HTTPException(status_code=400, detail="Weight must be between 0 and 100") from None


@router.get("/{id}/{field}")
def get_shipment_field(field: str, id: str, shipment_service: ShipmentServiceDep) -> dict[str, Any]:
    try:
        return shipment_service.get_shipment_field(field, id)
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="Shipment not found") from None
    except InvalidFieldError:
        raise HTTPException(status_code=404, detail=f"Field '{field}' does not exist") from None


@router.put("/{id}")
def update_shipment(
    id: str, body: ShipmentCreate, shipment_service: ShipmentServiceDep
) -> Shipment:
    try:
        return shipment_service.update_shipment(id, body)
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="Shipment not found") from None


@router.patch("/{id}")
def patch_shipment(
    id: str, body: ShipmentPatch, shipment_service: ShipmentServiceDep
) -> Shipment:
    try:
        return shipment_service.patch_shipment(id, body)
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="Shipment not found") from None


@router.delete("/{id}", status_code=204)
def delete_shipment(id: str, shipment_service: ShipmentServiceDep) -> None:
    try:
        shipment_service.delete_shipment(id)
    except ShipmentNotFoundError:
        raise HTTPException(status_code=404, detail="Shipment not found") from None
