import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/produtos/${id}`).then(res => {
      setProduto(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!produto) return <Typography align="center" color="text.secondary">Produto não encontrado.</Typography>;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: { xs: 1, sm: 3 } }}>
      <Card>
        <CardMedia
          component="img"
          height="260"
          image={produto.urlImagem || '/logo192.png'}
          alt={produto.nome}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" noWrap>{produto.nome}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>{produto.descricao}</Typography>
          <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
            R$ {produto.preco?.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Categoria: {produto.categoria}
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }} 
            onClick={() => navigate(-1)} 
            fullWidth={window.innerWidth < 600}
            aria-label="Voltar para o cardápio"
          >
            Voltar
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
