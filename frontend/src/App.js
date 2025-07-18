import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { SnackbarProvider } from './components/SnackbarContext';
import { CartProvider } from './components/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GoogleCallback from './pages/GoogleCallback';
import Cardapio from './pages/Cardapio';
import Agendamento from './pages/Agendamento';
import MeusAgendamentos from './pages/MeusAgendamentos';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/google-callback" element={<GoogleCallback />} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/cardapio" element={<PrivateRoute><Cardapio /></PrivateRoute>} />
                <Route path="/produto/:id" element={<PrivateRoute><ProdutoDetalhe /></PrivateRoute>} />
                <Route path="/agendamento" element={<PrivateRoute><Agendamento /></PrivateRoute>} />
                <Route path="/meus-agendamentos" element={<PrivateRoute><MeusAgendamentos /></PrivateRoute>} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;