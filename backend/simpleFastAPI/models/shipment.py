import random
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

ShipmentStatus = Literal["pending", "processing", "in_transit", "delivered"]


def random_destination() -> str:
    destinations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
    return random.choice(destinations)


class Shipment(BaseModel):
    id: str
    weight: float
    content: str
    status: ShipmentStatus
    destination: str | None = Field(
        description="Destination is optional and can be None", default_factory=random_destination
    )


class ShipmentCreate(BaseModel):
    weight: float = Field(gt=0, le=100, description="Weight must be between 0 and 100")
    content: str
    destination: str | None = Field(
        default=None, description="Destination is optional and can be None"
    )


class ShipmentPatch(BaseModel):
    model_config = ConfigDict(extra="forbid")

    weight: float | None = Field(default=None, gt=0, le=100)
    content: str | None = None
    status: ShipmentStatus | None = None
