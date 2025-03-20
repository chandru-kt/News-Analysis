# News Summarization & Sentiment Analysis

## Overview
This project is a **News Summarization & Sentiment Analysis** tool that fetches news articles based on a search term, summarizes them, and performs sentiment analysis. The backend is built with FastAPI, and the frontend is developed using React with Recharts for visualization.

---

## Features
### Frontend:
- Search for news articles based on a keyword.
- Display summarized news articles along with their sentiment (Positive, Neutral, Negative).
- Visualize sentiment distribution using a **Pie Chart** (Recharts).
- Generate Hindi Text-to-Speech (TTS) for summarized news.

### Backend:
- Fetches real-time news articles.
- Summarizes the articles using NLP techniques.
- Performs sentiment analysis.
- Provides an API endpoint for the frontend.
- Implements **CORS** to allow cross-origin requests.

---

## Technologies Used
### Frontend:
- React.js
- Tailwind CSS
- Recharts (for Pie Chart visualization)

### Backend:
- FastAPI (Python)
- Newspaper3k (for news extraction)
- TextBlob (for sentiment analysis)
- FastAPI CORS Middleware

---

## Installation & Setup

### Backend (FastAPI)
#### Prerequisites:
- Python 3.8+
- Pip

#### Steps:
1. Run the server:
   ```sh
   uvicorn main:app --host 127.0.0.1 --port 8000 --reload
   ```

#### CORS Setup in `main.py`:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend (React)
#### Prerequisites:
- Node.js
- npm or yarn

#### Steps:
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm start  # or yarn start
   ```

---

## Usage
1. Open the frontend: `http://localhost:3000`
2. Enter a search keyword and click **Fetch News**.
3. The summarized articles will be displayed along with sentiment labels.
4. The sentiment distribution is visualized using a Pie Chart.

---


## Future Improvements
- Add more languages for summarization and TTS.
- Improve sentiment analysis accuracy using advanced NLP models.
- Deploy the application on **AWS/GCP** for public access.

---


---

## License
This project is licensed under the MIT License.
