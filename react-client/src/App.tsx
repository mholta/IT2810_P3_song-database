import React from 'react';
import MainRouter from './pages/MainRouter';
import { HashRouter as Router } from 'react-router-dom';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({ uri: 'http://it2810-21.idi.ntnu.no:4000/graphql' }),
  // link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Router>
              <PageLayoutWrapper>
                <MainRouter />
              </PageLayoutWrapper>
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
