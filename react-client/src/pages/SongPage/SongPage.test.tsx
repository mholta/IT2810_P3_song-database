import React from 'react';
import { render, screen } from '../../utils/test-utils';
import SongPage, { GET_SONG_DATA } from './SongPage';
import { dummySong } from '../../api/testData/dummyContent';

const mocks = [
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

test('renders page', async () => {
  render(<SongPage />, mocks, '/song/:id', { id: 'all-pris-acta-lovsang' });

  const linkElement = await screen.findByText('All pris');
  expect(linkElement).toBeInTheDocument();
});
