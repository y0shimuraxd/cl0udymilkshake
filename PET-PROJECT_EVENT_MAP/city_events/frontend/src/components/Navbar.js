import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import api from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getCurrentUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Городская Афиша
        </Typography>
        
        {user ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/add-event">Добавить событие</MenuItem>
              <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/login">Войти</Button>
            <Button color="inherit" component={Link} to="/register">Регистрация</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;