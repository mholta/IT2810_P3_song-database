import { render, fireEvent, screen } from '@testing-library/react';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { createTestStore, TestProvider } from '../../../utils/test-utils';
import SearchInputField from './SearchInputField';

describe('SearchInputField', () => {
  const store = createTestStore();

  test('will open filter menu on click', () => {
    const dispatchMock = jest.spyOn(store, 'dispatch');

    render(
      <TestProvider isPage={false} url={'/'} store={store}>
        <SearchInputField />
      </TestProvider>
    );

    fireEvent.focus(screen.getByRole('searchbox'));

    expect(dispatchMock).toHaveBeenCalledWith(setTopBarOpen(true));
  });
});
