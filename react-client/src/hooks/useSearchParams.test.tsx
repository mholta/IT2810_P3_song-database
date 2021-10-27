import { renderHook, act } from '@testing-library/react-hooks';
import { FilterOptions, useFilterParams } from './useSearchParams';
import { TestProvider } from '../utils/test-utils';

describe('useFilterParams', () => {
  test('should get search string', () => {
    const Wrapper = ({ children }: any) => (
      <TestProvider url="/search?query=all+pris">{children}</TestProvider>
    );

    const { result } = renderHook(useFilterParams, { wrapper: Wrapper });

    expect(result.current.searchString).toBe('all pris');
  });
});
