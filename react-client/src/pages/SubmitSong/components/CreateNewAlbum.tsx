import { Button, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import {
  setCoverImage,
  setReleaseDate,
  setTitle,
} from '../album/album.actions';
import { AlbumState } from '../album/album.reducer';
import DatePicker from '@mui/lab/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
interface CreateNewAlbumProps {
  state: AlbumState;
  dispatch: React.Dispatch<any>;
  setCreateNewAlbumModalOpen: React.Dispatch<boolean>;
  setDateCallback: (date: Date | null) => void;
  setDateAlbumError: React.Dispatch<boolean>;
}

const CreateNewAlbum = ({
  state,
  dispatch,
  setCreateNewAlbumModalOpen,
  setDateCallback,
  setDateAlbumError,
}: CreateNewAlbumProps) => {
  const [dateOpen, setDateOpen] = useState(false);
  return (
    <SubmitSongFormWrapper>
      <AlignClose>
        <Title>Opprett nytt album</Title>
        <IconButton onClick={() => setCreateNewAlbumModalOpen(false)}>
          <CloseIcon />
        </IconButton>
      </AlignClose>

      {/* Title */}
      <TextField
        required
        label="Tittel"
        id="album-title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setTitle(e.target.value))
        }
        value={state.title}
      />

      {/* Release date */}
      <DatePicker
        open={dateOpen}
        onClose={() => setDateOpen(false)}
        label="Utgivelsesdato"
        value={state.releaseDate}
        onChange={(newValue) => {
          dispatch(setReleaseDate(newValue));
          setDateCallback(newValue);
        }}
        onError={(err) => {
          setDateAlbumError(err !== null ? true : false);
        }}
        renderInput={(params) => (
          <TextField {...params} onClick={() => setDateOpen(true)} />
        )}
      />

      {/* Cover image upload */}
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span">
          Last opp coverbilde
        </Button>
      </label>
      <input
        required
        accept="image/*"
        style={{
          width: '1px',
          height: '1px',
          opacity: 0,
          display: 'block',
          marginLeft: '10%',
          // overflow: "hidden",
          position: 'relative',
          zIndex: -1,
        }}
        id="raised-button-file"
        type="file"
        onChange={({
          target: { validity, files },
        }: React.ChangeEvent<HTMLInputElement>) => {
          validity.valid && dispatch(setCoverImage(files?.length && files[0]));
        }}
      />

      <div>
        {state.coverImage ? (
          <img
            src={URL.createObjectURL(state.coverImage)}
            alt="preview"
            style={{ maxWidth: '6rem' }}
          ></img>
        ) : (
          <div>Trykk på knappen for å laste opp bilde</div>
        )}
      </div>
    </SubmitSongFormWrapper>
  );
};

const Title = styled('h2')`
  margin: 0;
`;

const SubmitSongFormWrapper = styled('div')`
  display: grid;
  gap: 1rem;
`;

const AlignClose = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export default CreateNewAlbum;
