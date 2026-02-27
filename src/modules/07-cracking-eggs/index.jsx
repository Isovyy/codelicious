// src/modules/07-cracking-eggs/index.jsx
// Module 7: Cracking Eggs — Recursion intro

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

const btnStyle = {
  backgroundColor: "#6b3c2a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "'Georgia', serif",
};

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 8, fontFamily: "'Georgia', serif" }}>
        🥚 Cracking Eggs — Recursion
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        To crack a carton of eggs, you crack one egg, then do the same thing with the rest of the carton — until it's empty.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        <strong>Recursion</strong> is when a function calls <em>itself</em> with a slightly smaller problem, until it hits a base case and stops. It's like a recipe that says "repeat the previous step."
      </p>
      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Start Exercise →
      </button>
    </div>
  );
}

function Minigame() {
  const navigate = useNavigate();
  const [n, setN] = useState(5);
  const [result, setResult] = useState(null);

  function countdownArray(k) {
    if (k <= 0) return [];
    return [k, ...countdownArray(k - 1)];
  }

  function handleRun() {
    setResult(countdownArray(n));
  }

  function handleComplete() {
    completeModule(7);
    navigate("/");
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24, fontFamily: "'Georgia', serif" }}>
        🎮 Recursion Demo
      </h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          type="number"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          style={{ width: 80 }}
        />
        <button onClick={handleRun} style={btnStyle}>Run recursive countdown</button>
      </div>
      {result && (
        <div style={{ marginBottom: 24, color: "#555" }}>
          <strong>Result:</strong> {JSON.stringify(result)}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <button onClick={handleComplete} style={btnStyle}>Complete Module ✓</button>
      </div>
    </div>
  );
}

export default function CrackingEggsModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <ModuleShell title="Cracking Eggs" baseRoute="/modules/cracking-eggs" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
