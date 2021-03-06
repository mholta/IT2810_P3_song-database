import React from 'react';
import { styled } from '@mui/system';
import SearchOptions from '../../components/SearchFilter/SearchFilter';
import { gql } from '@apollo/client';
import {
  FilterOptions,
  SortOptions,
  useFilterParams,
  useSortParams,
} from '../../hooks/useSearchParams';
import SearchResults from '../../components/SearchResults/SearchResults';

/**
 * Page displaying the results of a search for songs.
 */
const SearchResultsPage = () => {
  const filterParams: FilterOptions = useFilterParams();
  const sortParams: SortOptions = useSortParams();

  return (
    <SearchResultsPageWrapper>
      {!filterParams.contributor && <SearchOptions />}
      {filterParams.contributor && (
        <h1>Sanger {filterParams.contributor} bidrar på</h1>
      )}
      <SearchResults
        query={GET_SEARCH_RESULTS}
        limit={20}
        options={{
          variables: {
            ...filterParams,
            ...sortParams,
          },
        }}
      />
    </SearchResultsPageWrapper>
  );
};

const SearchResultsPageWrapper = styled('div')`
  padding-top: 4rem;
`;

export const GET_SEARCH_RESULTS = gql`
  query Songs(
    $searchString: String
    $themes: [String!]
    $contributor: String
    $sortOrder: SortOrder!
    $sortType: SortType!
    $page: Int!
    $limit: Int!
  ) {
    songs(
      searchString: $searchString
      filter: { categories: $themes, contributor: $contributor }
      limit: $limit
      page: $page
      sorting: { order: $sortOrder, sortType: $sortType }
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
