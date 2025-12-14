import { useEffect, useState } from "react";
import api from "../api";
import { logout } from "../auth";

export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name:"", category:"", price:"", quantity:"" });

  const load = async () => {
    const res = await api.get("/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const addSweet = async () => {
    await api.post("/api/sweets", form);
    load();
  };

  const del = async id => {
    await api.delete(`/api/sweets/${id}`);
    load();
  };

  return (
    <>
      {/* 🔥 INTERNAL 3D + RESPONSIVE CSS */}
      <style>{`
        body {
          background: linear-gradient(135deg, #ffecd2, #fcb69f);
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        header h2 {
          font-size: 1.8rem;
        }

        header button {
          padding: 10px 18px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          background: linear-gradient(135deg, #ff416c, #ff4b2b);
          color: white;
          box-shadow: 0 8px 16px rgba(255, 65, 108, 0.4);
        }

        .container {
          padding: 30px;
          max-width: 1200px;
          margin: auto;
        }

        /* 🧁 ADD SWEET FORM */
        .admin-form {
          background: rgba(255,255,255,0.85);
          padding: 25px;
          border-radius: 18px;
          box-shadow: 
            12px 12px 25px rgba(0,0,0,0.2),
            -8px -8px 20px rgba(255,255,255,0.9);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-bottom: 40px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }

        .admin-form:hover {
          transform: translateY(-6px) rotateX(3deg);
        }

        .admin-form input {
          padding: 12px;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 14px;
          background: #f6f6f6;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.1),
                      inset -4px -4px 8px rgba(255,255,255,0.8);
        }

        .admin-form button {
          grid-column: span 2;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          background: linear-gradient(135deg, #43cea2, #185a9d);
          color: white;
          box-shadow: 0 12px 22px rgba(24, 90, 157, 0.4);
        }

        /* 🍬 SWEET GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
        }

        .card {
          background: rgba(255,255,255,0.9);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 
            15px 15px 30px rgba(0,0,0,0.25),
            -10px -10px 25px rgba(255,255,255,0.8);
          transform-style: preserve-3d;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .card:hover {
          transform: translateY(-10px) rotateY(6deg);
          box-shadow: 0 30px 50px rgba(0,0,0,0.35);
        }

        .card h3 {
          margin-bottom: 6px;
        }

        .card p {
          margin: 4px 0;
          color: #555;
        }

        .delete {
          margin-top: 12px;
          padding: 10px;
          width: 100%;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
          color: white;
          background: linear-gradient(135deg, #ff512f, #dd2476);
          box-shadow: 0 8px 16px rgba(221, 36, 118, 0.4);
        }

        /* 📱 MOBILE */
        @media (max-width: 600px) {
          header {
            flex-direction: column;
            gap: 10px;
          }

          .admin-form button {
            grid-column: span 1;
          }
        }
      `}</style>

      {/* 🧠 UI */}
      <header>
        <h2>🍬 Sweet Shop Admin</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <div className="container">
        <div className="admin-form">
          <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
          <input placeholder="Price" onChange={e=>setForm({...form,price:e.target.value})}/>
          <input placeholder="Qty" onChange={e=>setForm({...form,quantity:e.target.value})}/>
          <button onClick={addSweet}>➕ Add Sweet</button>
        </div>

        <div className="grid">
          {sweets.map(s => (
            <div className="card" key={s.id}>
              <h3>{s.name}</h3>
              <p>{s.category}</p>
              <p>₹{s.price}</p>
              <p>Stock: {s.quantity}</p>
              <button className="delete" onClick={() => del(s.id)}>
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
