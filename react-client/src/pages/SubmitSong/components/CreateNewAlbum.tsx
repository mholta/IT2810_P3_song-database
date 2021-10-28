import React, { useReducer } from 'react';
import { albumReducer, initialAlbumState } from '../album/album.reducer';

interface CreateNewAlbumProps {}

const CreateNewAlbum = ({}: CreateNewAlbumProps) => {
  const [state, dispatch] = useReducer(albumReducer, initialAlbumState);

  return <div>CreateNewAlbum</div>;
};

export default CreateNewAlbum;
