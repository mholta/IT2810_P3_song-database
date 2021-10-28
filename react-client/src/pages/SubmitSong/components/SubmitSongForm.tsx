import { useMutation, gql } from '@apollo/client';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useReducer } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  setAlbumId,
  setAppleMusicLink,
  setContributorsString,
  setKey,
  setMainArtist,
  setProducersString,
  setSpotifyLink,
  setTempo,
  setThemes,
  setTime,
  setTitle,
  setWritersString,
} from '../song/song.actions';
import { initialSongState, songReducer } from '../song/song.reducer';
import AlbumSelect from './AlbumSelect';
import ArtistSearch from './ArtistSelect';
import ContributorsWithPreview from './ContributorsWithPreview';

interface SubmitSongFormProps {}

const SubmitSongForm = ({}: SubmitSongFormProps) => {
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const allThemes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );

  // Mutation
  const [createSong, { data, loading, error }] =
    useMutation(CREATE_SONG_MUTATION);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Create song
    createSong({
      variables: {
        album: state.albumId,
        artists: state.artists,
        categories: state.themes.map((theme) => theme._id),
        contibutors: state.contributorsList,
        iTunes: state.appleMusicLink,
        key: state.key,
        producers: state.producersList,
        releaseDate: new Date(),
        spotify: state.spotifyLink,
        tempo: state.tempo,
        time: state.time,
        title: state.title,
        writers: state.writersList,
      },
    });
  };

  if (loading) return <>'Submitting...'</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <SubmitSongFormWrapper
      action="/"
      onSubmit={handleSubmit}
      onKeyPress={(e: any) => {
        // Prevent for submission when clicking enter, but allow
        // default behaviour on textareas
        if (e.key === 'Enter' && e.target?.nodeName !== 'TEXTAREA')
          e.preventDefault();
      }}
    >
      {/* Submitter artist */}
      <ArtistSearch
        setValueCallback={(value: string) => dispatch(setMainArtist(value))}
      />

      {/* Album */}
      {state.mainArtistId && (
        <AlbumSelect
          artistId={state.mainArtistId}
          setValueCallback={(value: string) => dispatch(setAlbumId(value))}
        />
      )}

      {/* Title */}
      <TextField
        required
        label="Tittel"
        id="song-title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setTitle(e.target.value))
        }
        value={state.title}
      />

      {/* Aditional artists */}

      {/* Themes */}
      <Autocomplete
        multiple
        id="themes"
        options={allThemes}
        getOptionLabel={(theme) => theme.title}
        value={state.themes}
        onChange={(e, newValue) => {
          dispatch(setThemes(newValue));
        }}
        noOptionsText="Kunne ikke hente tema."
        renderInput={(params) => {
          const themesLimit = 4;
          const themesCount = state.themes.length;
          const tooManyChosen = themesCount > themesLimit;

          return (
            <TextField
              {...params}
              variant="outlined"
              label="Tema"
              placeholder={themesCount + 1 > themesLimit ? '' : 'Tema'}
              error={tooManyChosen}
              helperText={
                tooManyChosen
                  ? 'For mange tema. Du kan maks 4 tema.'
                  : 'Velg opp til 4 tema.'
              }
            />
          );
        }}
      />

      {/* Key, tempo, time */}
      <Stack direction="row" spacing={1}>
        <TextField
          required
          label="Toneart"
          id="key"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setKey(e.target.value))
          }
          value={state.key}
        />
        <TextField
          label="Tempo"
          id="tempo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setTempo(e.target.value))
          }
          value={state.tempo}
          placeholder="120"
        />
        <TextField
          label="Time"
          id="time"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setTime(e.target.value))
          }
          value={state.time}
          placeholder="4/4"
        />
      </Stack>

      {/* Optional metadata */}

      {/* Writers */}
      <ContributorsWithPreview
        label="Låtskrivere"
        id="writers"
        placeholder="Ola, Kari"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setWritersString(e.target.value))
        }
        valueString={state.writersString}
        valueList={state.writersList}
      />

      {/* Producers */}
      <ContributorsWithPreview
        label="Produsent(er)"
        id="producers"
        placeholder="Ola, Kari (med-produsent)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setProducersString(e.target.value))
        }
        valueString={state.producersString}
        valueList={state.producersList}
        helperText="Skriv rolle i parantes om ønskelig."
      />

      {/* Contributors */}
      <ContributorsWithPreview
        label="Bidragsytere"
        id="contributors"
        placeholder="Ola (gitar), Kari (vokal)"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setContributorsString(e.target.value))
        }
        valueString={state.contributorsString}
        valueList={state.contributorsList}
        helperText="Skriv rolle i parantes om ønskelig."
      />

      {/* Links */}

      {/* Spotify */}
      <TextField
        label="Link til Spotify"
        id="song-spotify-link"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setSpotifyLink(e.target.value))
        }
        value={state.spotifyLink}
      />

      {/* Apple Music */}
      <TextField
        label="Link til Apple Music"
        id="song-apple-music-link"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setAppleMusicLink(e.target.value))
        }
        value={state.appleMusicLink}
      />

      <Button type="submit" variant="contained" color="primary">
        Send inn!
      </Button>
    </SubmitSongFormWrapper>
  );
};

const CREATE_SONG_MUTATION = gql`
  mutation CreateSong(
    $album: String!
    $artists: [String!]!
    $categories: [String!]
    $contributors: [String!]
    $iTunes: String
    $key: String
    $producers: [String!]
    $releaseDate: Date!
    $spotify: String
    $tempo: String
    $time: String
    $title: String!
    $writers: [String!]
  ) {
    createSong(
      album: $album
      artists: $artists
      categories: $categories
      contributors: $contributors
      iTunes: $iTunes
      key: $key
      producers: $producers
      releaseDate: $releaseDate
      spotify: $spotify
      tempo: $tempo
      time: $time
      title: $title
      writers: $writers
    ) {
      _id
      title
    }
  }
`;

const SubmitSongFormWrapper = styled('form')`
  display: grid;
  gap: 1rem;
`;

export default SubmitSongForm;
