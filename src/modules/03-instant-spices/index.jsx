import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

// Bowls carried forward from Module 2 (final reassigned state)
const BOWLS = [
  { id: "flour", emoji: "🌾", name: "flour", varLabel: "3", value: "flour", quantity: 3 },
  { id: "eggs",  emoji: "🥚", name: "eggs",  varLabel: '"eggs"', value: "eggs", quantity: 1 },
  { id: "milk",  emoji: "🥛", name: "milk_Type",  varLabel: '"oat milk"', value: "milk", quantity: 1 },
  { id: "sugar", emoji: "🍬", name: "sugar_Type", varLabel: '"brown sugar"', value: "sugar", quantity: 1 },
];

const TECHNIQUES = [
  { id: "bake", label: "bake(bowl)", desc: "return all ingredients in order" },
  { id: "fry",  label: "fry(bowl)",  desc: "return unique ingredients only"  },
  { id: "mix",  label: "mix(bowl)",  desc: "count how much of each"          },
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
        ✨ Assembling Ingredients — Functions
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        You've identified your ingredients and prepped them in labeled bowls.
        Now it's time to <strong>cook</strong>.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        A <strong>function</strong> is a named, reusable recipe. You pass in
        ingredients (<em>parameters</em>) and it produces a result (<em>return value</em>).
        The same ingredients can produce different results depending on the technique you choose.
      </p>

      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {[
          { emoji: "🥣", name: "Parameters",   desc: "The ingredients you pass in. You decide what goes in the bowl." },
          { emoji: "⚙️", name: "Function",     desc: "The technique applied. Different technique, different result."  },
          { emoji: "🥞", name: "Return value", desc: "What comes out. Every function produces a result."             },
        ].map(({ emoji, name, desc }) => (
          <div key={name} style={{ flex: 1, borderBottom: "2px solid #c4a882", paddingBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontWeight: 700, color: "#6b3c2a", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 13, color: "#777" }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Same inputs, different function example */}
      <div style={{ backgroundColor: "#fff", borderRadius: 10, padding: "20px 24px", marginBottom: 36, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 12, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>
          Example — same bowl, different technique
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { fn: "bake(bowl)", result: '["flour", "flour", "eggs"]', desc: "all items in order" },
            { fn: "fry(bowl)",  result: '["flour", "eggs"]',          desc: "duplicates removed" },
            { fn: "mix(bowl)",  result: "{ flour: 2, eggs: 1 }",      desc: "counts each item"   },
          ].map(({ fn, result, desc }) => (
            <div key={fn} style={{ flex: 1, minWidth: 160 }}>
              <code style={{ fontSize: 12, color: "#6b3c2a", display: "block", marginBottom: 6 }}>{fn}</code>
              <code style={{ fontSize: 12, backgroundColor: "#f4f4f4", padding: "6px 10px", borderRadius: 6, display: "block", marginBottom: 4 }}>{result}</code>
              <span style={{ fontSize: 11, color: "#aaa" }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate("minigame")} style={btnStyle}>
        Start Cooking →
      </button>
    </div>
  );
}

// --- Minigame ---
function Minigame() {
  const navigate = useNavigate();
  const [bowl, setBowl]           = useState([]);
  const [technique, setTechnique] = useState("mix");
  const [result, setResult]       = useState(null);
  const [cooked, setCooked]       = useState(false);
  const [cookCount, setCookCount] = useState(0);

  function dragStart(e, item) {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  }

  function getResultEmoji(items, technique) {
    const values = items.flatMap((i) => Array(i.quantity).fill(i.value));

    const hasFlour = values.includes("flour");
    const hasEggs  = values.includes("eggs");
    const hasMilk  = values.includes("milk");
    const hasSugar = values.includes("sugar");

    // bake
    if (technique === "bake") {
      if (hasEggs && hasSugar && hasMilk) return "🍮";
      if (hasFlour && hasEggs && hasSugar && !hasMilk) return "🍰";
      if (hasFlour && hasEggs && hasMilk && !hasSugar) return "🍕";
      if (hasFlour && hasEggs) return "🍞";
      if (!hasFlour && !hasEggs && hasMilk && !hasSugar) return "🧀";
      if (!hasFlour && !hasEggs && !hasMilk && hasSugar) return "🍫";
    }

    // fry
    if (technique === "fry") {
      if (hasFlour && hasEggs && hasMilk && hasSugar) return "🥞";
      if (hasFlour && hasMilk && hasSugar && !hasEggs) return "🧇";
      if (hasFlour && hasSugar) return "🥠";
      if (hasFlour && hasEggs) return "🍜";
      if (!hasFlour && hasEggs && !hasMilk && !hasSugar) return "🍳";
    }

    // mix
    if (technique === "mix") {
      if (hasMilk && hasSugar) return "🍨";
    }

    if (hasFlour && !hasEggs && !hasMilk && !hasSugar) return "🌾";
    if (!hasFlour && !hasEggs && !hasMilk && hasSugar) return "🍬";
    if (!hasFlour && !hasEggs && hasMilk && !hasSugar) return "🥛";
    if (!hasFlour && hasEggs && !hasMilk && !hasSugar) return "🥚";

    return "💩";
  }

  function addToBowl(item) {
    setBowl((b) => [...b, item]);
    setResult(null);
    setCooked(false);
  }

  function removeFromBowl(index) {
    setBowl((b) => b.filter((_, i) => i !== index));
    setResult(null);
    setCooked(false);
  }

  function changeTechnique(id) {
    setTechnique(id);
    setResult(null);
    setCooked(false);
  }

  function bake(items) {
    return items.flatMap((i) => Array(i.quantity).fill(i.value));
  }

  function fry(items) {
    return [...new Set(items.map((i) => i.value))];
  }

  function mix(items) {
    return items.reduce((acc, i) => {
      acc[i.value] = (acc[i.value] || 0) + i.quantity;
      return acc;
    }, {});
  }

  function cook() {
    if (bowl.length === 0) return;
    let out;
    if (technique === "bake") out = bake(bowl);
    if (technique === "fry")  out = fry(bowl);
    if (technique === "mix")  out = mix(bowl);
    setResult(out);
    setCooked(true);
    setCookCount((c) => c + 1);
  }

  function renderResult(r) {
    if (Array.isArray(r))      return JSON.stringify(r);
    if (typeof r === "object") return JSON.stringify(r, null, 2);
    return String(r);
  }

  const triedMultiple = cookCount >= 2;

  const colStyle = {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "18px 16px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{ padding: "32px 28px", maxWidth: 960, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24 }}>
        🥞 Pancake Kitchen
      </h2>
      <p style={{ color: "#3B2F2F", marginTop: 0, marginBottom: 20, fontSize: 14, lineHeight: 1.5 }}>
        Here, each bowl represents a <strong>variable</strong> that stores a specific value (like <code>3 cups</code> or <code>&quot;brown&quot;</code>).
        You&apos;ll combine these variable bowls and feed them into different functions to see how the results change.
      </p>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

        {/* ── Bowls from Module 2 ── */}
        <div style={{ ...colStyle, width: 200, flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "#3B2F2F", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            Your Bowls
          </div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 16, fontStyle: "italic" }}>
            The variables from the "Swapping Ingredients" module
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {BOWLS.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => dragStart(e, item)}
                title="Drag into mixing bowl"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                  fontSize: 13,
                  textAlign: "left",
                }}
              >
                <code style={{ fontSize: 12, color: "#6b3c2a", fontWeight: 700 }}>{item.name}</code>
                <div
                  style={{
                    width: 90,
                    height: 72,
                    borderRadius: "0 0 45px 45px / 0 0 24px 24px",
                    border: "2px solid #c4a882",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#6b3c2a";
                    e.currentTarget.style.backgroundColor = "#fdf6ef";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#c4a882";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  <span style={{ fontSize: 22 }}>{item.emoji}</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>{item.varLabel}</span>
                </div>
                <code style={{ fontSize: 11, color: "#aaa" }}>= {item.varLabel}</code>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mixing Bowl ── */}
        <div style={{ ...colStyle, flex: 2 }}>
          <div style={{ fontSize: 11, color: "#3B2F2F", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            Mixing Bowl
          </div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 12, fontFamily: "monospace" }}>
            parameters
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const item = JSON.parse(e.dataTransfer.getData("application/json"));
              addToBowl(item);
            }}
            style={{
              minHeight: 72,
              backgroundColor: "#faf7f4",
              borderRadius: 8,
              border: "1px solid #e0d4c8",
              padding: "10px 12px",
              marginBottom: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              alignItems: "flex-start",
            }}
          >
            {bowl.length === 0 && (
              <span style={{ fontSize: 12, color: "#7a5a3a", fontStyle: "italic" }}>
                drag ingredients to add them, click to remove them
              </span>
            )}
            {bowl.map((item, i) => (
              <button
                key={i}
                onClick={() => removeFromBowl(i)}
                title="Click to remove"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 8px",
                  borderRadius: 6,
                  border: "1px solid #e0d4c8",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
                <code style={{ color: "#6b3c2a", fontSize: 12 }}>{item.name}</code>
                <span style={{ color: "#555", fontSize: 11 }}>= {item.varLabel}</span>
              </button>
            ))}
          </div>

          {/* Technique picker */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#3B2F2F", marginBottom: 8 }}>Technique (function):</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {TECHNIQUES.map(({ id, label, desc }) => (
                <label
                  key={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: `1px solid ${technique === id ? "#c4a882" : "transparent"}`,
                    backgroundColor: technique === id ? "#faf7f4" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="technique"
                    checked={technique === id}
                    onChange={() => changeTechnique(id)}
                    style={{ accentColor: "#6b3c2a" }}
                  />
                  <code style={{ fontSize: 13, color: "#6b3c2a" }}>{label}</code>
                  <span style={{ fontSize: 12, color: "#555" }}>— {desc}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={cook}
            disabled={bowl.length === 0}
            style={{
              ...btnStyle,
              padding: "10px 24px",
              fontSize: 15,
              opacity: bowl.length === 0 ? 0.4 : 1,
              cursor: bowl.length === 0 ? "default" : "pointer",
            }}
          >
            🍳 Cook!
          </button>
        </div>

        {/* ── Result ── */}
        <div style={{ ...colStyle, width: 200, flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: "#3B2F2F", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
            Result
          </div>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 12, fontStyle: "italic" }}>
            return value
          </div>

          {cooked ? (
            <>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>
                {getResultEmoji(bowl, technique)}
              </div>
              <pre
                  style={{
                    backgroundColor: "#f4f4f4",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 11,
                    fontFamily: "monospace",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    margin: "0 0 12px",
                    color: "#333",
                  }}
                >
                  {renderResult(result)}
                </pre>
              {!triedMultiple && (
                <p style={{ fontSize: 12, color: "#b45309", margin: "0 0 12px", lineHeight: 1.5 }}>
                  Try a different technique with the same bowl — see how the result changes!
                </p>
              )}
              {triedMultiple && (
                <button
                  onClick={() => { completeModule(3); navigate("/"); }}
                  style={{ ...btnStyle, width: "100%", fontSize: 13 }}
                >
                  Complete Module ✓
                </button>
              )}
            </>
          ) : (
            <div style={{ color: "#7a5a3a", fontSize: 13, textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
              Add ingredients and cook to see the return value
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// --- Module Root ---
export default function InstantSpicesModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0" }}>
      <ModuleShell title="Assembling Ingredients" baseRoute="/modules/instant-spices" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}