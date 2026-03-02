// src/modules/04-spice-combinations/index.jsx
// Module 4: Spice Combinations — Conditionals (if / else)

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

const PAIRINGS = {
  salt: ["pepper", "herbs"],
  sugar: ["cinnamon"],
  fish: ["lemon", "herbs"],
};

const btnStyle = {
  backgroundColor: "#6b3c2a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  cursor: "pointer",
};

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 8 }}>
        🌶️ Spice Combinations — Conditionals
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        Not every spice pairs well with every other spice. A great chef knows when to say <em>yes</em> and when to say <em>no</em>.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        A <strong>conditional</strong> is a rule: <em>if</em> this is true, do one thing — <em>else</em>, do another.
        You'll use if/else to test whether two spices complement each other.
      </p>
      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Start Exercise →
      </button>
    </div>
  );
}

function Minigame() {
  const navigate = useNavigate();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  function checkPair(x, y) {
    if (!x || !y) return "Pick two spices";
    const partners = PAIRINGS[x] || [];
    if (partners.includes(y)) return "Great pairing! ✅";
    return "Not a common pairing — try another combo.";
  }

  function handleCheck() {
    setResult(checkPair(a.trim().toLowerCase(), b.trim().toLowerCase()));
  }

  function handleComplete() {
    completeModule(4);
    navigate("/");
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24 }}>
        🎮 Pairing Tester
      </h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={a} onChange={(e) => setA(e.target.value)} placeholder="spice A" />
        <input value={b} onChange={(e) => setB(e.target.value)} placeholder="spice B" />
        <button onClick={handleCheck} style={btnStyle}>Check</button>
      </div>
      {result && <div style={{ marginTop: 12, color: "#555" }}>{result}</div>}
      <div style={{ marginTop: 24 }}>
        <button onClick={handleComplete} style={btnStyle}>Complete Module ✓</button>
      </div>
    </div>
  );
}

export default function SpiceCombinationsModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0" }}>
      <ModuleShell title="Spice Combinations" baseRoute="/modules/spice-combinations" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
