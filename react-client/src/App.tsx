import React from 'react';
import MainRouter from './pages/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faChevronUp,
  faHome,
  faMousePointer,
  faMusic,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/store';
import PageLayoutWrapper from './components/layout/PageLayoutWrapper';

/* Add icons from Font Awesome */
library.add(
  /* Song page */
  fab,
  faMousePointer,
  faHome,
  faMusic,

  /* Filter menu */
  faSlidersH,
  faChevronUp
);

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <PageLayoutWrapper>
            <MainRouter />
          </PageLayoutWrapper>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
