"""API tests: drive the real FastAPI app over HTTP (routing, validation, error mapping)."""

import pytest
from fastapi.testclient import TestClient


class TestRead:
    def test_list_returns_all_shipments(self, client: TestClient):
        response = client.get("/shipments")
        assert response.status_code == 200
        assert [s["id"] for s in response.json()] == [
            "SHP-2026-0001",
            "SHP-2026-0002",
            "SHP-2026-0003",
        ]

    def test_get_by_id(self, client: TestClient):
        response = client.get("/shipment/SHP-2026-0002")
        assert response.status_code == 200
        assert response.json()["content"] == "Chair"

    def test_get_unknown_id_is_404(self, client: TestClient):
        response = client.get("/shipment/NOPE")
        assert response.status_code == 404
        assert response.json() == {"detail": "Shipment not found"}

    def test_latest_returns_last_shipment(self, client: TestClient):
        assert client.get("/shipment/latest").json()["id"] == "SHP-2026-0003"


class TestField:
    def test_returns_only_requested_field(self, client: TestClient):
        response = client.get("/shipment/SHP-2026-0001/weight")
        assert response.status_code == 200
        assert response.json() == {"weight": 2.5}

    @pytest.mark.parametrize("path", ["/shipment/SHP-2026-0001/bogus", "/shipment/NOPE/weight"])
    def test_unknown_field_or_shipment_is_404(self, client: TestClient, path: str):
        assert client.get(path).status_code == 404


class TestCreate:
    def test_creates_pending_shipment_with_next_id(self, client: TestClient):
        response = client.post("/shipment", json={"weight": 3.2, "content": "Test box"})

        assert response.status_code == 201
        body = response.json()
        assert body["status"] == "pending"
        assert body["weight"] == 3.2
        assert body["id"].endswith("-0004")

    def test_created_shipment_is_retrievable(self, client: TestClient):
        new_id = client.post("/shipment", json={"weight": 1, "content": "x"}).json()["id"]
        assert client.get(f"/shipment/{new_id}").status_code == 200
        assert len(client.get("/shipments").json()) == 4

    def test_consecutive_creates_get_increasing_ids(self, client: TestClient):
        first = client.post("/shipment", json={"weight": 1, "content": "a"}).json()["id"]
        second = client.post("/shipment", json={"weight": 1, "content": "b"}).json()["id"]
        assert first.endswith("-0004")
        assert second.endswith("-0005")

    @pytest.mark.parametrize("weight", [0, -1, 100.01, 500])
    def test_rejects_weight_out_of_range(self, client: TestClient, weight: float):
        response = client.post("/shipment", json={"weight": weight, "content": "x"})
        assert response.status_code in (400, 422)
        assert len(client.get("/shipments").json()) == 3  # nothing was saved

    @pytest.mark.parametrize("weight", [0.01, 100])
    def test_accepts_boundary_weights(self, client: TestClient, weight: float):
        response = client.post("/shipment", json={"weight": weight, "content": "x"})
        assert response.status_code == 201

    def test_missing_content_is_422(self, client: TestClient):
        assert client.post("/shipment", json={"weight": 1}).status_code == 422


class TestUpdate:
    def test_replaces_weight_and_content_but_keeps_id_and_status(self, client: TestClient):
        response = client.put("/shipment/SHP-2026-0001", json={"weight": 5, "content": "Changed"})

        assert response.status_code == 200
        assert response.json() == {
            "id": "SHP-2026-0001",
            "weight": 5.0,
            "content": "Changed",
            "status": "delivered",
        }

    def test_does_not_create_a_duplicate(self, client: TestClient):
        client.put("/shipment/SHP-2026-0001", json={"weight": 5, "content": "Changed"})

        shipments = client.get("/shipments").json()
        assert len(shipments) == 3
        assert [s["id"] for s in shipments].count("SHP-2026-0001") == 1

    def test_unknown_id_is_404(self, client: TestClient):
        response = client.put("/shipment/NOPE", json={"weight": 5, "content": "x"})
        assert response.status_code == 404

    def test_invalid_weight_is_rejected(self, client: TestClient):
        response = client.put("/shipment/SHP-2026-0001", json={"weight": 500, "content": "x"})
        assert response.status_code in (400, 422)
        assert client.get("/shipment/SHP-2026-0001").json()["content"] == "Keyboard"


class TestDelete:
    def test_deletes_shipment_and_returns_204(self, client: TestClient):
        response = client.delete("/shipment/SHP-2026-0002")

        assert response.status_code == 204
        assert response.content == b""  # 204 has no body

    def test_deleted_shipment_is_gone(self, client: TestClient):
        client.delete("/shipment/SHP-2026-0002")

        assert client.get("/shipment/SHP-2026-0002").status_code == 404
        assert [s["id"] for s in client.get("/shipments").json()] == [
            "SHP-2026-0001",
            "SHP-2026-0003",
        ]

    def test_unknown_id_is_404(self, client: TestClient):
        response = client.delete("/shipment/NOPE")

        assert response.status_code == 404
        assert len(client.get("/shipments").json()) == 3

    def test_second_delete_of_same_id_is_404(self, client: TestClient):
        assert client.delete("/shipment/SHP-2026-0001").status_code == 204
        assert client.delete("/shipment/SHP-2026-0001").status_code == 404
