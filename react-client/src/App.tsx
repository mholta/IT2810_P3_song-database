import React from 'react';
import MainRouter from './pages/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainRouter></MainRouter>
      </Router>
    </ThemeProvider>
  );
}

export default App;
