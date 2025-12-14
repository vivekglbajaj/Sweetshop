import { useEffect, useState } from "react";
import api from "../api";
import { logout } from "../auth";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });

  const load = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const purchase = async (id) => {
    await api.post(`/api/sweets/${id}/purchase`);
    load();
  };

  const addSweet = async () => {
    await api.post("/api/sweets", form);
    setForm({ name: "", category: "", price: "", quantity: "" });
    load();
  };

  const deleteSweet = async (id) => {
    await api.delete(`/api/sweets/${id}`);
    load();
  };

  const filtered = sweets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 🔥 INTERNAL CSS */}
      <style>{`
        body {
          background: linear-gradient(135deg, #fdfbfb, #ebedee);
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

        .container {
          max-width: 1200px;
          margin: auto;
          padding: 30px;
        }

        /* 🔍 SEARCH */
        .search {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          font-size: 16px;
          margin-bottom: 30px;
          box-shadow: inset 5px 5px 10px rgba(0,0,0,0.12),
                      inset -5px -5px 10px rgba(255,255,255,0.9);
        }

        /* 👨‍💼 ADMIN BOX */
        .admin-box {
          background: rgba(255,255,255,0.85);
          padding: 25px;
          border-radius: 20px;
          box-shadow: 
            15px 15px 30px rgba(0,0,0,0.25),
            -10px -10px 25px rgba(255,255,255,0.8);
          margin-bottom: 40px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .admin-box:hover {
          transform: translateY(-6px) rotateX(4deg);
        }

        .admin-box h3 {
          margin-bottom: 15px;
        }

        .admin-box input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border-radius: 10px;
          border: none;
          background: #f5f5f5;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.1),
                      inset -4px -4px 8px rgba(255,255,255,0.8);
        }

        .admin-box button {
          width: 100%;
          margin-top: 12px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          background: linear-gradient(135deg, #43cea2, #185a9d);
          color: white;
        }

        /* 🍬 GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
        }

        .card {
          background: rgba(255,255,255,0.92);
          border-radius: 22px;
          padding: 20px;
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

        .card h4 {
          margin-bottom: 6px;
        }

        .card p {
          margin: 4px 0;
          color: #555;
        }

        .card button {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .card button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .card button:not(.delete) {
          background: linear-gradient(135deg, #ffb347, #ff7a18);
          color: white;
        }

        .delete {
          background: linear-gradient(135deg, #ff512f, #dd2476);
          color: white;
        }

        /* 📱 MOBILE */
        @media (max-width: 600px) {
          header {
            flex-direction: column;
            gap: 10px;
          }

          .admin-box {
            padding: 20px;
          }
        }
      `}</style>

      {/* 🧁 UI */}
      <header>
        <h2>🍭 Sweet Shop</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="container">
        <input
          className="search"
          placeholder="🔍 Search sweets (gulab jamun, barfi...)"
          onChange={e => setSearch(e.target.value)}
        />

        <div className="admin-box">
          <h3>👨‍🍳 Add Sweet (Admin Power)</h3>
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
          <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category:e.target.value})}/>
          <input placeholder="Price" value={form.price} onChange={e => setForm({...form, price:e.target.value})}/>
          <input placeholder="Quantity" value={form.quantity} onChange={e => setForm({...form, quantity:e.target.value})}/>
          <button onClick={addSweet}>➕ Add Sweet</button>
        </div>

        <div className="grid">
          {filtered.map(s => (
            <div className="card" key={s.id}>
              <h4>{s.name}</h4>
              <p>{s.category}</p>
              <p>₹{s.price}</p>
              <p>Stock: {s.quantity}</p>

              <button disabled={s.quantity === 0} onClick={() => purchase(s.id)}>
                {s.quantity === 0 ? "❌ Out of Stock" : "🛒 Purchase"}
              </button>

              <button className="delete" onClick={() => deleteSweet(s.id)}>
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
