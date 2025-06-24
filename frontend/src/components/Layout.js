import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link, useLocation } from 'react-router-dom';
import UserInfo from './UserInfo';

const menuItems = [
  { text: 'Início', path: '/' },
  { text: 'Cardápio', path: '/cardapio' },
  { text: 'Agendar Pedido', path: '/agendamento' },
  { text: 'Meus Agendamentos', path: '/meus-agendamentos' },
];

export default function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = (state) => () => setOpen(state);

  // Fecha o Drawer automaticamente ao navegar em mobile
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} size="large">
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: { xs: 18, sm: 24 } }}>
            CozinhaApp
          </Typography>
          <UserInfo />
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path} aria-label={`Ir para ${item.text}`}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box sx={{ p: { xs: 1, sm: 3 }, minHeight: 'calc(100vh - 64px)' }}>{children}</Box>
    </Box>
  );
}
