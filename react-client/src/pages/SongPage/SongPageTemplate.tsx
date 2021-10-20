import React from 'react';
import { Song } from '../../api/types';
import Header from './components/Header';
import InfoColumn from './components/InfoColumns';

interface SongPageTemplateProps {
  song: Song;
}

const SongPageTemplate = ({ song }: SongPageTemplateProps) => {
  return (
    <div>
      <Header song={song} />
      <InfoColumn song={song} />
    </div>
  );
};

export default SongPageTemplate;
