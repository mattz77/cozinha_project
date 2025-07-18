import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';
import '../styles/Login.css';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { setUser, setFeedback } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const resp = await fetch('http://localhost:5233/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });
      if (resp.ok) {
        const data = await resp.json();
        localStorage.setItem('token', data.token);
        setUser({ nome: data.nome, email: data.email });
        setFeedback('Cadastro realizado com sucesso!');
        navigate('/');
      } else {
        const err = await resp.text();
        setErro(err || 'Falha no cadastro');
        setFeedback('Falha no cadastro');
      }
    } catch (err) {
      setErro('Erro de conexão');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          minLength={6}
        />
        {erro && <div className="login-erro">{erro}</div>}
        <button type="submit">Cadastrar</button>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: '#666' }}>Já tem conta? </span>
          <button type="button" onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#4e7c4e', cursor: 'pointer', textDecoration: 'underline' }}>
            Fazer login
          </button>
        </div>
      </form>
    </div>
  );
}