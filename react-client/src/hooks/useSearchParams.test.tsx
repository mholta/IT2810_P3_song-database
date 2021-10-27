import { renderHook } from '@testing-library/react-hooks';
import { useFilterParams, useSortParams } from './useSearchParams';
import { MemoryRouter } from 'react-router';
import { SortOrder, SortType } from '../components/SearchFilter/Search.Sort';

describe('useFilterParams', () => {
  test('should get search string', () => {
    const { result } = renderHook(useFilterParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter initialEntries={['/search?query=all+pris']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.searchString).toBe('all pris');
    expect(result.current.themes).toEqual([]);
    expect(result.current.contributor).toBeNull();
  });

  test('should get themes', () => {
    const { result } = renderHook(useFilterParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter
          initialEntries={['/search?theme=overgivelse&theme=nade-og-kross']}
        >
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.searchString).toBeNull();
    expect(result.current.themes).toEqual(['overgivelse', 'nade-og-kross']);
    expect(result.current.contributor).toBeNull();
  });

  test('should get contributor', () => {
    const { result } = renderHook(useFilterParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter initialEntries={['/search?contributor=Julia%20Bruns']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.searchString).toBeNull();
    expect(result.current.themes).toEqual([]);
    expect(result.current.contributor).toBe('Julia Bruns');
  });

  test('should get all params', () => {
    const { result } = renderHook(useFilterParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter
          initialEntries={[
            '/search?query=Overvant+døden&contributor=Ola%20Nordmann&theme=tro-og-tillit&theme=fornyelse&theme=bonn',
          ]}
        >
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.searchString).toBe('Overvant døden');
    expect(result.current.themes).toEqual([
      'tro-og-tillit',
      'fornyelse',
      'bonn',
    ]);
    expect(result.current.contributor).toBe('Ola Nordmann');
  });
});

describe('useSortParams', () => {
  test('should return default sorting', () => {
    const { result } = renderHook(useSortParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter initialEntries={['/search']}>{children}</MemoryRouter>
      ),
    });

    expect(result.current.sortType).toBe(SortType.RELEASE_DATE);
    expect(result.current.sortOrder).toBe(SortOrder.DESC);
  });

  test('should sort ascending by title', () => {
    const { result } = renderHook(useSortParams, {
      wrapper: ({ children }: any) => (
        <MemoryRouter initialEntries={['/search?sort=title&order=asc']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.sortType).toBe(SortType.TITLE);
    expect(result.current.sortOrder).toBe(SortOrder.ASC);
  });
});
