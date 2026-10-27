import random
from enum import StrEnum

from pydantic import BaseModel, ConfigDict, Field


class ShipmentStatusEnum(StrEnum):
    PENDING = "pending"
    PROCESSING = "processing"
    IN_TRANSIT = "in_transit"
    DELIVERED = "delivered"


def random_destination() -> str:
    destinations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
    return random.choice(destinations)


class BaseShipment(BaseModel):
    weight: float = Field(gt=0, le=100, description="Weight must be between 0 and 100")
    content: str
    destination: str | None = Field(
        description="Destination is optional and can be None", default_factory=random_destination
    )


class ShipmentRead(BaseShipment):
    id: str
    status: ShipmentStatusEnum

class Order(BaseModel):
    price: int
    title: str
    description: str

class ShipmentCreate(BaseShipment):
    order: Order


class ShipmentPatch(BaseShipment):
    model_config = ConfigDict(extra="forbid")
    status: ShipmentStatusEnum | None = None
