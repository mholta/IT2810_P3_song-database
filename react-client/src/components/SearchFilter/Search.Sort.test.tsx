import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchSort from './Search.Sort';

describe('SearchSort', () => {
  test('should sort with default search options', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchSort />
      </MemoryRouter>
    );

    expect(screen.getByText('Sorter på nyeste')).toBeTruthy();
  });

  test('should sort by descending title', () => {
    render(
      <MemoryRouter initialEntries={['/search?sort=title&order=desc']}>
        <SearchSort />
      </MemoryRouter>
    );

    expect(screen.getByText('Sorter på Tittel Å-A')).toBeTruthy();
  });

  test('should sort by ascending artist', async () => {
    render(
      <MemoryRouter initialEntries={['/search?sort=artists&order=asc']}>
        <SearchSort />
      </MemoryRouter>
    );

    expect(screen.getByText('Sorter på Artist A-Å')).toBeTruthy();
  });
});
