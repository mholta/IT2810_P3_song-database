import { useMutation, gql } from '@apollo/client';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { albumReducer, initialAlbumState } from '../album/album.reducer';
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
import CreateNewAlbum from './CreateNewAlbum';
import DatePicker from '@mui/lab/DatePicker';
import { setReleaseDate } from '../song/song.actions';
import { isLegalTime, formatTime, formatKey, isKeyArt } from './inputCheck';

interface SubmitSongFormProps {}

const SubmitSongForm = ({}: SubmitSongFormProps) => {
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const [albumState, albumDispatch] = useReducer(
    albumReducer,
    initialAlbumState
  );
  const [inputError, setInputError] = useState('');

  const allThemes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );
  const [
    createNewAlbumModalOpen,
    setCreateNewAlbumModalOpen,
  ] = useState<boolean>(false);

  // Mutation
  const [createSong, { loading, error }] = useMutation(CREATE_SONG_MUTATION);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      dispatch(setTempo(formatKey(state.key)));
      dispatch(setTime(formatTime(state.time)));
    } catch (err) {
      // console.log(err.message);
      if (err instanceof Error) setInputError(err.message);
      else {
        setInputError('Unknown error');
      }
      return;
    }

    // Create song
    createSong({
      variables: {
        album: createNewAlbumModalOpen ? albumState.title : state.albumId,
        artists: state.artists,
        categories: state.themes.map((theme) => theme._id),
        contibutors: state.contributorsList,
        iTunes: state.appleMusicLink,
        key: state.key,
        producers: state.producersList,
        releaseDate: createNewAlbumModalOpen
          ? albumState.releaseDate
          : state.releaseDate, // TODO: Implement date picker in song
        spotify: state.spotifyLink,
        tempo: state.tempo,
        time: state.time,
        title: state.title,
        writers: state.writersList,
        file: albumState.coverImage,
      },
    });
  };

  if (loading) return <>'Submitting...'</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <>
      <SubmitSongFormWrapper
        action="/"
        onSubmit={handleSubmit}
        onChange={() => setInputError('')}
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
        {state.mainArtistId &&
          (createNewAlbumModalOpen ? (
            <ModalBox>
              <CreateNewAlbum
                state={albumState}
                dispatch={albumDispatch}
                setCreateNewAlbumModalOpen={setCreateNewAlbumModalOpen}
              />
            </ModalBox>
          ) : (
            <AlbumSelect
              artistId={state.mainArtistId}
              setValueCallback={(value: string) => dispatch(setAlbumId(value))}
              setNewAlbumModalOpenCallback={() =>
                setCreateNewAlbumModalOpen(true)
              }
            />
          ))}

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

        {/* Release date */}
        <DatePicker
          label="Utgivelsesdato"
          value={state.releaseDate}
          onChange={(newValue) => dispatch(setReleaseDate(newValue))}
          renderInput={(params) => <TextField {...params} />}
        />

        {/* Themes */}
        <Autocomplete
          multiple
          id="themes"
          options={allThemes}
          getOptionLabel={(theme) => theme.title}
          value={state.themes}
          onChange={(_, newValue) => {
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
            error={inputError === 'key'}
            helperText={inputError === 'key' ? 'Feil format' : undefined}
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
            error={inputError === 'time'}
            helperText={inputError === 'time' ? 'Feil format' : undefined}
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
    </>
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
    $file: Upload
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
      file: $file
    ) {
      _id
      title
    }
  }
`;

const ModalBox = styled('div')`
  padding: 2rem;
  border-radius: 1rem;
  border: 4px solid ${({ theme }) => theme.palette.grey[700]};
  background-color: ${({ theme }) => theme.palette.background.default};
  max-width: 80vw;
`;

const SubmitSongFormWrapper = styled('form')`
  display: grid;
  gap: 1rem;
`;

export default SubmitSongForm;
