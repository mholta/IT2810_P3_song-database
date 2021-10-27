import React from 'react';
import MainRouter from './pages/MainRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faChevronUp,
  faHome,
  faMousePointer,
  faMusic,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { Provider as StoreProvider } from 'react-redux';
import store from './store/store';
import PageLayoutWrapper from './components/layout/PageLayoutWrapper';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://it2810-21.idi.ntnu.no:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    mode: 'no-cors',
  },
});

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
  /* Load themes and store in redux */
  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <PageLayoutWrapper>
              <MainRouter />
            </PageLayoutWrapper>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
