from typing import Literal

from pydantic import BaseModel


class Shipment(BaseModel):
    id: str
    weight: float
    content: str
    status: Literal["pending", "processing", "in_transit", "delivered"]
