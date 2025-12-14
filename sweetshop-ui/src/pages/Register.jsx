import { useState } from "react";
import api from "../api";

export default function Register({ switchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", {
        username,
        password,
      });

      alert("Account created successfully!");
      switchToLogin();
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <>
      {/* 🔥 INTERNAL CSS */}
      <style>{`
        body {
          background: linear-gradient(135deg, #ffecd2, #fcb69f);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-container {
          width: 100%;
          max-width: 380px;
          padding: 32px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(16px);
          box-shadow:
            18px 18px 35px rgba(0,0,0,0.25),
            -10px -10px 25px rgba(255,255,255,0.8);
          text-align: center;
          transform-style: preserve-3d;
          transition: transform 0.4s ease;
        }

        .auth-container:hover {
          transform: translateY(-8px) rotateX(4deg);
        }

        .auth-container h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .auth-tagline {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 20px;
        }

        .auth-container form {
          display: flex;
          flex-direction: column;
        }

        .auth-container input {
          margin: 10px 0;
          padding: 12px;
          border-radius: 12px;
          border: none;
          outline: none;
          font-size: 15px;
          background: #f6f6f6;
          box-shadow:
            inset 4px 4px 8px rgba(0,0,0,0.12),
            inset -4px -4px 8px rgba(255,255,255,0.8);
        }

        .auth-container button {
          margin-top: 16px;
          padding: 12px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          background: linear-gradient(135deg, #43cea2, #185a9d);
          box-shadow: 0 12px 22px rgba(24,90,157,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .auth-container button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 30px rgba(24,90,157,0.6);
        }

        .auth-container button:active {
          transform: translateY(0);
          box-shadow: 0 8px 14px rgba(24,90,157,0.4);
        }

        .auth-error {
          color: #ff3b3b;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .auth-switch {
          margin-top: 14px;
          font-size: 0.9rem;
          cursor: pointer;
          color: #444;
          transition: color 0.2s ease;
        }

        .auth-switch:hover {
          color: #43cea2;
        }

        /* 📱 MOBILE */
        @media (max-width: 480px) {
          .auth-container {
            margin: 20px;
            padding: 26px;
          }
        }
      `}</style>

      {/* 🧁 UI */}
      <div className="auth-container">
        <h2>🧁 Create Account</h2>
        <div className="auth-tagline">
          Join us — sweetness is just one step away 🍰
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={register}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">📝 Register</button>
        </form>

        <div
          className="auth-switch"
          onClick={switchToLogin}
        >
          Already have an account? Login 🍭
        </div>
      </div>
    </>
  );
}
