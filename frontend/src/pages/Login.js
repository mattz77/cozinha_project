import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { setUser, setFeedback } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch('http://localhost:5233/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (resp.ok) {
        const data = await resp.json();
        localStorage.setItem('token', data.token);
        setUser({ nome: data.nome, email: data.email });
        setFeedback('Login realizado com sucesso!');
        navigate('/');
      } else {
        const err = await resp.text();
        setErro(err || 'Falha no login');
        setFeedback('Falha no login');
      }
    } catch (err) {
      setErro('Erro de conexão');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5233/api/auth/login-google';
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        {erro && <div className="login-erro">{erro}</div>}
        <button type="submit">Entrar</button>
        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
          Entrar com Google
        </button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: '#666' }}>Não tem conta? </span>
          <button type="button" onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#4e7c4e', cursor: 'pointer', textDecoration: 'underline' }}>
            Registrar-se
          </button>
        </div>
      </form>
    </div>
  );
}