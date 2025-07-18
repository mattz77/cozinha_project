import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../components/UserContext';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, setFeedback } = useUser();

  useEffect(() => {
    const token = searchParams.get('token');
    const nome = searchParams.get('nome');
    const email = searchParams.get('email');

    if (token && nome && email) {
      localStorage.setItem('token', token);
      setUser({ nome, email });
      setFeedback('Login com Google realizado com sucesso!');
      navigate('/');
    } else {
      setFeedback('Erro no login com Google');
      navigate('/login');
    }
  }, [searchParams, navigate, setUser, setFeedback]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      Processando login...
    </div>
  );
}
