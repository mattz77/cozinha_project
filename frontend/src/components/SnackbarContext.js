import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext();

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(s => ({ ...s, open: false }));
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        aria-label="Notificação"
      >
        <MuiAlert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}
