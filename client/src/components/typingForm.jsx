import { useState } from "react";
import axios from "axios";

export default function TypingForm() {
  const [quote, setQuote] = useState("");
  const [typed, setTyped] = useState("");

  const handleClick = async function (e) {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/quotes");
      setQuote(response.data[0].quote);
    } catch (e) {
      console.log("fetching", e.message);
    }
  };

  const handleQuit = async function (e) {
    setQuote("");
  };

  return (
    <div className="card">
      <div className="card">
        {!quote ? (
          <h4>Press start to begin!</h4>
        ) : (
          <h4 className="typingText">{quote}</h4>
        )}
        <div className="container">
          <textarea
            className="typeBox"
            autoFocus
            onChange={(e) => setTyped(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleClick}>Start</button>
        <button onClick={handleQuit}>Quit</button>
      </div>
    </div>
  );
}
