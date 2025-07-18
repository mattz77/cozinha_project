import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [feedbackFading, setFeedbackFading] = useState(false);

  useEffect(() => {
    // Carrega usuário do token ao recarregar a página
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ nome: payload.unique_name || payload.nome, email: payload.email });
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Efeito para limpar feedback automaticamente após 3 segundos
  useEffect(() => {
    if (feedback) {
      setFeedbackFading(false);
      
      const fadeTimer = setTimeout(() => {
        setFeedbackFading(true);
      }, 2500); // Começa a fade-out 0.5s antes de remover

      const removeTimer = setTimeout(() => {
        setFeedback(null);
        setFeedbackFading(false);
      }, 3000); // Remove após 3 segundos

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [feedback]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, feedback, setFeedback, feedbackFading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
