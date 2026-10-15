from pathlib import Path

from models.shipment import Shipment
from pydantic import TypeAdapter

_shipments_adapter: TypeAdapter[list[Shipment]] = TypeAdapter(list[Shipment])


class ShipmentRepository:
    def __init__(self, data_file: Path):
        self._shipments = _shipments_adapter.validate_json(data_file.read_text())
        self._by_id = {s.id: s for s in self._shipments}

    def get_all(self) -> list[Shipment]:
        return self._shipments

    def get_by_id(self, id: str) -> Shipment | None:
        return self._by_id.get(id)

    def get_last(self) -> Shipment | None:
        return self._shipments[-1] if self._shipments else None
