from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.routes import router
from fastapi.staticfiles import StaticFiles
os.makedirs("uploads", exist_ok=True)
app = FastAPI(title="SentinelAI API")
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://sentinelai-env.eba-mtjhwpwm.ap-south-1.elasticbeanstalk.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "SentinelAI Backend Running"
    }