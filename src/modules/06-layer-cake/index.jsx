// src/modules/06-layer-cake/index.jsx
// Module 6: Layer Cakes — Loops and iteration

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
        🍰 Layer Cakes — Loops
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        A layer cake is built one layer at a time — repeated actions stacked up. That's a <strong>loop</strong>.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        A loop lets you repeat an action a certain number of times without writing it out manually. Instead of adding layer-1, layer-2, layer-3 by hand, a loop does it for you.
      </p>
      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Start Exercise →
      </button>
    </div>
  );
}

function Minigame() {
  const navigate = useNavigate();
  const [layers, setLayers] = useState([]);
  const [count, setCount] = useState(1);

  function addLayers(n) {
    const newLayers = Array.from({ length: n }, (_, i) => `layer-${layers.length + i + 1}`);
    setLayers((s) => [...s, ...newLayers]);
  }

  function handleComplete() {
    completeModule(6);
    navigate("/");
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24, fontFamily: "'Georgia', serif" }}>
        🎮 Cake Builder
      </h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          min={1}
          style={{ width: 80 }}
        />
        <button onClick={() => addLayers(count)} style={btnStyle}>Add layers (loop)</button>
      </div>
      <div style={{ marginBottom: 24, color: "#555" }}>
        <strong>Layers:</strong>
        <ol>
          {layers.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      </div>
      <button onClick={handleComplete} style={btnStyle}>Complete Module ✓</button>
    </div>
  );
}

export default function LayerCakeModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <ModuleShell title="Layer Cakes" baseRoute="/modules/layer-cake" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
