import { useState } from "react";
import api from "../api";

export default function AddSweet({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addSweet = async () => {
    if (!name || !price || !quantity) {
      alert("Sweet without details? Even laddoo needs ingredients 😄");
      return;
    }

    await api.post("/api/sweets", { name, price, quantity });
    setName("");
    setPrice("");
    setQuantity("");
    onAdd();
  };

  return (
    <>
      {/* 🔥 INTERNAL CSS */}
      <style>{`
        .add-sweet {
          max-width: 420px;
          margin: 40px auto;
          padding: 30px;
          border-radius: 18px;
          background: linear-gradient(145deg, #ffffff, #f1f1f1);
          box-shadow: 
            12px 12px 25px rgba(0, 0, 0, 0.2),
            -8px -8px 20px rgba(255, 255, 255, 0.8);
          transform-style: preserve-3d;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .add-sweet:hover {
          transform: translateY(-8px) rotateX(4deg) rotateY(-4deg);
          box-shadow: 
            20px 20px 40px rgba(0, 0, 0, 0.25),
            -10px -10px 25px rgba(255, 255, 255, 0.9);
        }

        .add-sweet h3 {
          text-align: center;
          margin-bottom: 8px;
          font-size: 1.5rem;
        }

        .sweet-joke {
          text-align: center;
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 20px;
        }

        .add-sweet input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 15px;
          background: #f7f7f7;
          box-shadow: inset 4px 4px 8px rgba(0,0,0,0.1),
                      inset -4px -4px 8px rgba(255,255,255,0.8);
        }

        .add-btn {
          width: 100%;
          margin-top: 15px;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          color: white;
          background: linear-gradient(135deg, #ff7a18, #ffb347);
          box-shadow: 0 10px 20px rgba(255, 122, 24, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .add-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 28px rgba(255, 122, 24, 0.6);
        }

        .add-btn:active {
          transform: translateY(0);
          box-shadow: 0 8px 15px rgba(255, 122, 24, 0.4);
        }

        /* 📱 RESPONSIVE */
        @media (max-width: 480px) {
          .add-sweet {
            margin: 20px;
            padding: 22px;
          }

          .add-sweet h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>

      {/* 🧁 UI */}
      <div className="add-sweet">
        <h3>🍬 Add New Sweet</h3>
        <div className="sweet-joke">
          Because life is short… add dessert first 😋
        </div>

        <input
          placeholder="Sweet Name (e.g. Rasgulla)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="add-btn" onClick={addSweet}>
          ➕ Add Sweet
        </button>
      </div>
    </>
  );
}
