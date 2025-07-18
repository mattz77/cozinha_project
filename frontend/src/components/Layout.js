import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartView from "./CartView";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import { getPrimeirosNomes } from "../utils/nameUtils";
import "../styles/Feedback.css";
import "../styles/Footer.css";

export default function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const { user, setUser, feedback, setFeedback, feedbackFading } = useUser();
  const totalItens = cart.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          {user && (
            <span style={{ color: '#fffbe9', marginLeft: 16, fontWeight: 'bold' }}>
              Olá, {getPrimeirosNomes(user.nome)}
            </span>
          )}
          {user && (
            <button onClick={() => {
              localStorage.removeItem('token');
              setUser(null);
              setFeedback('Logout realizado com sucesso!');
              window.location.href = '/login';
            }} style={{ marginLeft: 16, background: '#c62828', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
              Logout
            </button>
          )}
        </nav>
      </header>
      {feedback && (
        <div 
          className={`feedback-message ${feedbackFading ? 'fade-out' : ''}`}
          style={{
            position: 'fixed', 
            top: 80, 
            right: 30, 
            zIndex: 9999, 
            background: '#4e7c4e', 
            color: '#fff', 
            padding: '1rem 2rem', 
            borderRadius: 8, 
            fontWeight: 'bold', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            animation: feedbackFading ? 'none' : 'slideInRight 0.3s ease-out'
          }}
          onClick={() => setFeedback(null)}
        >
          {feedback}
        </div>
      )}
      <main style={{ flex: 1 }}>{children}</main>
      {cartOpen && <CartView onClose={() => setCartOpen(false)} />}
      <footer>
        <div className="footer-content">
          <div className="footer-info">
            <p>NiceByte Soluções LTDA</p>
          </div>
          <div className="footer-payment">
            <p>Aceitamos:</p>
                        <div className="payment-icons">
              <img 
                src="/imagens/forma-pagamento.png" 
                alt="Formas de pagamento: Cartão de crédito, Cartão de débito, PIX, Transferência bancária" 
                className="payment-methods"
                onLoad={() => {
                  console.log('Imagem carregada com sucesso!');
                  const fallbackIcons = document.querySelector('.payment-fallback');
                  if (fallbackIcons) fallbackIcons.style.display = 'none';
                }}
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e.target.src);
                  e.target.style.display = 'none';
                  // Mostrar ícones de fallback
                  const fallbackIcons = document.querySelector('.payment-fallback');
                  if (fallbackIcons) fallbackIcons.style.display = 'flex';
                }}
              />
              <div className="payment-fallback" style={{ display: 'flex' }}>
                <span className="payment-icon">💳</span>
                <span className="payment-icon">📱</span>
                <span className="payment-icon">🏦</span>
              </div>
            </div>
            <p className="payment-text">Cartão • PIX • Transferência</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
