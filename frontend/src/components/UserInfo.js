import React, { useEffect } from 'react';
import { useUser } from './UserContext';
import api from '../api';
import LoginGoogle from './LoginGoogle';
import LogoutGoogle from './LogoutGoogle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getPrimeirosNomes } from '../utils/nameUtils';

export default function UserInfo() {
  const { user, setUser } = useUser();

  useEffect(() => {
    api.get('/usuarios/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [setUser]);

  if (!user) return <LoginGoogle />;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
      <Avatar src={user.fotoUrl} alt={getPrimeirosNomes(user.nome)} sx={{ width: 32, height: 32 }} />
      <Typography 
        variant="body2" 
        sx={{ maxWidth: { xs: 60, sm: 120 }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        aria-label={`Usuário logado: ${getPrimeirosNomes(user.nome)}`}
      >
        {getPrimeirosNomes(user.nome)}
      </Typography>
      <LogoutGoogle />
    </Box>
  );
}
