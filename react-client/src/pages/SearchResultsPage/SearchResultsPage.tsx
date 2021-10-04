import React from 'react';
import { useLocation } from 'react-router';
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper';

const SearchResultsPage = () => {
  const queryParams = useQuery();

  const searchTextQuery = queryParams.get('query');

  return (
    <PageLayoutWrapper>
      Søker på:{' '}
      <a href={'/song/' + searchTextQuery?.replaceAll(' ', '-')?.toLowerCase()}>
        {searchTextQuery}
      </a>
    </PageLayoutWrapper>
  );
};

const useQuery = () => new URLSearchParams(useLocation().search);

export default SearchResultsPage;
