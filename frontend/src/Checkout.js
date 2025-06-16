import React, { useState } from 'react';
import './Checkout.css';

function Checkout({ carrinho, onVoltar, onFinalizar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cartao, setCartao] = useState('');
  const [validade, setValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [pagando, setPagando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPagando(true);
    setTimeout(() => {
      setSucesso(true);
      setPagando(false);
      if (onFinalizar) onFinalizar();
    }, 2000);
  };

  if (sucesso) {
    return (
      <div className="checkout-sucesso">
        <h2>Pedido realizado com sucesso!</h2>
        <p>Obrigado pela sua compra, {nome}!</p>
        <button onClick={onVoltar}>Voltar ao cardápio</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Pedido</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Nome Completo
          <input required value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <label>Email
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>Número do Cartão
          <input required maxLength={19} placeholder="0000 0000 0000 0000" value={cartao} onChange={e => setCartao(e.target.value)} />
        </label>
        <div className="checkout-row">
          <label>Validade
            <input required maxLength={5} placeholder="MM/AA" value={validade} onChange={e => setValidade(e.target.value)} />
          </label>
          <label>CVV
            <input required maxLength={4} placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} />
          </label>
        </div>
        <h3>Resumo do Pedido</h3>
        <ul className="checkout-lista">
          {carrinho.map(item => (
            <li key={item.id}>{item.nome} x{item.quantidade} <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span></li>
          ))}
        </ul>
        <div className="checkout-total">Total: <strong>R$ {total.toFixed(2)}</strong></div>
        <button className="checkout-btn" type="submit" disabled={pagando}>{pagando ? 'Processando...' : 'Pagar com Cartão'}</button>
        <button className="checkout-voltar" type="button" onClick={onVoltar}>Voltar</button>
      </form>
    </div>
  );
}

export default Checkout; 