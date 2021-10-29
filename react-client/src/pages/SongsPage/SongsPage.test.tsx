import { TestProvider } from '../../utils/test-utils';
import renderer from 'react-test-renderer';
import SongsPage, { GET_SEARCH_RESULTS } from './SongsPage';
import { dummySong, dummySongList } from '../../api/testData/dummyContent';

const mockData = [
  {
    request: {
      query: GET_SEARCH_RESULTS,
      variables: { searchString: null, contributor: null, themes: [] },
    },
    result: {
      data: { songs: { songs: dummySongList } },
    },
  },
  {
    request: {
      query: GET_SEARCH_RESULTS,
      variables: { searchString: 'all pris', contributor: null, themes: [] },
    },
    result: {
      data: { songs: { songs: [dummySong] } },
    },
  },
  {
    request: {
      query: GET_SEARCH_RESULTS,
      variables: {
        searchString: 'songnotfound',
        contributor: null,
        themes: [],
      },
    },
    result: {
      data: { songs: { songs: [] } },
    },
  },
];

describe('SongsPage', () => {
  test('rendered successfully', () => {
    const tree = renderer
      .create(
        <TestProvider gqlMocks={mockData} url="/search">
          <SongsPage />
        </TestProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('rendered successfully with query', () => {
    const tree = renderer
      .create(
        <TestProvider gqlMocks={mockData} url="/search?query=all+pris">
          <SongsPage />
        </TestProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('rendered successfully without results', () => {
    const tree = renderer
      .create(
        <TestProvider gqlMocks={mockData} url="/search?query=songnotfound">
          <SongsPage />
        </TestProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
