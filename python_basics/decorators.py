from collections.abc import Callable
from typing import Any, overload, override


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


def changecase(func):
    def myinner():
        return func().upper()

    return myinner


@changecase
def logging():
    return "logging"


print(logging())


class Person:
    @overload
    def greet(self, name: str) -> None:
        pass

    @overload
    def greet(self, name: str, age: int) -> None:
        pass

    def greet(self, *args, **kwargs):
        if args:
            print("Positional:", args)

        if kwargs:
            print("Keyword:", kwargs)


person = Person()

person.greet("Andrei", 25)
person.greet(name="Andrei", age=25)
person.greet("Andrei", age=25)


class Employee(Person):
    @override
    def greet(self, name: str, age: int | None = None):
        print(f"Hello from Employee, {name}!")
