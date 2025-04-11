import React, { useState } from "react";

// 🔵 Quiz sui tuoi parchi nazionali
const parksQuiz = [
  {
    name: "Everglades National Park",
    correct: "Florida",
    options: ["Florida", "California", "Texas", "Nevada"],
  },
  {
    name: "Bryce Canyon National Park",
    correct: "Utah",
    options: ["Utah", "Arizona", "Colorado", "Nevada"],
  },
  {
    name: "Grand Canyon National Park",
    correct: "Arizona",
    options: ["Arizona", "Utah", "New Mexico", "California"],
  },
  {
    name: "Yosemite National Park",
    correct: "California",
    options: ["California", "Oregon", "Nevada", "Washington"],
  },
  {
    name: "Yellowstone National Park",
    correct: "Wyoming",
    options: ["Montana", "Idaho", "Wyoming", "Colorado"],
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = parksQuiz[index];

  const handleAnswer = (option) => {
    setSelected(option);
    setShowResult(true);
    if (option === current.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    const nextIndex = index + 1;
    if (nextIndex >= parksQuiz.length) {
      setCompleted(true);
    } else {
      setIndex(nextIndex);
    }
    setSelected("");
    setShowResult(false);
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected("");
    setShowResult(false);
    setCompleted(false);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center", background: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ color: "#2c7a7b", fontSize: "2.5rem", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}>🌲 National Parks Quiz 🇺🇸</h1>

      {!completed ? (
        <>
          <h2 style={{ marginTop: "1rem", fontSize: "1.5rem" }}>
            In which state is <strong>{current.name}</strong>?
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showResult}
                style={{
                  margin: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  backgroundColor:
                    showResult && option === current.correct
                      ? "#68d391"
                      : showResult && option === selected
                      ? "#f56565"
                      : "#edf2f7",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: showResult ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
              <p>
                {selected === current.correct ? "✅ Correct!" : "❌ Wrong!"}
              </p>
              <button
                onClick={nextQuestion}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#3182ce",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#2b6cb0"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#3182ce"}
              >
                Next
              </button>
            </div>
          )}

          <p style={{ marginTop: "2rem", fontStyle: "italic", fontSize: "1.2rem" }}>
            Score: {score} / {parksQuiz.length}
          </p>
        </>
      ) : (
        <>
          <h2 style={{ marginTop: "2rem", fontSize: "2rem" }}>🎉 Hai completato il quiz!</h2>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
            Il tuo punteggio: <strong>{score} / {parksQuiz.length}</strong>
          </p>
          <button
            onClick={restartQuiz}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2b6cb0",
              color: "white",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#3182ce"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#2b6cb0"}
          >
            🔁 Ricomincia da capo
          </button>
        </>
      )}
    </div>
  );
}
