import React from 'react';
import { useLocation } from 'react-router';
import { Link } from '../../components/elements/Typography';
import { RouteFolders } from '../MainRouter';
import { dummySongList } from '../../api/dummyContent';
import { Song } from '../../api/types';
import SongList from '../../components/lists/song/SongList';
import { styled } from '@mui/system';
import SearchOptions from '../../components/SearchFilter/SearchFilter';
import { useQuery } from '../../hooks/useQuery';

const SearchResultsPage = () => {
  const [queryParams, push] = useQuery();

  const searchTextQuery = queryParams.get('query');

  const songs: Song[] = dummySongList;

  return (
    <SearchResultsPageWrapper>
      <SearchOptions />
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
    </SearchResultsPageWrapper>
  );
};

const SearchResultsPageWrapper = styled('div')`
  padding-top: 4rem;
`;

export default SearchResultsPage;
