import { renderHook } from '@testing-library/react-hooks';
import { MockedProvider } from '@apollo/client/testing';
import { GET_THEMES, useStaticContent } from './useStaticContent';
import { dummyCategories } from '../api/testData/dummyContent';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store/index';
import redux from 'react-redux';
import { SET_ALL_THEMES } from '../store/filter/filter.actionTypes';

const mockData = [
  {
    request: {
      query: GET_THEMES,
    },
    result: {
      data: { categories: dummyCategories },
      loading: false,
    },
  },
];

const store = createStore(rootReducer, composeWithDevTools());

describe('useStaticContent', () => {
  test('should get categories and store them', async () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const { result } = renderHook(useStaticContent, {
      wrapper: ({ children }: any) => (
        <MockedProvider mocks={mockData}>
          <Provider store={store}>{children}</Provider>
        </MockedProvider>
      ),
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current).toBeUndefined();
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: SET_ALL_THEMES,
      payload: {
        themes: dummyCategories,
      },
    });
    expect(store.getState().filter.allThemes).toEqual(dummyCategories);
  });
});
