import { useState } from "react";

// --- Module Data ---
const MODULES = [
  {
    id: 1,
    title: "Preparing Ingredients",
    subtitle: "Data Types & Manipulation",
    locked: false,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
  },
  {
    id: 2,
    title: "Mise en Place",
    subtitle: "Variables",
    locked: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  },
  {
    id: 3,
    title: "Instant Spices",
    subtitle: "Functions",
    locked: true,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
  },
  {
    id: 4,
    title: "Spice Combinations",
    subtitle: "If, Else, And, Or, Not",
    locked: true,
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=400&q=80",
  },
  {
    id: 5,
    title: "Composing Skewers",
    subtitle: "Array, Stack, and Queue",
    locked: true,
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&q=80",
  },
  {
    id: 6,
    title: "Layer Cakes",
    subtitle: "Loops",
    locked: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
  },
  {
    id: 7,
    title: "Cracking Eggs",
    subtitle: "Recursion",
    locked: true,
    image: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=400&q=80",
  },
];

// --- Lock Icon SVG ---
function LockIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// --- Module Card ---
function ModuleCard({ module, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => !module.locked && onClick(module)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        cursor: module.locked ? "default" : "pointer",
        backgroundColor: "#1a1a1a",
        boxShadow: hovered && !module.locked
          ? "0 8px 32px rgba(0,0,0,0.35)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hovered && !module.locked ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        border: module.locked ? "none" : "2px solid #fff",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={module.image}
          alt={module.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: module.locked ? "brightness(0.35)" : "brightness(1)",
            transition: "filter 0.2s ease",
          }}
        />
        {module.locked && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockIcon />
          </div>
        )}
      </div>

      {/* Text area */}
      <div
        style={{
          padding: "12px 14px 14px",
          backgroundColor: module.locked ? "#222" : "#fff",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Georgia', serif",
            fontSize: "14px",
            fontWeight: "700",
            color: module.locked ? "#ccc" : "#1a1a1a",
            lineHeight: 1.3,
          }}
        >
          {module.title}
        </p>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "'Georgia', serif",
            fontSize: "11px",
            color: module.locked ? "#888" : "#555",
            fontStyle: "italic",
          }}
        >
          {module.subtitle}
        </p>
      </div>
    </div>
  );
}

// --- Main Menu ---
export default function MainMenu() {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8e0d0",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#6b3c2a",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                backgroundColor: "#fff",
                borderRadius: "2px",
              }}
            />
          ))}
        </button>
        <span
          style={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          CodeKitchen
        </span>
      </nav>

      {/* Module Grid */}
      <main style={{ padding: "32px 28px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              onClick={setSelectedModule}
            />
          ))}
        </div>
      </main>

      {/* Modal placeholder when unlocked module clicked */}
      {selectedModule && (
        <div
          onClick={() => setSelectedModule(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "36px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ margin: "0 0 8px", fontFamily: "'Georgia', serif", color: "#6b3c2a" }}>
              {selectedModule.title}
            </h2>
            <p style={{ color: "#888", fontStyle: "italic", marginBottom: "24px" }}>
              {selectedModule.subtitle}
            </p>
            <button
              style={{
                backgroundColor: "#6b3c2a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
                marginRight: "12px",
              }}
            >
              Start Module →
            </button>
            <button
              onClick={() => setSelectedModule(null)}
              style={{
                backgroundColor: "transparent",
                color: "#888",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px 20px",
                fontSize: "15px",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
