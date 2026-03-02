import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { completeModule } from "../../store/progress";
import ModuleShell from "../../components/ModuleShell";

// Categories the recipe actually needs in Step 3
const RECIPE_NEEDS = [
  { category: "milk",  emoji: "🥛", label: "milk"  },
  { category: "sugar", emoji: "🍬", label: "sugar" },
];

const SHELF = [
  { id: "f2",       emoji: "🌾", label: "2 cups",   value: 2,        type: "int",  category: "flour"  },
  { id: "f3",       emoji: "🌾", label: "3 cups",   value: 3,        type: "int",  category: "flour"  },
  { id: "f1",       emoji: "🌾", label: "1 cup",    value: 1,        type: "int",  category: "flour"  },
  { id: "f4",       emoji: "🌾", label: "4 cups",   value: 4,        type: "int",  category: "flour"  },
  { id: "e_eg",    emoji: "🥚", label: '"eg"',    value: "eg",    type: "str",  category: "eggs"   },
  { id: "e_gs",   emoji: "🥚", label: '"gs"',   value: "gs",   type: "str",  category: "eggs"   },
  { id: "e_butter", emoji: "🥚", label: '"butter"', value: "butter", type: "str",  category: "eggs"   },
  { id: "e_milk",   emoji: "🥚", label: '"milk"',   value: "milk",   type: "str",  category: "eggs"   },
  { id: "milk",     emoji: "🥛", label: "milk",     value: true,     type: "bool", category: "milk"   },
  { id: "butter",   emoji: "🧈", label: "butter",   value: false,    type: "bool", category: "butter" },
  { id: "sugar",    emoji: "🍬", label: "sugar",    value: true,     type: "bool", category: "sugar"  },
  { id: "salt",     emoji: "🧂", label: "salt",     value: false,    type: "bool", category: "salt"   },
];

const SHELVES = [
  { label: "Flour",  items: SHELF.filter((s) => s.type === "int")  },
  { label: "Eggs",   items: SHELF.filter((s) => s.type === "str")  },
  { label: "Pantry", items: SHELF.filter((s) => s.type === "bool") },
];

// --- Tutorial ---
function Tutorial() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "32px 28px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 8 }}>
        📦 Preparing Ingredients
      </h2>
      <p style={{ color: "#555", marginBottom: 32 }}>
        Every ingredient has a <strong>type</strong>. The type determines what
        happens when you combine it with something else — just like in the kitchen.
      </p>

      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        {[
          { emoji: "🌾", name: "Integer", desc: "Whole numbers. Quantities dissolve together when combined." },
          { emoji: "🥚", name: "String",  desc: 'Text. Labels line up side by side — "eg" + "gs" = "eggs".' },
          { emoji: "✅", name: "Boolean", desc: "True or false. An ingredient is in the pantry, or it isn't." },
        ].map(({ emoji, name, desc }) => (
          <div key={name} style={{ flex: 1, borderBottom: "2px solid #c4a882", paddingBottom: 16 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontWeight: 700, color: "#6b3c2a", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 13, color: "#777" }}>{desc}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("minigame")}
        style={{
          backgroundColor: "#6b3c2a",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 28px",
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        Try the Exercise →
      </button>
    </div>
  );
}

// --- Drop Slot (for steps 1 & 2) ---
function DropSlot({ item, onDrop, placeholder }) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onDrop(JSON.parse(e.dataTransfer.getData("application/json")));
      }}
      onClick={() => item && onDrop(null)}
      title={item ? "Click to remove" : placeholder}
      style={{
        width: 88,
        height: 64,
        border: `2px dashed ${over ? "#6b3c2a" : "#c4a882"}`,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: over ? "#f9f4ef" : item ? "#fff" : "transparent",
        cursor: item ? "pointer" : "default",
        transition: "background 0.15s, border-color 0.15s",
        gap: 2,
        flexShrink: 0,
      }}
    >
      {item ? (
        <>
          <span style={{ fontSize: 22 }}>{item.emoji}</span>
          <span style={{ fontSize: 11, color: "#777" }}>{item.label}</span>
        </>
      ) : (
        <span style={{ fontSize: 12, color: "#bbb" }}>{placeholder}</span>
      )}
    </div>
  );
}

// --- Pantry Container (for step 3) ---
function PantryContainer({ drops, onDrop, onRemove }) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        onDrop(JSON.parse(e.dataTransfer.getData("application/json")));
      }}
      style={{
        minHeight: 80,
        border: `2px dashed ${over ? "#6b3c2a" : "#c4a882"}`,
        borderRadius: 8,
        padding: "10px 12px",
        backgroundColor: over ? "#f9f4ef" : "#fff",
        transition: "background 0.15s, border-color 0.15s",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {drops.length === 0 && (
        <span style={{ fontSize: 13, color: "#bbb" }}>drag ingredients here…</span>
      )}
      {drops.map((item, i) => {
        const needed = RECIPE_NEEDS.some((r) => r.category === item.category);
        return (
          <div
            key={i}
            onClick={() => onRemove(i)}
            title="Click to remove"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 8px",
              borderRadius: 6,
              backgroundColor: needed ? "#e8f5e9" : "#f5f5f5",
              border: `1px solid ${needed ? "#a5d6a7" : "#e0e0e0"}`,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            <span style={{ fontSize: 18 }}>{item.emoji}</span>
            <span style={{ color: "#555" }}>{item.label}</span>
            <code
              style={{
                fontSize: 12,
                color: needed ? "#2e7d32" : "#999",
                fontFamily: "monospace",
                marginLeft: 2,
              }}
            >
              = {needed ? "true" : "false"}
            </code>
          </div>
        );
      })}
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
  const [slots, setSlots] = useState({ int1: null, int2: null, str1: null, str2: null });
  const [pantryDrops, setPantryDrops] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  function drop(key, item) {
    setSlots((s) => ({ ...s, [key]: item }));
    if (key === "int1" || key === "int2") {
      setActiveStep(1);
    } else if (key === "str1" || key === "str2") {
      setActiveStep(2);
    }
  }

  function dropToPantry(item) {
    setPantryDrops((d) => [...d, item]);
    setActiveStep(3);
  }

  function removeFromPantry(i) {
    setPantryDrops((d) => d.filter((_, idx) => idx !== i));
  }

  function dragStart(e, item) {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  }

  const intResult = slots.int1 && slots.int2 ? slots.int1.value + slots.int2.value : null;
  const strResult = slots.str1 && slots.str2 ? slots.str1.value + slots.str2.value : null;
  const pantryComplete = RECIPE_NEEDS.every((r) =>
    pantryDrops.some((d) => d.category === r.category)
  );
  const allDone = intResult === 5 && strResult === "eggs" && pantryComplete;

  const codeChip = {
    fontFamily: "monospace",
    fontSize: 15,
    backgroundColor: "#f4f4f4",
    padding: "4px 10px",
    borderRadius: 6,
    color: "#1F4E79",
  };

  const step1Code = [
    "int total_flour = 0",
    `int var1 = ${slots.int1 ? slots.int1.value : 0}`,
    `int var2 = ${slots.int2 ? slots.int2.value : 0}`,
    "total_flour = var1 + var2",
    "print(total_flour)",
  ].join("\n");

  const step1Output = intResult !== null ? String(intResult) : "";

  const step2Code = [
    `string left = ${slots.str1 ? `"${slots.str1.value}"` : '""'}`,
    `string right = ${slots.str2 ? `"${slots.str2.value}"` : '""'}`,
    "string label = left + right",
    "print(label)",
  ].join("\n");

  const step2Output = strResult !== null ? `"${strResult}"` : "";

  const step3Code = [
    "bool milk = true",
    "bool butter = false",
    "bool sugar = true",
    "bool salt = false",
    "",
    'print("milk")',
    'print("sugar")',
  ].join("\n");

  const step3Output = RECIPE_NEEDS.map((r) => {
    const dropped = pantryDrops.some((d) => d.category === r.category);
    return `${r.label}: ${dropped ? "true" : "false"}`;
  }).join("\n");

  let codeTitle = "Code: Step 1";
  let codeText = step1Code;
  let outputText = step1Output;

  if (activeStep === 2) {
    codeTitle = "Code: Step 2";
    codeText = step2Code;
    outputText = step2Output;
  } else if (activeStep === 3) {
    codeTitle = "Code: Step 3";
    codeText = step3Code;
    outputText = step3Output;
  }

  return (
    <div style={{ padding: "32px 28px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* ── Shelf ── */}
        <div style={{ width: 195, flexShrink: 0 }}>
          <h3 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 20 }}>
            Shelf
          </h3>
          {SHELVES.map(({ label, items }) => (
            <div key={label} style={{ borderBottom: "2px solid #c4a882", paddingBottom: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                {label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map((item) => (
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
                    <span style={{ fontSize: 22 }}>{item.emoji}</span>
                    <span style={{ fontSize: 11, color: "#666" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Middle: recipe + right code column ── */}
        <div style={{ flex: 1, display: "flex", gap: 32, alignItems: "flex-start" }}>

          {/* ── Recipe Card ── */}
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#6b3c2a", marginTop: 0, marginBottom: 24 }}>
              🥞 Classic Pancake Recipe
            </h3>

            {/* Step 1 — integers */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Step 1 — Measure flour</div>
              <div style={{ fontSize: 13, color: "#6B5E5E", marginBottom: 12 }}>
                Combine two bags to get exactly 5 cups
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <DropSlot item={slots.int1} onDrop={(v) => drop("int1", v)} placeholder="drop" />
                <span style={{ color: "#aaa" }}>+</span>
                <DropSlot item={slots.int2} onDrop={(v) => drop("int2", v)} placeholder="drop" />
                {intResult !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: "#6B5E5E" }}>=</span>
                    <code style={codeChip}>{JSON.stringify(intResult)}</code>
                    {intResult === 5 && <span style={{ color: "#3A6B35", fontSize: 13 }}>✓ 5 cups!</span>}
                    {intResult !== 5 && typeof intResult === "number" && <span style={{ color: "#6B5E5E", fontSize: 13 }}>need 5 — try different bags</span>}
                    {typeof intResult !== "number" && <span style={{ color: "#6B5E5E", fontSize: 13 }}>that's a string — try the flour bags!</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Step 2 — strings */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Step 2 — Label the egg carton</div>
              <div style={{ fontSize: 13, color: "#6B5E5E", marginBottom: 12 }}>
                Combine two labels to write <code style={{ backgroundColor: "#f4f4f4", padding: "1px 6px", borderRadius: 4 }}>"eggs"</code>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <DropSlot item={slots.str1} onDrop={(v) => drop("str1", v)} placeholder="drop" />
                <span style={{ color: "#aaa" }}>+</span>
                <DropSlot item={slots.str2} onDrop={(v) => drop("str2", v)} placeholder="drop" />
                {strResult !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "#6B5E5E" }}>=</span>
                    <code style={codeChip}>"{strResult}"</code>
                    {strResult === "eggs" && <span style={{ color: "#3A6B35", fontSize: 13 }}>✓ eggs!</span>}
                    {strResult !== "eggs" && <span style={{ color: "#6B5E5E", fontSize: 13 }}>not quite — try different labels</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 — booleans */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Step 3 — Check the pantry</div>
              <div style={{ fontSize: 13, color: "#6B5E5E", marginBottom: 12 }}>
                The recipe needs these ingredients — drag anything from the shelf to check if it's needed
              </div>

              {/* Recipe checklist */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {RECIPE_NEEDS.map((r) => {
                  const dropped = pantryDrops.some((d) => d.category === r.category);
                  return (
                    <div
                      key={r.category}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        borderRadius: 20,
                        backgroundColor: dropped ? "#e8f5e9" : "#f5f5f5",
                        border: `1px solid ${dropped ? "#a5d6a7" : "#e0e0e0"}`,
                        fontSize: 13,
                        transition: "all 0.2s",
                      }}
                    >
                      <span>{r.emoji}</span>
                      <span style={{ color: dropped ? "#2e7d32" : "#888" }}>{r.label}</span>
                      {dropped && <span style={{ color: "#2e7d32", fontSize: 11 }}>✓</span>}
                    </div>
                  );
                })}
              </div>

              {/* Drop container */}
              <PantryContainer
                drops={pantryDrops}
                onDrop={dropToPantry}
                onRemove={removeFromPantry}
              />

              {pantryDrops.some((d) => !RECIPE_NEEDS.some((r) => r.category === d.category)) && (
                <div style={{ fontSize: 12, color: "#b45309", marginTop: 8 }}>
                  Some ingredients aren't in the recipe — isNeeded = false means the answer to "does the recipe need this?" is no
                </div>
              )}
            </div>

            {allDone && (
              <button
                onClick={() => { completeModule(1); navigate("/"); }}
                style={{
                  backgroundColor: "#6b3c2a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 28px",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Complete Module ✓
              </button>
            )}
          </div>

          {/* ── Code column ── */}
          <div style={{ width: 320, flexShrink: 0 }}>
            <CodeFrame title={codeTitle} variant="code">
              {codeText}
            </CodeFrame>
            <CodeFrame title="Output" variant="output">
              {outputText ||
                (activeStep === 1
                  ? "Drag flour bags into the slots to see the total."
                  : activeStep === 2
                    ? "Combine labels to see the word appear here."
                    : "Drag pantry items to see which ones the recipe needs.")}
            </CodeFrame>
          </div>

        </div>

      </div>
    </div>
  );
}

// --- Module Root ---
export default function IngredientsModule() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#e8e0d0" }}>
      <ModuleShell title="Preparing Ingredients" baseRoute="/modules/ingredients" />
      <Routes>
        <Route index element={<Tutorial />} />
        <Route path="minigame" element={<Minigame />} />
      </Routes>
    </div>
  );
}
