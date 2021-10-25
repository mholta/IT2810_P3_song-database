import React from 'react';
import { TestProvider } from '../../utils/test-utils';
import SongPage, { GET_SONG_DATA } from './SongPage';
import { dummySong } from '../../api/testData/dummyContent';
import renderer from 'react-test-renderer';

const mockData = [
  {
    request: {
      query: GET_SONG_DATA,
      variables: { id: 'all-pris-acta-lovsang' },
    },
    result: {
      data: { song: dummySong },
    },
  },
  {
    request: {
      query: GET_SONG_DATA,
      variables: { id: 'all-pris-acta-lovsan' },
    },
    error: new Error('Something went wrong'),
  },
];

test('rendered successfully', () => {
  const tree = renderer
    .create(
      <TestProvider
        gqlMocks={mockData}
        url="/song/:id"
        params={{ id: 'all-pris-acta-lovsang' }}
      >
        <SongPage />
      </TestProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('should show "song not found"', () => {
  const tree = renderer
    .create(
      <TestProvider
        gqlMocks={mockData}
        url="/song/:id"
        params={{ id: 'all-pris-acta-lovsan' }}
      >
        <SongPage />
      </TestProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
