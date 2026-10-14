from collections.abc import Callable
from typing import Any


def custom_fence(fence: str = "+"):

    def add_fence(func):

        def wrapper(text: str):
            print("+" * 10)
            func()
            print("+" * 10)

        return wrapper

    return add_fence


@custom_fence("-")
def log(text: str):
    print(text)


log("baloon")

"""
Define and use route decorator
"""

routes: dict[str, Callable[[], Any]] = {}


def route(path: str):
    def register_route(func):
        routes[path] = func
        return func

    return register_route


@route("/shipment")
def get_shipment():
    return "Shipment<1001, in transit>"


request: str = ""

while request != "quit":
    request = input(">   ")

    if request in routes:
        response = routes[request]()
        print(response, end="\n\n")
    else:
        print("Not found")
