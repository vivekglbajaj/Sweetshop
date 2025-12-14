import { useEffect, useState } from "react";
import api from "../api";
import { logout } from "../auth";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const buy = async id => {
    await api.post(`/api/sweets/${id}/purchase`);
    load();
  };

  return (
    <>
      {/* 🔥 INTERNAL CSS */}
      <style>{`
        body {
          background: linear-gradient(135deg, #4fad5dff, #ebedee);
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 30px;
          background: rgba(255,255,255,0.35);
          backdrop-filter: blur(14px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }

        header h2 {
          font-size: 1.9rem;
        }

        header button {
          padding: 10px 18px;
          border-radius: 10px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          color: white;
          background: linear-gradient(135deg, #ff416c, #ff4b2b);
        }

        /* 🔍 SEARCH */
        .search {
          width: calc(100% - 60px);
          margin: 30px auto;
          display: block;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-size: 16px;
          box-shadow:
            inset 5px 5px 10px rgba(0,0,0,0.12),
            inset -5px -5px 10px rgba(255,255,255,0.9);
        }

        /* 🍬 GRID */
        .grid {
          padding: 0 30px 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
        }

        .card {
          background: rgba(255,255,255,0.92);
          border-radius: 22px;
          padding: 22px;
          box-shadow:
            18px 18px 35px rgba(0,0,0,0.25),
            -10px -10px 25px rgba(255,255,255,0.8);
          transform-style: preserve-3d;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .card:hover {
          transform: translateY(-10px) rotateY(6deg);
          box-shadow: 0 30px 55px rgba(0,0,0,0.35);
        }

        .card h3 {
          margin-bottom: 6px;
        }

        .card p {
          margin: 4px 0;
          color: #555;
        }

        .card button {
          width: 100%;
          margin-top: 14px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          color: white;
          background: linear-gradient(135deg, #43cea2, #185a9d);
          box-shadow: 0 10px 20px rgba(24,90,157,0.45);
          transition: transform 0.2s ease;
        }

        .card button:hover:not(:disabled) {
          transform: translateY(-3px);
        }

        .card button:disabled {
          background: #ccc;
          color: #666;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* 📱 MOBILE */
        @media (max-width: 600px) {
          header {
            flex-direction: column;
            gap: 10px;
          }

          .search {
            width: calc(100% - 40px);
            margin: 20px;
          }

          .grid {
            padding: 0 20px 30px;
          }
        }
      `}</style>

      {/* 🍭 UI */}
      <header>
        <h2>🍭 Sweet Shop</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <input
        className="search"
        placeholder="🔍 Search sweets (rasgulla, barfi, laddu...)"
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid">
        {sweets
          .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
          .map(s => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.category}</p>
              <p>₹{s.price}</p>
              <p>Stock: {s.quantity}</p>
              <button
                disabled={s.quantity === 0}
                onClick={() => buy(s.id)}
              >
                {s.quantity === 0 ? "❌ Out of Stock" : "🛒 Purchase"}
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
