import React from 'react';
import { Song } from '../../api/types';
import Header from './components/Header';
import InfoColumn from './components/InfoColumns';

interface SongPageTemplateProps {
  song: Song;
}

/**
 * Includes the header of the song and the information about the song.
 */
const SongPageTemplate = ({ song }: SongPageTemplateProps) => {
  return (
    <div>
      <Header song={song} />
      <InfoColumn song={song} />
    </div>
  );
};

export default SongPageTemplate;
