import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6, textAlign: 'center', p: { xs: 1, sm: 3 } }}>
      <Typography variant="h3" sx={{ fontSize: { xs: 24, sm: 32 } }} gutterBottom>
        Bem-vindo à CozinhaApp!
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        O melhor site de vendas de comidas caseiras.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        sx={{ mb: 2 }} 
        fullWidth={window.innerWidth < 600}
        onClick={() => navigate('/cardapio')}
        aria-label="Ver Cardápio"
      >
        Ver Cardápio
      </Button>
      <Button 
        variant="outlined" 
        color="primary" 
        size="large" 
        fullWidth={window.innerWidth < 600}
        onClick={() => navigate('/agendamento')}
        aria-label="Agendar Pedido"
      >
        Agendar Pedido
      </Button>
    </Box>
  );
}
