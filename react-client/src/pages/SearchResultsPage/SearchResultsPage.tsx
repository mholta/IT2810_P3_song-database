import React from 'react';
import SongList from '../../components/lists/song/SongList';
import { styled } from '@mui/system';
import SearchOptions from '../../components/SearchFilter/SearchFilter';
import { gql, useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { FilterOptions, useFilterParams } from '../../hooks/useSearchParams';
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper';

const SearchResultsPage = () => {
  const filterParams: FilterOptions = useFilterParams();

  const { data, loading, error } = useQuery(GET_SEARCH_RESULTS, {
    variables: { ...filterParams },
  });

  return (
    <SearchResultsPageWrapper>
      <SearchOptions />

      <div style={{ position: 'relative' }}>
        {/* Loading circle */}
        <MainContentAnimationWrapper condition={loading}>
          <ProgressWrapper>
            <CircularProgress color="primary" />
          </ProgressWrapper>
        </MainContentAnimationWrapper>

        {/* Results */}
        <MainContentAnimationWrapper condition={!loading && data?.songs?.songs}>
          {!loading && data?.songs?.songs ? (
            <SongList songs={data.songs.songs} />
          ) : (
            <div />
          )}
        </MainContentAnimationWrapper>

        {/* Results */}
        <MainContentAnimationWrapper
          condition={
            !loading && data?.songs?.songs && !data?.songs?.songs.length
          }
        >
          <div>Ingen resultater. Prøv igjen eller nullstill filteret.</div>
        </MainContentAnimationWrapper>
      </div>
      {error && <div>Det skjedde en feil. Prøv på nytt senere.</div>}
    </SearchResultsPageWrapper>
  );
};

const ProgressWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchResultsPageWrapper = styled('div')`
  padding-top: 4rem;
`;

/* 
(
    $searchString: String
    $themes: [String!]!
    $contributor: String
  ) */
const GET_SEARCH_RESULTS = gql`
  query SearchSongs($searchString: String, $themes: [String!]) {
    songs(searchString: $searchString, filter: { categories: $themes }) {
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
    }
  }
`;

export default SearchResultsPage;
