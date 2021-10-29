import { styled } from '@mui/system';
import React from 'react';
import { Song } from '../../../api/types';
import SongListItem from './SongListItem';

interface SongListProps {
  songs: Song[];
}

/**
 * List of songs.
 */
const SongList = ({ songs }: SongListProps) => {
  return (
    <Ul>
      {songs.map((song, i) => (
        <SongListItem key={'song-' + i} song={song} />
      ))}
    </Ul>
  );
};

const Ul = styled('ul')`
  padding: 0;
`;

export default SongList;
