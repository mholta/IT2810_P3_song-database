import { render, screen } from '@testing-library/react';
import { dummySong } from '../../../api/testData/dummyContent';
import { RouteFolders } from '../../../pages/MainRouter';
import { TestProvider } from '../../../utils/test-utils';
import SongListItem from './SongListItem';

describe('SongListItem', () => {
  test('renders correctly', () => {
    const component = render(
      <TestProvider isPage={false} url={'/'}>
        <SongListItem song={dummySong} />
      </TestProvider>
    );

    expect(component.container.querySelector('a')?.href).toBe(
      'http://localhost' + RouteFolders.SONG + '/' + dummySong._id
    );
    expect(component.container.querySelector('img')?.src).toBe(
      dummySong.album.picture
    );
    expect(component.container.querySelector('h4')?.innerHTML).toBe(
      dummySong.title
    );
    expect(screen.getByText(dummySong.artists[0].name)).toBeTruthy();
  });
});
