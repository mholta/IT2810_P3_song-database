import React from 'react';
import { styled } from '@mui/system';
import SearchOptions from '../../components/SearchFilter/SearchFilter';
import { gql } from '@apollo/client';
import { FilterOptions, useFilterParams } from '../../hooks/useSearchParams';
import SearchResults from '../../components/SearchResults/SearchResults';

const SearchResultsPage = () => {
  const filterParams: FilterOptions = useFilterParams();

  return (
    <SearchResultsPageWrapper>
      <SearchOptions />
      <SearchResults
        query={GET_SEARCH_RESULTS}
        limit={20}
        options={{
          variables: { ...filterParams },
        }}
      />
    </SearchResultsPageWrapper>
  );
};

const SearchResultsPageWrapper = styled('div')`
  padding-top: 4rem;
`;

const GET_SEARCH_RESULTS = gql`
  query Songs(
    $searchString: String
    $themes: [String!]
    $page: Int!
    $limit: Int!
  ) {
    songs(
      searchString: $searchString
      filter: { categories: $themes }
      limit: $limit
      page: $page
    ) {
      songs {
        _id
        artists {
          name
        }
        title
        album {
          picture
        }
      }
      pages
    }
  }
`;

export default SearchResultsPage;
