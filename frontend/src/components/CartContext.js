import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(produto) {
    setCart((prev) => {
      // Se já existe, aumenta a quantidade
      const existente = prev.find((p) => p.nome === produto.nome);
      if (existente) {
        return prev.map((p) =>
          p.nome === produto.nome ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removeFromCart(nome) {
    setCart((prev) => prev.filter((p) => p.nome !== nome));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
