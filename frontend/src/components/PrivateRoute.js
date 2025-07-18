import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useUser();
  const token = localStorage.getItem('token');
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>Carregando...</div>;
  }
  
  return (token && user) ? children : <Navigate to="/login" replace />;
}