import React, { useEffect, useState } from 'react';
import api from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Cardapio() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/produtos').then(res => {
      setProdutos(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Cardápio</Typography>
      {produtos.length === 0 && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Nenhum produto disponível no momento.
        </Typography>
      )}
      <Grid container spacing={2}>
        {produtos.map(produto => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={produto.id}>
            <Card sx={{ maxWidth: 300, m: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={produto.urlImagem || '/logo192.png'}
                alt={produto.nome}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant="h6" noWrap>{produto.nome}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 40 }}>{produto.descricao}</Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                    R$ {produto.preco?.toFixed(2)}
                  </Typography>
                </div>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }} 
                  fullWidth 
                  onClick={() => navigate(`/produto/${produto.id}`)}
                  aria-label={`Ver detalhes de ${produto.nome}`}
                >
                  Ver detalhes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
