import React, { useState } from "react";
import axios from "axios";
import SentimentChart from "./SentimentChart";
import TextToSpeech from "./TextToSpeech";

const NewsFetcher = () => {
  const [company, setCompany] = useState("");
  const [articles, setArticles] = useState([]);
  const [sentimentData, setSentimentData] = useState({});

  const fetchNews = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/fetch_news", {
        company: company
      });
      setArticles(response.data.articles);
      setSentimentData(response.data.sentiment_distribution);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter Company Name"
      />
      <button onClick={fetchNews}>Fetch News</button>

      <h2>News Articles</h2>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        articles.map((article, index) => (
          <p key={index}>
            <b>{article.title}</b> - {article.sentiment}
          </p>
        ))
      )}

      <SentimentChart sentiment={sentimentData} />
      <TextToSpeech text={JSON.stringify(sentimentData)} />
    </div>
  );
};

export default NewsFetcher;
