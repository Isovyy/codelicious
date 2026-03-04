import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

// Bowls arrive pre-filled from Module 1
const INITIAL_BOWLS = {
  flour: { emoji: "🌾", label: "5", value: 5 },
  eggs:  { emoji: "🥚", label: '"eggs"', value: "eggs" },
  milk:  { emoji: "🥛", label: '"dairy milk"', value: "dairy milk" },
  sugar: { emoji: "🍬", label: '"sugar"', value: "sugar" },
};

// New values on the shelf to drag from
const SHELF = [
  { id: "f1",    emoji: "🌾", label: "1",   value: 1       },
  { id: "f3",    emoji: "🌾", label: "3",  value: 3       },
  { id: "oat",   emoji: "🥛", label: '"oat milk"',   value: "oat milk"   },
  { id: "hemp",  emoji: "🌿", label: '"hemp"',  value: "hemp"  },
  { id: "brown", emoji: "🍯", label: '"brown sugar"', value: "brown sugar" },
  { id: "raw",   emoji: "🌾", label: '"raw"',   value: "raw"   },
];

// Tasks the learner must complete by reassigning the right bowl
const TASKS = [
  { id: 1, bowl: "flour", value: 3,       instruction: "The recipe changed — we only need 3 cups of flour, not 5." },
  { id: 2, bowl: "milk",  value: "oat milk",   instruction: "Going dairy-free? Swap milk for oat milk."                 },
  { id: 3, bowl: "sugar", value: "brown sugar", instruction: "Use brown sugar for a richer flavour."                     },
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
        🧺 Swapping Ingredients
      </h2>
      <p style={{ color: "#555", marginBottom: 8 }}>
        You've identified your ingredients (aka Data Types). Now it's time to <strong>swap and update</strong> what each bowl is holding.
      </p>
      <p style={{ color: "#555", marginBottom: 32 }}>
        In this module we focus on <strong>swapping ingredients</strong>. A <strong>variable</strong> is
        a labeled bowl — it holds a value and remembers it. Each bowl has a name, data type and value. When you drag a new value into a bowl,
        you&apos;re replacing what was there before while keeping the same label. That&apos;s
        called <strong>reassignment</strong>.
      </p>

      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {[
          { emoji: "🏷️", name: "Name",         desc: "The label on the bowl. Always the same, if you label the bowl 'flour', it will always be 'flour'." },
          { emoji: "📦", name: "Value",         desc: "What's inside. Starts with one thing, but can change later on if its the same type of data. " },
          { emoji: "🔄", name: "Reassignment", desc: "Drop something new in, the old value is replaced. The name of the bowl stays the same." },
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
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>5</span>
            </div>
            <code style={{ fontSize: 11, color: "#aaa", display: "block", marginTop: 4 }}>flour = 5</code>
          </div>

          <div style={{ color: "#c4a882", fontSize: 20 }}>→</div>

          {/* New value */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>reassign new value</div>
            <div style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e0d4c8", backgroundColor: "#fff", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <span style={{ fontSize: 20 }}>🌾</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>3</span>
            </div>
          </div>

          <div style={{ color: "#c4a882", fontSize: 20 }}>→</div>

          {/* After */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#2e7d32", marginBottom: 6 }}>after</div>
            <div style={{ width: 90, height: 70, borderRadius: "0 0 45px 45px / 0 0 24px 24px", border: "2px solid #a5d6a7", backgroundColor: "#f1f8f2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <span style={{ fontSize: 20 }}>🌾</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#2e7d32" }}>3</span>
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

function CodeFrame({ title, children, variant = "code" }) {
  const palette =
    variant === "output"
      ? {
          shellBg: "#f6decc",
          toolbarBg: "#f9c79a",
          bodyBg: "#fff6e9",
          titleColor: "#3B2F2F",
        }
      : {
          shellBg: "#d9e3cf",
          toolbarBg: "#b7dfe0",
          bodyBg: "#d9f0f2",
          titleColor: "#3B2F2F",
        };

  return (
    <div
      style={{
        backgroundColor: palette.shellBg,
        borderRadius: 18,
        padding: 0,
        boxShadow: "0 6px 0 rgba(65, 55, 47, 0.8)",
        border: "2px solid #41372f",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 10px",
          borderRadius: "16px 16px 0 0",
          backgroundColor: palette.toolbarBg,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: palette.titleColor,
          }}
        >
          {title}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#5fb878" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#f2c14f" }} />
          <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#e67b7b" }} />
        </div>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "10px 12px 12px",
          borderRadius: "0 0 16px 16px",
          backgroundColor: palette.bodyBg,
          fontFamily: "monospace",
          fontSize: 13,
          lineHeight: 1.5,
          whiteSpace: "pre-wrap",
          color: "#3B2F2F",
        }}
      >
        {children}
      </pre>
    </div>
  );
}

// --- Minigame ---
function Minigame() {
  const navigate = useNavigate();
  const [bowls, setBowls]   = useState(INITIAL_BOWLS);
  const [history, setHistory] = useState([]);
  const [typeError, setTypeError] = useState(null);
  const [showCode, setShowCode] = useState(false);

  function typeNoun(t, plural) {
    if (t === "number") return plural ? "integers" : "integer";
    if (t === "string") return plural ? "strings" : "string";
    if (t === "boolean") return plural ? "booleans" : "boolean";
    return plural ? `${t}s` : t;
  }

  function drop(bowlName, item) {
    const prev = bowls[bowlName];
    const expectedType = typeof prev.value;
    const incomingType = typeof item.value;

    if (expectedType !== incomingType) {
      const msg = `${typeNoun(expectedType, true)} cannot store ${typeNoun(incomingType, false)} values!`;
      setTypeError(msg);
      setHistory((h) => [
        { bowl: bowlName, from: prev.label, to: item.label, ok: false, message: msg },
        ...h,
      ].slice(0, 8));
      return;
    }

    setTypeError(null);
    setBowls((b) => ({
      ...b,
      [bowlName]: { emoji: item.emoji, label: item.label, value: item.value },
    }));
    setHistory((h) => [
      { bowl: bowlName, from: prev.label, to: item.label, ok: true },
      ...h,
    ].slice(0, 8));
  }

  function dragStart(e, item) {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  }

  const taskDone = (t) => bowls[t.bowl].value === t.value;
  const allDone  = TASKS.every(taskDone);

  function formatValue(v) {
    if (typeof v === "string") return `"${v}"`;
    if (typeof v === "boolean") return v ? "true" : "false";
    if (typeof v === "number") return String(v);
    if (v === null) return "null";
    if (v === undefined) return "undefined";
    return JSON.stringify(v);
  }

  function typeKeyword(v) {
    if (typeof v === "number") return "int";
    if (typeof v === "string") return "string";
    if (typeof v === "boolean") return "bool";
    return "var";
  }

  const codeTitle = "Variables";
  const codeText = [
    "// NOTE: Lines that start with // are comments — they explain code, but don't run.",
    "",
    "// Bowls are variables (labeled containers that store values)",
    `int cups_of_flour = ${formatValue(bowls.flour.value)};`,
    `string eggs = ${formatValue(bowls.eggs.value)};`,
    `${typeKeyword(bowls.milk.value)} milk_Type = ${formatValue(bowls.milk.value)};`,
    `${typeKeyword(bowls.sugar.value)} sugar_Type = ${formatValue(bowls.sugar.value)};`,
    `bool tasks_Done = ${allDone ? "true" : "false"};`,
    "",
    'print("Ingredients");',
    'print(cups_of_flour + " cups of flour");',
    "print(eggs);",
    "print(milk_Type);",
    "print(sugar_Type);",
    'print("tasks completed: " + tasks_Done);',
  ].join("\n");

  const outputText = [
    "Ingredients",
    `${formatValue(bowls.flour.value)} cups of flour`,
    String(bowls.eggs.value),
    String(bowls.milk.value),
    String(bowls.sugar.value),
    `tasks completed: ${allDone ? "true" : "false"}`,
  ].join("\n");

  return (
    <div style={{ padding: "32px 28px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#6b3c2a", fontWeight: 600 }}>
          Advanced Learning →
        </span>
        <button
          onClick={() => setShowCode((v) => !v)}
          style={{
            backgroundColor: "#41372f",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "6px 14px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

        {/* ── Left: shelf + history ── */}
        <div style={{ width: 180, flexShrink: 0 }}>
          <h3 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 16 }}>
            Shelf
          </h3>
          <div style={{ marginBottom: 20, color: "black",fontSize: 11 }}><p>Note: Assume the numbers represent how many cups of flour you have in that bowl.</p></div>
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
                      <span style={{ color: h.ok ? "#2e7d32" : "#b91c1c" }}>
                        {h.to}
                        {!h.ok ? " (rejected)" : ""}
                      </span>
                    </div>
                    {!h.ok && (
                      <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 2 }}>
                        {h.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Middle: tasks + bowls ── */}
        <div style={{ flex: 1, minWidth: 420 }}>
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

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => { completeModule(2); navigate("/"); }}
              disabled={!allDone}
              style={{ ...btnStyle, opacity: allDone ? 1 : 0.4, cursor: allDone ? "pointer" : "default" }}
            >
              Complete Module ✓
            </button>

            {typeError && (
              <div
                role="alert"
                style={{
                  marginLeft: "auto",
                  backgroundColor: "#fff7ed",
                  border: "1px solid #fdba74",
                  color: "#9a3412",
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                  lineHeight: 1.4,
                  maxWidth: 360,
                }}
              >
                {typeError}
              </div>
            )}
          </div>
        </div>

        {/* ── Code column ── */}
        {showCode && (
          <div style={{ width: 320, flexShrink: 0 }}>
            <CodeFrame title={codeTitle} variant="code">
              {codeText}
            </CodeFrame>
            <CodeFrame title="Output" variant="output">
              {outputText}
            </CodeFrame>
          </div>
        )}

      </div>
    </div>
  );
}

// --- Module Root ---
export default function MiseEnPlaceModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0" }}>
      <ModuleShell title="Swapping Ingredients" baseRoute="/modules/mise-en-place" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
