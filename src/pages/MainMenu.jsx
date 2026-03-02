import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MODULES as MODULE_DATA } from "../data/modules";
import { loadProgress, isModuleUnlocked, saveProgress } from "../store/progress";

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
  const [modules, setModules] = useState(MODULE_DATA);
  const navigate = useNavigate();

  useEffect(() => {
    const progress = loadProgress();
    const mapped = MODULE_DATA.map((m) => ({
      ...m,
      locked: !isModuleUnlocked(m.id, progress),
    }));
    setModules(mapped);
  }, []);

  function unlockThreeForTest() {
    // Mark module 1 and 2 as completed so modules 1-3 become unlocked
    saveProgress({ completedModules: [1, 2], currentModule: 3 });
    const progress = loadProgress();
    const mapped = MODULE_DATA.map((m) => ({
      ...m,
      locked: !isModuleUnlocked(m.id, progress),
    }));
    setModules(mapped);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8e0d0",
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
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={unlockThreeForTest}
            title="Dev: unlock first 3 modules"
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Unlock 3 (dev)
          </button>
        </div>
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
          {modules.map((mod) => (
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
            <h2 style={{ margin: "0 0 8px", color: "#6b3c2a" }}>
              {selectedModule.title}
            </h2>
            <p style={{ color: "#888", fontStyle: "italic", marginBottom: "24px" }}>
              {selectedModule.subtitle}
            </p>
            <button
              onClick={() => {
                if (!selectedModule.locked) {
                  // navigate to the module route defined in data/modules.js
                  navigate(selectedModule.route);
                }
              }}
              style={{
                backgroundColor: "#6b3c2a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 28px",
                fontSize: "15px",
                cursor: selectedModule.locked ? "default" : "pointer",
                marginRight: "12px",
                opacity: selectedModule.locked ? 0.6 : 1,
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
