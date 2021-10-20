import React from 'react';
import { render, screen } from '@testing-library/react';
import SongPage from './SongPage';
import routerMock from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { theme } from '../../styles/theme';
import { ThemeProvider } from '@mui/material';

test('renders page', () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/song/all-pris']} initialIndex={0}>
        <SongPage />
      </MemoryRouter>
    </ThemeProvider>
  );
  const linkElement = screen.getByText('All pris');
  expect(linkElement).toBeInTheDocument();
});
