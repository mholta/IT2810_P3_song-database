import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/index';
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

interface TestProps {
  children: any;
  gqlMocks?: any;
  url: string;
  params?: any;
}

export const TestProvider = ({
  children,
  gqlMocks = [],
  url,
  params = {},
}: TestProps) => {
  let initEntry = url;
  for (let key of Object.keys(params)) {
    initEntry = initEntry.replace(':' + key, params[key]);
  }

  const store = createStore(rootReducer, composeWithDevTools());

  return (
    <MockedProvider mocks={gqlMocks}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[initEntry]}>
            <PageLayoutWrapper>
              <Route path={url}>{children}</Route>
            </PageLayoutWrapper>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    </MockedProvider>
  );
};
