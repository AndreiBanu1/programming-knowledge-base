"""Shared fixtures for the shipment API tests.

This file sits in backend/simpleFastAPI/ on purpose: pytest adds the folder that holds
a top-level conftest.py to sys.path, so the flat imports used by the app
(`from models.shipment import ...`) resolve without any extra path configuration.
"""

import json
from collections.abc import Iterator
from pathlib import Path

import pytest
from dependencies import get_repository
from fastapi.testclient import TestClient
from main import app
from repositories.shipment_repository import ShipmentRepository

SEED = [
    {"id": "SHP-2026-0001", "weight": 2.5, "content": "Keyboard", "status": "delivered"},
    {"id": "SHP-2026-0002", "weight": 18.0, "content": "Chair", "status": "in_transit"},
    {"id": "SHP-2026-0003", "weight": 0.8, "content": "Cables", "status": "processing"},
]


@pytest.fixture
def data_file(tmp_path: Path) -> Path:
    """A throwaway JSON file with known data, so tests never touch shipments.json."""
    file = tmp_path / "shipments.json"
    file.write_text(json.dumps(SEED))
    return file


@pytest.fixture
def repo(data_file: Path) -> ShipmentRepository:
    return ShipmentRepository(data_file)


@pytest.fixture
def client(repo: ShipmentRepository) -> Iterator[TestClient]:
    """API client wired to the temp repository instead of the real data file."""
    app.dependency_overrides[get_repository] = lambda: repo
    yield TestClient(app)
    app.dependency_overrides.clear()
