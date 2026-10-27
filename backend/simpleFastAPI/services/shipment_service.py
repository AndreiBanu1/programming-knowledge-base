from typing import Any

from models.shipment_model import (
    ShipmentCreate,
    ShipmentPatch,
    ShipmentRead,
    ShipmentStatusEnum,
)
from repositories.shipment_repository import ShipmentRepository


class ShipmentNotFoundError(Exception):
    pass


class InvalidWeightError(Exception):
    pass


class InvalidFieldError(Exception):
    pass


class ShipmentService:
    def __init__(self, repo: ShipmentRepository):
        self._repo = repo

    def list_shipments(self) -> list[ShipmentRead]:
        return self._repo.get_all()

    def get_shipment(self, id: str) -> ShipmentRead:
        shipment = self._repo.get_by_id(id)
        if shipment is None:
            raise ShipmentNotFoundError(id)
        return shipment

    def get_latest(self) -> ShipmentRead:
        shipment = self._repo.get_last()
        if shipment is None:
            raise ShipmentNotFoundError("latest")
        return shipment

    def create_shipment(self, shipment_create: ShipmentCreate) -> ShipmentRead:
        if shipment_create.weight <= 0 or shipment_create.weight > 100:
            raise InvalidWeightError(shipment_create.weight)

        new_shipment = ShipmentRead(
            id=self._repo.next_id(),
            **shipment_create.model_dump(exclude={"order"}),
            status=ShipmentStatusEnum.PENDING,
        )
        return self._repo.add_shipment(new_shipment)

    def get_shipment_field(self, field: str, id: str) -> dict[str, Any]:
        shipment = self.get_shipment(id)
        if field not in ShipmentRead.model_fields:
            raise InvalidFieldError(f"Invalid field: {field}")
        return {field: getattr(shipment, field)}

    def update_shipment(self, id: str, shipment_create: ShipmentCreate) -> ShipmentRead:
        shipment = self.get_shipment(id)
        updated_shipment = shipment.model_copy(update=shipment_create.model_dump())
        return self._repo.update_shipment(updated_shipment)

    def patch_shipment(self, id: str, patch: ShipmentPatch) -> ShipmentRead:
        shipment = self.get_shipment(id)
        updated_shipment = shipment.model_copy(update=patch.model_dump(exclude_none=True))
        return self._repo.update_shipment(updated_shipment)

    def delete_shipment(self, id: str) -> None:
        self.get_shipment(id)
        self._repo.delete_shipment(id)
