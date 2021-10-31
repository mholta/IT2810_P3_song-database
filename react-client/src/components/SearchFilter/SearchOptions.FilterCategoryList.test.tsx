import { render, fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { dummyCategories } from '../../api/testData/dummyContent';
import { QueryParam, useQueryParams } from '../../hooks/useQueryParams';
import { TestProvider } from '../../utils/test-utils';
import FilterCategoryList from './SearchOptions.FilterCategoryList';

const mockedSet = jest.fn();
const mockedDelete = jest.fn();

jest.mock('../../hooks/useQueryParams', () => ({
  ...jest.requireActual('../../hooks/useQueryParams'),
  useQueryParams: () => ({
    hasValue: (_: string, value: string) => value === 'han',
    getAll: () => [],
    set: mockedSet,
    deleteParamWithValue: mockedDelete,
  }),
}));

describe('FilterCategoryList', () => {
  test('will select categories and unselect categories', () => {
    render(
      <TestProvider isPage={false} url={'/'}>
        <FilterCategoryList
          queryParam={QueryParam.THEME}
          categories={dummyCategories}
        />
      </TestProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('glede'));
      fireEvent.click(screen.getByText('han'));
    });
    expect(mockedSet).toHaveBeenCalledWith(QueryParam.THEME, 'glede', true);
    expect(mockedDelete).toHaveBeenCalledWith(QueryParam.THEME, 'han');
  });
});
