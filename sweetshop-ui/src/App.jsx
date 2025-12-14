import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { getToken, getRole } from "./auth";

export default function App() {
  const token = getToken();
  const role = getRole();

  // view = "home" | "login" | "register"
  const [view, setView] = useState("home");

  // ✅ IF LOGGED IN → DIRECT DASHBOARD
  if (token) {
    if (role === "ROLE_ADMIN") return <AdminDashboard />;
    return <UserDashboard />;
  }

  // 🔐 LOGIN PAGE
  if (view === "login") {
    return <Login switchToRegister={() => setView("register")} />;
  }

  // 📝 REGISTER PAGE
  if (view === "register") {
    return <Register switchToLogin={() => setView("login")} />;
  }

  // 🏠 HOME / LANDING PAGE (DEFAULT)
  return (
    <div style={styles.home}>
      <h1>🍭 Welcome to Sweet Shop</h1>
      <p>Buy sweets, manage stock, spread happiness 😋</p>

      <div style={styles.buttons}>
        <button style={styles.loginBtn} onClick={() => setView("login")}>
          Login
        </button>
        <button style={styles.registerBtn} onClick={() => setView("register")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

/* 🔥 SIMPLE LANDING PAGE STYLES */
const styles = {
  home: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    textAlign: "center",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    gap: "20px",
  },
  loginBtn: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    background: "#ff7a18",
    color: "white",
    fontWeight: "bold",
  },
  registerBtn: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    background: "#43cea2",
    color: "white",
    fontWeight: "bold",
  },
};
