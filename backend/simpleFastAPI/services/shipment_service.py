from typing import Any

from models.shipment import Shipment, ShipmentCreate, ShipmentPatch
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

    def list_shipments(self) -> list[Shipment]:
        return self._repo.get_all()

    def get_shipment(self, id: str) -> Shipment:
        shipment = self._repo.get_by_id(id)
        if shipment is None:
            raise ShipmentNotFoundError(id)
        return shipment

    def get_latest(self) -> Shipment:
        shipment = self._repo.get_last()
        if shipment is None:
            raise ShipmentNotFoundError("latest")
        return shipment

    def create_shipment(self, shipment_create: ShipmentCreate) -> Shipment:
        if shipment_create.weight <= 0 or shipment_create.weight > 100:
            raise InvalidWeightError(shipment_create.weight)

        new_shipment = Shipment(
            id=self._repo.next_id(),
            weight=shipment_create.weight,
            content=shipment_create.content,
            status="pending",
        )
        return self._repo.add_shipment(new_shipment)

    def get_shipment_field(self, field: str, id: str) -> dict[str, Any]:
        shipment = self.get_shipment(id)
        if field not in Shipment.model_fields:
            raise InvalidFieldError(f"Invalid field: {field}")
        return {field: getattr(shipment, field)}

    def update_shipment(self, id: str, shipment_create: ShipmentCreate) -> Shipment:
        shipment = self.get_shipment(id)
        updated_shipment = shipment.model_copy(update=shipment_create.model_dump())
        return self._repo.update_shipment(updated_shipment)

    def patch_shipment(self, id: str, patch: ShipmentPatch) -> Shipment:
        shipment = self.get_shipment(id)
        updated_shipment = shipment.model_copy(update=patch.model_dump(exclude_none=True))
        return self._repo.update_shipment(updated_shipment)

    def delete_shipment(self, id: str) -> None:
        self.get_shipment(id)
        self._repo.delete_shipment(id)
