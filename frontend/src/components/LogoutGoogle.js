import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutGoogle() {
  const handleLogout = () => {
    fetch('http://localhost:5000/api/auth/logout', { credentials: 'include' })
      .then(() => window.location.reload());
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant="outlined" 
      color="inherit" 
      startIcon={<LogoutIcon />} 
      sx={{ margin: 1, padding: 1, minWidth: 100 }}
      aria-label="Sair"
      fullWidth={window.innerWidth < 600}
    >
      Sair
    </Button>
  );
}
