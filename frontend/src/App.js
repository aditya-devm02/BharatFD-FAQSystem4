import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/layout/Header';
import FaqList from './components/faq/FaqList';
import AdminPanel from './components/admin/AdminPanel';
import { useFaqs } from './hooks/useFaqs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const App = () => {
  const [language, setLanguage] = useState('en');
  const { faqs, isLoading } = useFaqs(language);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header 
          language={language} 
          onLanguageChange={handleLanguageChange} 
        />
        
        <Switch>
          <Route exact path="/">
            <FaqList faqs={faqs} isLoading={isLoading} />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
