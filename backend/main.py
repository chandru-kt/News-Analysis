from fastapi import FastAPI, BackgroundTasks
from fastapi.responses import FileResponse
import requests
from textblob import TextBlob
from pydantic import BaseModel
from gtts import gTTS
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Add CORS middleware to allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend domain
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Use an environment variable for security
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "c563e4392b084d89874d00c0242b952a")

class NewsRequest(BaseModel):
    company: str

def analyze_sentiment(text):
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0:
        return "सकारात्मक"  # Positive in Hindi
    elif polarity < 0:
        return "नकारात्मक"  # Negative in Hindi
    else:
        return "तटस्थ"  # Neutral in Hindi

@app.post("/fetch_news")
def fetch_news(request: NewsRequest):
    url = f"https://newsapi.org/v2/everything?q={request.company}&apiKey={NEWS_API_KEY}"
    response = requests.get(url).json()

    if "articles" not in response:
        return {"error": "कोई लेख नहीं मिला या API सीमा समाप्त!"}

    articles = response["articles"][:10]  # Get first 10 articles
    processed_articles = []

    sentiment_count = {"सकारात्मक": 0, "नकारात्मक": 0, "तटस्थ": 0}

    for article in articles:
        title = article.get("title", "कोई शीर्षक नहीं")
        description = article.get("description", "कोई विवरण नहीं")
        
        full_text = f"{title}. {description}"
        sentiment = analyze_sentiment(full_text)

        sentiment_count[sentiment] += 1
        processed_articles.append({"title": title, "sentiment": sentiment})

    return {
        "articles": processed_articles,
        "sentiment_distribution": sentiment_count
    }

@app.get("/generate_hindi_tts")
def generate_hindi_tts():
    text = "यह समाचार सारांश और भावना विश्लेषण है।"
    file_path = "hindi_tts.mp3"
    
    tts = gTTS(text, lang="hi")
    tts.save(file_path)
    
    return {"message": "Hindi TTS generated!", "audio_url": "/download_audio"}

@app.get("/download_audio")
def download_audio():
    file_path = "hindi_tts.mp3"
    if not os.path.exists(file_path):
        return {"error": "Audio file not found!"}
    return FileResponse(file_path, media_type="audio/mpeg", filename="hindi_tts.mp3")
