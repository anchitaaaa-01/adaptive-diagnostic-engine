from fastapi import FastAPI
from app.routes.test_routes import router
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI(title="Adaptive Diagnostic Engine")

app.include_router(router)

@app.get("/")
def home():
    return {"message": "Adaptive Testing Engine Running"}