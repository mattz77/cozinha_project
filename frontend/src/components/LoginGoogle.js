import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginGoogle() {
  const handleLogin = () => {
      window.location.href = "http://localhost:5233/api/auth/login-google?returnUrl=http://localhost:3000";
  };

  return (
    <Button 
      onClick={handleLogin} 
      variant="contained" 
      color="primary" 
      startIcon={<GoogleIcon />} 
      sx={{ margin: 1, padding: 1, minWidth: 180 }}
      aria-label="Entrar com Google"
      fullWidth={window.innerWidth < 600}
    >
      Entrar com Google
    </Button>
  );
}
