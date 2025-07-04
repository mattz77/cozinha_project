import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartView from "./CartView";
import { useCart } from "./CartContext";

export default function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const totalItens = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <>
      <header style={{ background: '#1a3c34', color: '#fffbe9', padding: '1rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ marginLeft: '2rem' }}>
          <Link to="/" style={{ color: '#fffbe9', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.7rem', letterSpacing: '2px' }}>
            COZINHA CASEIRA
          </Link>
        </div>
        <nav style={{ marginRight: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/cardapio" style={{ color: '#fffbe9', textDecoration: 'none', fontSize: '1.1rem' }}>Cardápio</Link>
          <Link to="/agendamento" style={{ color: '#fffbe9', textDecoration: 'none', fontSize: '1.1rem' }}>Agendamento</Link>
          <Link to="/meus-agendamentos" style={{ color: '#fffbe9', textDecoration: 'none', fontSize: '1.1rem' }}>Meus Agendamentos</Link>
          <button onClick={() => setCartOpen(true)} style={{ background: '#ffb300', color: '#1a3c34', border: 'none', borderRadius: '50%', width: 40, height: 40, position: 'relative', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.3rem' }}>
            🛒
            {totalItens > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 2, background: '#ff9100', color: '#fff', borderRadius: '50%', fontSize: 12, padding: '2px 6px', fontWeight: 'bold' }}>{totalItens}</span>
            )}
          </button>
        </nav>
      </header>
      <main>{children}</main>
      {cartOpen && <CartView onClose={() => setCartOpen(false)} />}
    </>
  );
}
