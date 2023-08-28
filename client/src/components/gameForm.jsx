import { useState } from "react";
import axios from "axios";

export default function GameForm() {
  const [quote, setQuote] = useState("");
  const [typed, setTyped] = useState("");

  const handleClick = async function (e) {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/quotes");
      const mainQuote = response.data[0].quote;
      setQuote(mainQuote.split(""));
    } catch (e) {
      console.log("fetching", e.message);
    }
  };

  const handleQuit = async function (e) {
    e.preventDefault;
    setQuote("");
    setTyped("");
    const textarea = document.querySelector("textarea");
    textarea.value = "";
  };

  const handleChange = async function (e) {
    setTyped(e.target.value);
  };

  return (
    <>
      <div className="card">
        <div className="card">
          {!quote ? (
            <h4>Press start to begin!</h4>
          ) : (
            <div className="quote-container">
              {quote.map((q, index) => {
                return (
                  <span
                    key={index}
                    style={{
                      color: `${
                        q !== typed[index] && typed[index] !== undefined
                          ? "red"
                          : q === typed[index]
                          ? "green"
                          : "white"
                      }`,
                    }}
                  >
                    {q}
                  </span>
                );
              })}
            </div>
          )}
          <div className="container">
            <textarea
              className="typeBox"
              autoFocus
              onChange={handleChange}
            ></textarea>
          </div>
          <button onClick={handleClick}>Start</button>
          <button onClick={handleQuit}>Quit</button>
        </div>
      </div>
    </>
  );
}
