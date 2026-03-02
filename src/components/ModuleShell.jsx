import { useNavigate, useLocation } from "react-router-dom";

export default function ModuleShell({ title, baseRoute }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onExercise = pathname.endsWith("/minigame");

  return (
    <nav
      style={{
        backgroundColor: "#6b3c2a",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: "6px",
          color: "#fff",
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: "13px",
        }}
      >
        ← Menu
      </button>

      <span
        style={{
          color: "#fff",
          fontSize: "18px",
          fontWeight: "700",
          flex: 1,
        }}
      >
        {title}
      </span>

      <div style={{ display: "flex", gap: "4px" }}>
        {[["Tutorial", false], ["Exercise", true]].map(([label, isEx]) => {
          const active = isEx === onExercise;
          return (
            <button
              key={label}
              onClick={() => navigate(isEx ? `${baseRoute}/minigame` : baseRoute)}
              style={{
                background: active ? "#fff" : "transparent",
                color: active ? "#6b3c2a" : "#fff",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "6px",
                padding: "6px 14px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: active ? "700" : "400",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
