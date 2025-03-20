import React from "react";

const TextToSpeech = ({ text }) => {
  const speakHindi = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN"; // Hindi
    speechSynthesis.speak(utterance);
  };

  return <button onClick={speakHindi}>Generate Hindi TTS</button>;
};

export default TextToSpeech;
