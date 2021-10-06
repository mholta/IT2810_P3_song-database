import React from 'react';
import { useLocation } from 'react-router';
import { Link } from '../../components/elements/Typography';
import { RouteFolders } from '../MainRouter';

const SearchResultsPage = () => {
  const queryParams = useQuery();

  const searchTextQuery = queryParams.get('query');

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
    </>
  );
};

const useQuery = () => new URLSearchParams(useLocation().search);

export default SearchResultsPage;
