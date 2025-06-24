import React, { useEffect, useState } from 'react';
import api from '../api';
import { useUser } from '../components/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarContext';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Agendamento() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itens, setItens] = useState([]);
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const [searchParams] = useSearchParams();
  const agendamentoId = searchParams.get('id');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    api.get('/produtos').then(res => {
      setProdutos(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      showSnackbar('Você precisa estar logado para agendar um pedido!', 'warning');
      navigate('/');
    }
  }, [user, navigate, showSnackbar]);

  useEffect(() => {
    if (agendamentoId) {
      setEditMode(true);
      api.get(`/agendamentos/${agendamentoId}`).then(res => {
        setDataHora(res.data.dataHoraAgendamento?.slice(0, 16));
        setObservacoes(res.data.observacoes || '');
        setItens(res.data.itensPedido.map(item => ({ produtoId: item.produtoId, quantidade: item.quantidade })));
      });
    }
  }, [agendamentoId]);

  const handleQuantidade = (produtoId, quantidade) => {
    setItens(prev => {
      const outros = prev.filter(i => i.produtoId !== produtoId);
      if (quantidade > 0) {
        return [...outros, { produtoId, quantidade }];
      }
      return outros;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) return;
    try {
      if (editMode) {
        await api.put(`/agendamentos/${agendamentoId}`, {
          id: Number(agendamentoId),
          usuarioId: user.id,
          dataHoraAgendamento: dataHora,
          observacoes,
          status: 'Pendente',
          valorTotal: 0,
          itensPedido: itens.map(i => ({ produtoId: i.produtoId, quantidade: i.quantidade, precoUnitario: 0 }))
        });
        showSnackbar('Agendamento atualizado!', 'success');
      } else {
        await api.post('/agendamentos', {
          usuarioId: user.id,
          dataHoraAgendamento: dataHora,
          observacoes,
          status: 'Pendente',
          valorTotal: 0,
          itensPedido: itens.map(i => ({ produtoId: i.produtoId, quantidade: i.quantidade, precoUnitario: 0 }))
        });
        showSnackbar('Agendamento realizado!', 'success');
      }
      navigate('/meus-agendamentos');
    } catch (err) {
      showSnackbar('Erro ao salvar agendamento.', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" gutterBottom>{editMode ? 'Editar Agendamento' : 'Agendar Pedido'}</Typography>
      <Grid container spacing={2}>
        {produtos.map(produto => {
          const quantidade = itens.find(i => i.produtoId === produto.id)?.quantidade || 0;
          return (
            <Grid item xs={12} sm={6} key={produto.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>{produto.nome} (R$ {produto.preco?.toFixed(2)})</Typography>
                <TextField
                  type="number"
                  size="small"
                  inputProps={{ min: 0 }}
                  value={quantidade}
                  sx={{ width: { xs: 60, sm: 80 } }}
                  onChange={e => handleQuantidade(produto.id, parseInt(e.target.value) || 0)}
                  fullWidth={window.innerWidth < 600}
                  aria-label={`Quantidade de ${produto.nome}`}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <TextField
        label="Data e Hora"
        type="datetime-local"
        value={dataHora}
        onChange={e => setDataHora(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
        InputLabelProps={{ shrink: true }}
        aria-label="Data e Hora do Agendamento"
      />
      <TextField
        label="Observações"
        value={observacoes}
        onChange={e => setObservacoes(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 2 }}
        placeholder="Ex: Sem cebola, entregar na portaria..."
        aria-label="Observações"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
        {editMode ? 'Salvar Alterações' : 'Agendar'}
      </Button>
    </Box>
  );
}
