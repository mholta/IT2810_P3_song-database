import React from 'react';
import { useLocation } from 'react-router';
import { Link } from '../../components/elements/Typography';
import { RouteFolders } from '../MainRouter';
import { dummySongList } from '../../api/dummyContent';
import { Song } from '../../api/types';
import SongList from '../../components/lists/song/SongList';

const SearchResultsPage = () => {
  const queryParams = useQuery();

  const searchTextQuery = queryParams.get('query');

  const songs: Song[] = dummySongList;

  return (
    <>
      Søker på:{' '}
      <Link
        to={
          RouteFolders.SONG +
          '/' +
          searchTextQuery?.replaceAll(' ', '-')?.toLowerCase()
        }
      >
        {searchTextQuery}
      </Link>
      <SongList songs={songs} />
    </>
  );
};

const useQuery = () => new URLSearchParams(useLocation().search);

export default SearchResultsPage;
