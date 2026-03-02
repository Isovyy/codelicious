import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

// Bowls arrive pre-filled from Module 1
const INITIAL_BOWLS = {
  flour: { emoji: "🌾", label: "5 cups", value: 5    },
  eggs:  { emoji: "🥚", label: '"eggs"', value: "eggs" },
  milk:  { emoji: "🥛", label: "true",   value: true  },
  sugar: { emoji: "🍬", label: "true",   value: true  },
};

// New values on the shelf to drag from
const SHELF = [
  { id: "f1",    emoji: "🌾", label: "1 cup",   value: 1       },
  { id: "f3",    emoji: "🌾", label: "3 cups",  value: 3       },
  { id: "oat",   emoji: "🥛", label: '"oat"',   value: "oat"   },
  { id: "hemp",  emoji: "🌿", label: '"hemp"',  value: "hemp"  },
  { id: "brown", emoji: "🍯", label: '"brown"', value: "brown" },
  { id: "raw",   emoji: "🌾", label: '"raw"',   value: "raw"   },
];

// Tasks the learner must complete by reassigning the right bowl
const TASKS = [
  { id: 1, bowl: "flour", value: 3,       instruction: "The recipe changed — we only need 3 cups of flour, not 5." },
  { id: 2, bowl: "milk",  value: "oat",   instruction: "Going dairy-free? Swap milk for oat milk."                 },
  { id: 3, bowl: "sugar", value: "brown", instruction: "Use brown sugar for a richer flavour."                     },
];

const btnStyle = {
  backgroundColor: "#6b3c2a",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  cursor: "pointer",
};

// --- Tutorial ---
function Tutorial() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 8 }}>
        🧺 Mise en Place
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        You've identified your ingredients. Now it's time to <strong>get organised</strong>.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        <em>Mise en place</em> means "everything in its place." A <strong>variable</strong> is
        a labeled bowl — it holds a value and remembers it. But the contents can be swapped
        at any time. That's <strong>reassignment</strong>.
      </p>

      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {[
          { emoji: "🏷️", name: "Name",         desc: "The label on the bowl. Always the same — flour is flour." },
          { emoji: "📦", name: "Value",         desc: "What's inside. Starts with one thing, can become anything." },
          { emoji: "🔄", name: "Reassignment", desc: "Drop something new in — the old value is replaced. The name stays." },
        ].map(({ emoji, name, desc }) => (
          <div key={name} style={{ flex: 1, borderBottom: "2px solid #c4a882", paddingBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontWeight: 700, color: "#6b3c2a", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 13, color: "#777" }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Reassignment example */}
      <div style={{ backgroundColor: "#fff", borderRadius: 10, padding: "20px 24px", marginBottom: 36, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>
          Example — reassignment
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* Before */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>before</div>
            <div style={{ width: 90, height: 70, borderRadius: "0 0 45px 45px / 0 0 24px 24px", border: "2px solid #c4a882", backgroundColor: "#fafafa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <span style={{ fontSize: 20 }}>🌾</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>5 cups</span>
            </div>
            <code style={{ fontSize: 11, color: "#aaa", display: "block", marginTop: 4 }}>flour = 5</code>
          </div>

          <div style={{ color: "#c4a882", fontSize: 20 }}>→</div>

          {/* New value */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>drop in</div>
            <div style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e0d4c8", backgroundColor: "#fff", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 20 }}>🌾</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>3 cups</span>
            </div>
          </div>

          <div style={{ color: "#c4a882", fontSize: 20 }}>→</div>

          {/* After */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#2e7d32", marginBottom: 6 }}>after</div>
            <div style={{ width: 90, height: 70, borderRadius: "0 0 45px 45px / 0 0 24px 24px", border: "2px solid #a5d6a7", backgroundColor: "#f1f8f2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <span style={{ fontSize: 20 }}>🌾</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#2e7d32" }}>3 cups</span>
            </div>
            <code style={{ fontSize: 11, color: "#2e7d32", display: "block", marginTop: 4 }}>flour = 3</code>
          </div>

          <div style={{ flex: 1, minWidth: 160 }}>
            <p style={{ margin: 0, fontSize: 13, color: "#777", lineHeight: 1.6 }}>
              The name <code style={{ backgroundColor: "#f4f4f4", padding: "1px 5px", borderRadius: 3 }}>flour</code> never changed.
              Only the value inside was replaced. That's <strong>reassignment</strong>.
            </p>
          </div>
        </div>
      </div>

      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Set Up My Station →
      </button>
    </div>
  );
}

// --- Single bowl ---
function Bowl({ name, stored, onDrop }) {
  const [over, setOver] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      {/* Variable name */}
      <code style={{ fontSize: 13, color: "#6b3c2a", fontWeight: 700 }}>{name}</code>

      {/* Bowl shape */}
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          onDrop(name, JSON.parse(e.dataTransfer.getData("application/json")));
        }}
        style={{
          width: 110,
          height: 90,
          borderRadius: "0 0 55px 55px / 0 0 30px 30px",
          border: `2px solid ${over ? "#6b3c2a" : "#c4a882"}`,
          backgroundColor: over ? "#f9f4ef" : "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          gap: 2,
        }}
      >
        <span style={{ fontSize: 26 }}>{stored.emoji}</span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>{stored.label}</span>
      </div>

      {/* Assignment line */}
      <code style={{ fontSize: 11, color: "#aaa" }}>= {stored.label}</code>
    </div>
  );
}

// --- Minigame ---
function Minigame() {
  const navigate = useNavigate();
  const [bowls, setBowls]   = useState(INITIAL_BOWLS);
  const [history, setHistory] = useState([]);

  function drop(bowlName, item) {
    const prev = bowls[bowlName];
    setBowls((b) => ({
      ...b,
      [bowlName]: { emoji: item.emoji, label: item.label, value: item.value },
    }));
    setHistory((h) => [
      { bowl: bowlName, from: prev.label, to: item.label },
      ...h,
    ].slice(0, 8));
  }

  function dragStart(e, item) {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  }

  const taskDone = (t) => bowls[t.bowl].value === t.value;
  const allDone  = TASKS.every(taskDone);

  return (
    <div style={{ padding: "32px 28px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* ── Left: shelf + history ── */}
        <div style={{ width: 180, flexShrink: 0 }}>
          <h3 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 16 }}>
            Shelf
          </h3>
          <div style={{ borderBottom: "2px solid #c4a882", paddingBottom: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
              New values
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SHELF.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => dragStart(e, item)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "1px solid #e0d4c8",
                    backgroundColor: "#fff",
                    cursor: "grab",
                    userSelect: "none",
                    gap: 2,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                History
              </div>
              <div style={{ borderLeft: "2px solid #c4a882", paddingLeft: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                {history.map((h, i) => (
                  <div key={i} style={{ opacity: i === 0 ? 1 : 0.45 }}>
                    <code style={{ fontSize: 11, color: "#888" }}>{h.bowl}</code>
                    <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>
                      <span style={{ textDecoration: "line-through", color: "#bbb" }}>{h.from}</span>
                      {" → "}
                      <span style={{ color: "#2e7d32" }}>{h.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: tasks + bowls ── */}
        <div style={{ flex: 1 }}>
          <h3 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 20 }}>
            🧑‍🍳 Recipe Update
          </h3>

          {/* Task cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {TASKS.map((t) => {
              const done = taskDone(t);
              return (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    borderRadius: 8,
                    backgroundColor: done ? "#f1f8f2" : "#fff",
                    border: `1px solid ${done ? "#a5d6a7" : "#e0d4c8"}`,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 18, color: done ? "#2e7d32" : "#ccc", flexShrink: 0 }}>
                    {done ? "✓" : "○"}
                  </span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: done ? "#2e7d32" : "#555" }}>{t.instruction}</span>
                  </div>
                  <code style={{ fontSize: 12, color: "#aaa", flexShrink: 0 }}>
                    {t.bowl}
                  </code>
                </div>
              );
            })}
          </div>

          {/* Bowls */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
            {Object.entries(bowls).map(([name, stored]) => (
              <Bowl key={name} name={name} stored={stored} onDrop={drop} />
            ))}
          </div>

          {allDone && (
            <p style={{ color: "#2e7d32", fontSize: 14, marginBottom: 12 }}>
              ✓ Station updated — all variables reassigned!
            </p>
          )}

          <button
            onClick={() => { completeModule(2); navigate("/"); }}
            disabled={!allDone}
            style={{ ...btnStyle, opacity: allDone ? 1 : 0.4, cursor: allDone ? "pointer" : "default" }}
          >
            Complete Module ✓
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Module Root ---
export default function MiseEnPlaceModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0" }}>
      <ModuleShell title="Mise en Place" baseRoute="/modules/mise-en-place" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
