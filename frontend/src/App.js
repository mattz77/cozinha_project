import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { SnackbarProvider } from './components/SnackbarContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Agendamento from './pages/Agendamento';
import MeusAgendamentos from './pages/MeusAgendamentos';
import ProdutoDetalhe from './pages/ProdutoDetalhe';

function App() {
  return (
    <UserProvider>
      <SnackbarProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cardapio" element={<Cardapio />} />
              <Route path="/produto/:id" element={<ProdutoDetalhe />} />
              <Route path="/agendamento" element={<Agendamento />} />
              <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
            </Routes>
          </Layout>
        </Router>
      </SnackbarProvider>
    </UserProvider>
  );
}

export default App;
