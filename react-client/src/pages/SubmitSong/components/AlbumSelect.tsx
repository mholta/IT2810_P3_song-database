import React from 'react';
import { gql } from '@apollo/client';
import DropdownSearch from './DropdownSearch';

interface AlbumSelect {
  setValueCallback: (value: string) => void;
  artistId: string;
}

const AlbumSelect = ({ setValueCallback, artistId }: AlbumSelect) => {
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
