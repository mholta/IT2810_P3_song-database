import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router';
import SongPageTemplate from './SongPageTemplate';
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper';
import { Routes } from '../MainRouter';

/**
 * Page for displaying information about a song.
 */
const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_SONG_DATA, {
    variables: { id },
  });

  const history = useHistory();
  if (!error && !loading && !data?.song) history.push(Routes.NOT_FOUND);

  return (
    <MainContentAnimationWrapper condition={!loading && data?.song}>
      {!loading && data?.song ? (
        <SongPageTemplate
          song={{
            ...data.song,
            releaseDate: new Date(data.song.releaseDate),
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

export const GET_SONG_DATA = gql`
  query GetSong($id: String!) {
    song(id: $id) {
      _id
      title
      releaseDate
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
