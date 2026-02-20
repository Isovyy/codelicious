// src/modules/01-ingredients/index.jsx
// STUB — replace Tutorial and Minigame with real content

import { Routes, Route, useNavigate } from "react-router-dom";
import { completeModule } from "../../store/progress";

function Tutorial() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 40 }}>
      <h1>📦 Preparing Ingredients</h1>
      <p>Tutorial content goes here — data types intro</p>
      <button onClick={() => navigate("minigame")}>Go to Minigame →</button>
    </div>
  );
}

function Minigame() {
  const navigate = useNavigate();

  function handleComplete() {
    completeModule(1); // mark module 1 done, unlocks module 2
    navigate("/");     // back to main menu
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎮 Ingredients Minigame</h1>
      <p>Minigame content goes here</p>
      <button onClick={handleComplete}>Complete Module ✓</button>
    </div>
  );
}

export default function IngredientsModule() {
  return (
    <Routes>
      <Route index element={<Tutorial />} />
      <Route path="minigame" element={<Minigame />} />
    </Routes>
  );
}
