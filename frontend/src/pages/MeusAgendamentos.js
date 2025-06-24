import React, { useEffect, useState } from 'react';
import api from '../api';
import { useUser } from '../components/UserContext';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useSnackbar } from '../components/SnackbarContext';

const statusColors = {
  'Pendente': 'warning',
  'Confirmado': 'success',
  'Cancelado': 'error',
  'Em Preparo': 'info',
  'Pronto para Retirada/Entrega': 'primary',
  'Entregue': 'default',
};

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (!user) {
      showSnackbar('Você precisa estar logado para ver seus agendamentos!', 'warning');
      navigate('/');
      return;
    }
    api.get('/agendamentos').then(res => {
      setAgendamentos(res.data.filter(a => a.usuarioId === user.id));
      setLoading(false);
    });
  }, [user, navigate, showSnackbar]);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        await api.delete(`/agendamentos/${id}`);
        setAgendamentos(ags => ags.filter(a => a.id !== id));
        showSnackbar('Agendamento cancelado!', 'success');
      } catch {
        showSnackbar('Erro ao cancelar agendamento.', 'error');
      }
    }
  };

  const handleEdit = (agendamento) => {
    navigate(`/agendamento?id=${agendamento.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>Meus Agendamentos</Typography>
      <Grid container spacing={2}>
        {agendamentos.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">Nenhum agendamento encontrado.</Typography>
          </Grid>
        )}
        {agendamentos.map(ag => (
          <Grid item xs={12} md={6} key={ag.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1"><b>Data/Hora:</b> {new Date(ag.dataHoraAgendamento).toLocaleString()}</Typography>
                <Chip label={ag.status} color={statusColors[ag.status] || 'default'} size="small" sx={{ mt: 1, mb: 1 }} />
                <Typography variant="body2" sx={{ mt: 1 }}><b>Itens:</b></Typography>
                <ul style={{ paddingLeft: 18 }}>
                  {ag.itensPedido?.map(item => (
                    <li key={item.id}>{item.quantidade}x {item.produto?.nome}</li>
                  ))}
                </ul>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => handleEdit(ag)} 
                    fullWidth={window.innerWidth < 600}
                    aria-label={`Editar agendamento ${ag.id}`}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => handleDelete(ag.id)} 
                    fullWidth={window.innerWidth < 600}
                    aria-label={`Cancelar agendamento ${ag.id}`}
                  >
                    Cancelar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
