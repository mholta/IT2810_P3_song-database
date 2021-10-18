import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import SongPageTemplate from './SongPageTemplate';
import { AnimatePresence, motion } from 'framer-motion';
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper';

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG_DATA, {
    variables: { id },
  });

  return (
    <MainContentAnimationWrapper condition={!loading && data?.song}>
      {!loading && data?.song ? (
        <SongPageTemplate
          song={{
            ...data.song,
            album: {
              ...data.song.album,
              releaseDate: new Date(data.song.album.releaseDate),
            },
          }}
        />
      ) : (
        <div />
      )}
    </MainContentAnimationWrapper>
  );
};

const GET_SONG_DATA = gql`
  query GetSong($id: String!) {
    song(id: $id) {
      _id
      title
      album {
        title
        picture
        releaseDate
      }
      key
      artists {
        name
      }

      tempo
      time
      writers
      contributors
      producers
      iTunes
      spotify
      categories {
        _id
        title
      }
    }
  }
`;

export default SongPage;
