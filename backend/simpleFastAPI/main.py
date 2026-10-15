from fastapi import FastAPI
from routers import shipment_router
from scalar_fastapi import get_scalar_api_reference

app = FastAPI()
app.include_router(shipment_router.router)


@app.get("/scalar", include_in_schema=False)
def get_scalar():
    return get_scalar_api_reference(openapi_url=app.openapi_url, title="Scalar API Reference")
