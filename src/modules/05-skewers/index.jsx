// src/modules/05-skewers/index.jsx
// Module 5: Composing Skewers — Arrays, stack and queue examples

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
        🥙 Composing Skewers — Arrays
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        A skewer holds ingredients in <strong>order</strong>. That's exactly what an <strong>array</strong> does — an ordered list of values.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        You can add to the end (<code>push</code>), add to the front (<code>unshift</code>), remove from the end (<code>pop</code>), or remove from the front (<code>shift</code>).
      </p>
      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Start Exercise →
      </button>
    </div>
  );
}

function Minigame() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");

  function push() {
    if (!value) return;
    setItems((s) => [...s, value]);
    setValue("");
  }

  function pop() {
    setItems((s) => s.slice(0, -1));
  }

  function shiftItem() {
    setItems((s) => s.slice(1));
  }

  function unshift() {
    if (!value) return;
    setItems((s) => [value, ...s]);
    setValue("");
  }

  function handleComplete() {
    completeModule(5);
    navigate("/");
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24, fontFamily: "'Georgia', serif" }}>
        🎮 Skewer Builder
      </h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="ingredient" />
        <button onClick={push} style={btnStyle}>Push</button>
        <button onClick={unshift} style={btnStyle}>Unshift</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={pop} style={{ ...btnStyle, backgroundColor: "#aaa" }}>Pop</button>
        {" "}
        <button onClick={shiftItem} style={{ ...btnStyle, backgroundColor: "#aaa" }}>Shift</button>
      </div>
      <div style={{ marginBottom: 24, color: "#555" }}>
        <strong>Skewer:</strong> {items.join(" → ") || <em>(empty)</em>}
      </div>
      <button onClick={handleComplete} style={btnStyle}>Complete Module ✓</button>
    </div>
  );
}

export default function SkewersModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0", fontFamily: "'Georgia', serif" }}>
      <ModuleShell title="Composing Skewers" baseRoute="/modules/skewers" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
