import { Button, IconButton, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
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
}

const CreateNewAlbum = ({
  state,
  dispatch,
  setCreateNewAlbumModalOpen,
}: CreateNewAlbumProps) => {
  console.log(state.coverImage);

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
        label="Utgivelsesdato"
        value={state.releaseDate}
        onChange={(newValue) => dispatch(setReleaseDate(newValue))}
        renderInput={(params) => <TextField {...params} />}
      />

      {/* Cover image upload */}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={({
          target: { validity, files },
        }: React.ChangeEvent<HTMLInputElement>) => {
          validity.valid && dispatch(setCoverImage(files?.length && files[0]));
        }}
      />
      <label htmlFor="raised-button-file">
        <Button variant="outlined" component="span">
          Last opp coverbilde
        </Button>
      </label>
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
