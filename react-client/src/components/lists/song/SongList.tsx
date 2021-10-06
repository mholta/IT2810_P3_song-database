import { styled } from '@mui/system';
import React from 'react';
import { Song } from '../../../api/types';
import SongListItem from './SongListItem';

interface SongListProps {
  songs: Song[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <div>
      SongList
      <Ul>
        {songs.map((song, i) => (
          <SongListItem key={'song-' + i} song={song} />
        ))}
      </Ul>
    </div>
  );
};

const Ul = styled('ul')`
  padding: 0;
`;

export default SongList;
