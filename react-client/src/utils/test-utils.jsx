// Copied and modified from https://redux.js.org/usage/writing-tests

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/index';
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper';
import { ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

function render(
  ui,
  gqlMocks = {},
  url = '/',
  params = {},
  {
    preloadedState,
    store = createStore(rootReducer, composeWithDevTools()),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    let initEntry = url;
    for (let key of Object.keys(params)) {
      initEntry = initEntry.replace(':' + key, params[key]);
    }

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
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
