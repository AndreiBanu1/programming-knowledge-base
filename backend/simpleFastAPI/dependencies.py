from functools import lru_cache
from typing import Annotated

from config import SHIPMENT_FILE
from fastapi import Depends
from repositories.shipment_repository import ShipmentRepository
from services.shipment_service import ShipmentService


@lru_cache
def get_repository() -> ShipmentRepository:
    return ShipmentRepository(SHIPMENT_FILE)


def get_shipment_service(
    repo: Annotated[ShipmentRepository, Depends(get_repository)],
) -> ShipmentService:
    return ShipmentService(repo)
