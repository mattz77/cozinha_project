import React from "react";
import { useCart } from "./CartContext";
import "../styles/CartView.css";

export default function CartView({ onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const preco = Number(item.preco.replace('R$','').replace(',','.'));
    return sum + preco * item.quantidade;
  }, 0);

  return (
    <div className="cart-modal-bg">
      <div className="cart-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Seu Carrinho</h2>
        {cart.length === 0 ? (
          <p>Carrinho vazio.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.nome}>
                  <img src={item.imagem} alt={item.nome} />
                  <div>
                    <strong>{item.nome}</strong>
                    <span>Qtd: {item.quantidade}</span>
                    <span>{item.preco}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.nome)}>Remover</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <span>Total:</span>
              <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
            <button className="clear-btn" onClick={clearCart}>Esvaziar Carrinho</button>
            <button className="checkout-btn">Finalizar Pedido</button>
          </>
        )}
      </div>
    </div>
  );
}
