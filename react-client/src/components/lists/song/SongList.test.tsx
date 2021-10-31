import { render, screen } from '@testing-library/react';
import { dummySong, dummySongList } from '../../../api/testData/dummyContent';
import { RouteFolders } from '../../../pages/MainRouter';
import { TestProvider } from '../../../utils/test-utils';
import SongList from './SongList';

describe('SongListItem', () => {
  test('renders all songs correctly', () => {
    render(
      <TestProvider isPage={false} url={'/'}>
        <SongList songs={dummySongList} />
      </TestProvider>
    );

    expect(screen.getAllByText(dummySong.artists[0].name).length).toBe(5);
  });
});
