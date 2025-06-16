import React, { useEffect, useState } from 'react';
import './Cardapio.css';
import Checkout from './Checkout';

const MOCK_PRODUTOS = [
  {
    id: 1,
    nome: 'Caldo Verde',
    descricao: 'Delicioso caldo verde tradicional, feito com couve, batata, linguiça e azeite.',
    preco: 28.90,
    imagemUrl: '/imagens/caldo-verde.jpg'
  },
  {
    id: 2,
    nome: 'Canja de Galinha',
    descricao: 'Canja caseira com frango, arroz, batata, cenoura e temperos frescos.',
    preco: 25.90,
    imagemUrl: '/imagens/canja-galinha.jpg'
  },
  {
    id: 3,
    nome: 'Sopa de Legumes',
    descricao: 'Sopa nutritiva de legumes frescos, perfeita para dias frios.',
    preco: 23.90,
    imagemUrl: '/imagens/sopa-legumes.jpg'
  },
  {
    id: 4,
    nome: 'Pão Caseiro',
    descricao: 'Pão artesanal, macio e saboroso, feito com ingredientes selecionados.',
    preco: 8.90,
    imagemUrl: '/imagens/pao-caseiro.jpg'
  },
  {
    id: 5,
    nome: 'Pão de Queijo',
    descricao: 'Tradicional pão de queijo mineiro, crocante por fora e macio por dentro.',
    preco: 12.90,
    imagemUrl: '/imagens/pao-queijo.jpg'
  }
];

function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState([]);
  const [showCarrinho, setShowCarrinho] = useState(false);
  const [produtoDetalhe, setProdutoDetalhe] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch('/api/produtoapi')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProdutos(data);
        } else {
          setProdutos(MOCK_PRODUTOS);
        }
        setLoading(false);
      })
      .catch(() => {
        setProdutos(MOCK_PRODUTOS);
        setLoading(false);
      });
  }, []);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item);
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const alterarQuantidade = (id, delta) => {
    setCarrinho(prev => prev.map(item => item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade + delta) } : item));
  };

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  if (loading) return <div className="cardapio-loading">Carregando cardápio...</div>;

  if (showCheckout) {
    return <Checkout carrinho={carrinho} onVoltar={() => setShowCheckout(false)} onFinalizar={() => { setCarrinho([]); setShowCheckout(false); }} />;
  }

  return (
    <div className="cardapio-container">
      <h1 className="cardapio-title">Cardápio</h1>
      <button className="carrinho-float-btn" onClick={() => setShowCarrinho(true)}>
        🛒 Carrinho ({carrinho.length})
      </button>
      <div className="cardapio-list">
        {produtos.map(produto => (
          <div className="cardapio-card" key={produto.id}>
            <img src={produto.imagemUrl || 'https://via.placeholder.com/150'} alt={produto.nome} className="cardapio-img" />
            <div className="cardapio-info">
              <h2>{produto.nome}</h2>
              <p>{produto.descricao}</p>
              <span className="cardapio-preco">R$ {produto.preco.toFixed(2)}</span>
              <button className="cardapio-btn" onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao pedido</button>
              <button className="cardapio-detalhe-btn" onClick={() => setProdutoDetalhe(produto)}>Detalhes</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes do Produto */}
      {produtoDetalhe && (
        <div className="modal-bg" onClick={() => setProdutoDetalhe(null)}>
          <div className="modal-detalhe" onClick={e => e.stopPropagation()}>
            <img src={produtoDetalhe.imagemUrl || 'https://via.placeholder.com/150'} alt={produtoDetalhe.nome} className="modal-img" />
            <h2>{produtoDetalhe.nome}</h2>
            <p>{produtoDetalhe.descricao}</p>
            <span className="cardapio-preco">R$ {produtoDetalhe.preco.toFixed(2)}</span>
            <button className="cardapio-btn" onClick={() => { adicionarAoCarrinho(produtoDetalhe); setProdutoDetalhe(null); }}>Adicionar ao pedido</button>
            <button className="modal-close" onClick={() => setProdutoDetalhe(null)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Carrinho Lateral */}
      {showCarrinho && !showCheckout && (
        <div className="carrinho-bg" onClick={() => setShowCarrinho(false)}>
          <div className="carrinho-modal" onClick={e => e.stopPropagation()}>
            <h2>Seu Pedido</h2>
            {carrinho.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              <ul className="carrinho-lista">
                {carrinho.map(item => (
                  <li key={item.id} className="carrinho-item">
                    <img src={item.imagemUrl || 'https://via.placeholder.com/50'} alt={item.nome} />
                    <div>
                      <strong>{item.nome}</strong>
                      <div className="carrinho-qtd">
                        <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
                      </div>
                      <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                    <button className="carrinho-remove" onClick={() => removerDoCarrinho(item.id)}>x</button>
                  </li>
                ))}
              </ul>
            )}
            <div className="carrinho-total">Total: <strong>R$ {totalCarrinho.toFixed(2)}</strong></div>
            <button className="carrinho-finalizar" onClick={() => { setShowCarrinho(false); setShowCheckout(true); }} disabled={carrinho.length === 0}>Finalizar Pedido</button>
            <button className="modal-close" onClick={() => setShowCarrinho(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cardapio; 