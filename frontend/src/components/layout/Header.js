import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const Header = ({ language, onLanguageChange }) => {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ flexGrow: 1, color: '#333', textDecoration: 'none' }}
        >
          FAQ System
        </Typography>
        
        <Select
          value={language}
          onChange={onLanguageChange}
          size="small"
          sx={{ mx: 2 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
        </Select>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;