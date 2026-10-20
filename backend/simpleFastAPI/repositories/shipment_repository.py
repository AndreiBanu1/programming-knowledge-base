from datetime import datetime
from pathlib import Path

from pydantic import TypeAdapter

from backend.simpleFastAPI.models.shipment_model import Shipment

_shipments_adapter: TypeAdapter[list[Shipment]] = TypeAdapter(list[Shipment])


class ShipmentRepository:
    def __init__(self, data_file: Path):
        self._data_file = data_file
        self._shipments = _shipments_adapter.validate_json(data_file.read_text())
        self._by_id = {s.id: s for s in self._shipments}

    def get_all(self) -> list[Shipment]:
        return self._shipments

    def get_by_id(self, id: str) -> Shipment | None:
        return self._by_id.get(id)

    def get_last(self) -> Shipment | None:
        return self._shipments[-1] if self._shipments else None

    def next_id(self) -> str:
        prefix = f"SHP-{datetime.now().year}-"
        used = [
            int(s.id.removeprefix(prefix))
            for s in self._shipments
            if s.id.startswith(prefix) and s.id.removeprefix(prefix).isdigit()
        ]
        return f"{prefix}{max(used, default=0) + 1:04d}"

    def update_shipment(self, shipment: Shipment) -> Shipment:
        index = next(i for i, s in enumerate(self._shipments) if s.id == shipment.id)
        self._shipments[index] = shipment
        self._by_id[shipment.id] = shipment
        self._save()
        return shipment

    def add_shipment(self, shipment: Shipment) -> Shipment:
        self._shipments.append(shipment)
        self._by_id[shipment.id] = shipment
        self._save()
        return shipment

    def delete_shipment(self, id: str) -> None:
        self._shipments = [s for s in self._shipments if s.id != id]
        self._by_id.pop(id, None)
        self._save()

    def _save(self) -> None:
        self._data_file.write_bytes(_shipments_adapter.dump_json(self._shipments, indent=2))
