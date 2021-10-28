import React from 'react';
import { gql } from '@apollo/client';
import DropdownSearch from './DropdownSearch';
import { Button } from '@mui/material';

interface AlbumSelect {
  setValueCallback: (value: string) => void;
  setNewAlbumModalOpenCallback: (value: boolean) => void;
  artistId: string;
}

const AlbumSelect = ({
  setValueCallback,
  setNewAlbumModalOpenCallback,
  artistId,
}: AlbumSelect) => {
  return (
    <DropdownSearch
      required
      id="album-search"
      dataKey="albums"
      label="Album"
      query={GET_ALBUM_QUERY}
      variables={{
        artist: artistId,
        title: '',
        limit: 4,
      }}
      searchKey="title"
      setValueCallback={setValueCallback}
      noOptionsComponent={
        <div>
          Ingen resultat.
          <Button
            onClick={() => setNewAlbumModalOpenCallback(true)}
            variant="contained"
          >
            Opprett nytt album
          </Button>
        </div>
      }
    />
  );
};

export const GET_ALBUM_QUERY = gql`
  query GetAlbums($artist: String!, $title: String, $limit: Int!) {
    albums(artist: $artist, title: $title, limit: $limit) {
      _id
      title
    }
  }
`;

export default AlbumSelect;
