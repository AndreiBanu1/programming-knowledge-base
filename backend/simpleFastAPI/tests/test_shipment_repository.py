"""Unit tests for the repository layer: in-memory state and persistence to the JSON file."""

import json
from pathlib import Path

from repositories.shipment_repository import ShipmentRepository

from models.shipment_model import ShipmentRead


def test_get_by_id_returns_none_for_unknown_id(repo: ShipmentRepository):
    assert repo.get_by_id("nope") is None


def test_get_last_returns_final_shipment(repo: ShipmentRepository):
    assert repo.get_last().id == "SHP-2026-0003"


def test_next_id_follows_highest_number_for_current_year(repo: ShipmentRepository, monkeypatch):
    # Pin the year so the test does not break when the calendar rolls over.
    monkeypatch.setattr("repositories.shipment_repository.datetime", _FixedYear(2026))
    assert repo.next_id() == "SHP-2026-0004"


def test_next_id_restarts_numbering_in_a_new_year(repo: ShipmentRepository, monkeypatch):
    monkeypatch.setattr("repositories.shipment_repository.datetime", _FixedYear(2027))
    assert repo.next_id() == "SHP-2027-0001"


def test_add_shipment_appends_and_persists(repo: ShipmentRepository, data_file: Path):
    repo.add_shipment(ShipmentRead(id="SHP-2026-0004", weight=1, content="New", status="pending"))

    saved = json.loads(data_file.read_text())
    assert [s["id"] for s in saved][-1] == "SHP-2026-0004"
    assert len(saved) == 4
    # A fresh repository reading the same file sees the new row.
    assert ShipmentRepository(data_file).get_by_id("SHP-2026-0004") is not None


def test_update_shipment_replaces_row_instead_of_duplicating(
    repo: ShipmentRepository, data_file: Path
):
    updated = repo.get_by_id("SHP-2026-0001").model_copy(update={"content": "Changed"})
    repo.update_shipment(updated)

    saved = json.loads(data_file.read_text())
    rows = [s for s in saved if s["id"] == "SHP-2026-0001"]
    assert len(saved) == 3  # regression: the old add_shipment-based update made this 4
    assert rows == [
        {
            "id": "SHP-2026-0001",
            "weight": 2.5,
            "content": "Changed",
            "status": "delivered",
            "destination": "New York",
        }
    ]
    assert saved[0]["id"] == "SHP-2026-0001"  # position preserved


def test_delete_shipment_removes_row_and_persists(repo: ShipmentRepository, data_file: Path):
    repo.delete_shipment("SHP-2026-0002")

    saved = json.loads(data_file.read_text())
    assert [s["id"] for s in saved] == ["SHP-2026-0001", "SHP-2026-0003"]
    assert repo.get_by_id("SHP-2026-0002") is None
    assert ShipmentRepository(data_file).get_by_id("SHP-2026-0002") is None


class _FixedYear:
    """Stand-in for the `datetime` class that always reports a chosen year."""

    def __init__(self, year: int):
        self._year = year

    def now(self):
        return type("FakeNow", (), {"year": self._year})()
