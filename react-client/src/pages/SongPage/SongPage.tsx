import React from 'react';
import { useParams } from 'react-router';
import { dummySong } from '../../api/dummyContent';
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper';
import SongPageTemplate from './SongPageTemplate';

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  const song = dummySong;

  return (
    <PageLayoutWrapper>
      Sang id: {id}
      <SongPageTemplate song={song} />
    </PageLayoutWrapper>
  );
};

export default SongPage;
