import React from "react";
import "../styles/Home.css";
import { useCart } from "../components/CartContext";

const produtosDestaque = [
  {
    nome: "Caldo Verde",
    imagem: "/imagens/caldo-verde.jpg",
    preco: "R$ 12,90",
    descricao: "Tradicional caldo verde caseiro, feito com ingredientes frescos.",
  },
  {
    nome: "Canja de Galinha",
    imagem: "/imagens/canja-galinha.jpg",
    preco: "R$ 13,90",
    descricao: "Canja reconfortante, perfeita para dias frios.",
  },
  {
    nome: "Pão Caseiro",
    imagem: "/imagens/pao-caseiro.jpg",
    preco: "R$ 8,00",
    descricao: "Pão caseiro macio, assado na hora.",
  },
  {
    nome: "Pão de Queijo",
    imagem: "/imagens/pao-queijo.jpg",
    preco: "R$ 6,00",
    descricao: "Clássico pão de queijo mineiro, quentinho e saboroso.",
  },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <div className="home">
      <section className="banner banner-full">
        {/* Caminho corrigido para o banner sem espaço */}
        <img src="/imagens/banner-sopa.png" alt="Banner Sopas" className="banner-img-full" />
        <div className="banner-texto banner-texto-centralizado">
          <h1>Nesse friozinho...</h1>
          <h2>QUE TAL TOMAR CALDOS OU SOPAS?</h2>
          <p>Aqueça seu dia com opções variadas de caldos e sopas.<br/>Descubra o prazer de uma boa refeição!</p>
          <a href="tel:11999999999" className="banner-btn">FAÇA SEU PEDIDO<br/>(11) 99999-9999</a>
        </div>
      </section>
      <section className="categorias">
        <button>Sopas</button>
        <button>Pães</button>
        <button>Combos</button>
        <button>Sobremesas</button>
        <button>Bebidas</button>
      </section>
      <section className="destaques">
        <h2>Destaques do Dia</h2>
        <div className="produtos">
          {produtosDestaque.map((produto) => (
            <div className="produto-card" key={produto.nome}>
              <img src={produto.imagem} alt={produto.nome} />
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <span>{produto.preco}</span>
              <button onClick={() => addToCart(produto)}>Adicionar</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
