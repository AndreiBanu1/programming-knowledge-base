from collections.abc import Callable
from typing import Any

text: str = "value"
pert: int = 90
temp: float = 37.6
number: int | float = 42


def root(num: float, exp: float = 0.5) -> int | float:
    return pow(num, exp)


root_25 = root(25, 2)

digits: list[int] = [1, 2, 3, 4, 5]

table_5: tuple[int, ...] = (1, 2, 3, 4, 5)

city_temp: tuple[str, float] = ("New York", 22.5)

shipment: dict[str, str | int] = {
    "shipment_id": "1234567890",
    "content": "wooden table",
    "status": "in transit",
}


class City:
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

    def __repr__(self) -> str:
        return f"City(name={self.name}, population={self.population})"


def decorator(func: Callable[[Any], None]):
    pass
