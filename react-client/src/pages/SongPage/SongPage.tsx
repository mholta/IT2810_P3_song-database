import React from 'react';
import { useParams } from 'react-router';
import { dummySong } from '../../api/dummyContent';
import SongPageTemplate from './SongPageTemplate';

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  const song = dummySong;

  return (
    <>
      Sang id: {id}
      <SongPageTemplate song={song} />
    </>
  );
};

export default SongPage;
