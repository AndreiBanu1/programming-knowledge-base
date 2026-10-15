from models.shipment import Shipment
from repositories.shipment_repository import ShipmentRepository


class ShipmentNotFoundError(Exception):
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
