from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict_url

app = FastAPI(    title="SafeLink.AI API",
    description="ML-powered URL safety scanner",
    version="1.0.0")

# 🔥 CORS CONFIG (THIS FIXES YOUR ERROR)
origins = [
    "http://localhost:5173",   # React (Vite)
    "http://localhost",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # NOT "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLInput(BaseModel):
    url: str

@app.get("/")
def root():
    return {
            "status": "running",
        "service": "SafeLink.AI API",
        "version": "1.0.0"
    }

@app.post("/predict")
def predict(data: URLInput):
    return predict_url(data.url)
