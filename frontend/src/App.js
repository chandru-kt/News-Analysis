import React from "react";
import NewsFetcher from "./components/NewsFetcher";
import "./index.css";

function App() {
  return (
    <div className="container">
      <h1>News Summarization & Sentiment Analysis</h1>
      <NewsFetcher />
    </div>
  );
}

export default App;
