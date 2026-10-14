from fastapi import FastAPI
from pydantic import BaseModel
from scalar_fastapi import get_scalar_api_reference

app = FastAPI()


class Shipment(BaseModel):
    id: str
    weight: float
    content: str
    status: str


@app.get("/shipment/{id}")
def get_shipment(id: str) -> Shipment:
    return Shipment(
        id=id,
        weight=32.4,
        content="wooden table",
        status="in transit",
    )


@app.get("/scalar", include_in_schema=False)
def get_scalar():
    return get_scalar_api_reference(openapi_url=app.openapi_url, title="Scalar API Reference")
