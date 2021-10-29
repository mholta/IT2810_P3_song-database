import React, { useEffect, useState } from 'react';
import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
  useQuery,
} from '@apollo/client';
import { CircularProgress, styled } from '@mui/material';
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper';
import SongList from '../lists/song/SongList';
import { Song } from '../../api/types';
import { useInView } from 'react-intersection-observer';

interface SearchResultsProps {
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  options?: QueryHookOptions<any, OperationVariables>;
  limit?: number;
  page?: number;
}

/**
 * Displays the results of a search.
 */
const SearchResults = ({
  query,
  options,
  limit = 20,
  page = 1,
}: SearchResultsProps) => {
  const { data, loading, error, fetchMore } = useQuery(query, {
    ...options,
    variables: {
      ...options?.variables,
      limit: limit,
      page: page,
    },
  });

  const [loadedPageNum, setLoadedPageNum] = useState<number>(page);
  const [lastPageNum, setLastPageNum] = useState<number>();
  const [songs, setSongs] = useState<Song[]>([]);

  // Set initial songs fetched
  useEffect(() => {
    if (data?.songs?.songs) setSongs(data.songs.songs);
  }, [data]);

  // Set total amount of pages count
  useEffect(() => {
    data?.songs?.pages && setLastPageNum(data?.songs?.pages);
  }, [data?.songs?.pages]);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    trackVisibility: true,
    delay: 200,
  });

  useEffect(() => {
    if (!inView) return;

    const loadMore = () => {
      fetchMore({
        variables: {
          page: loadedPageNum + 1,
        },
      })
        .then((fetchMoreResult) => {
          if (fetchMoreResult.data?.songs?.songs) {
            setSongs([...songs, ...fetchMoreResult.data.songs.songs]);
          }
        })
        .then(() => setLoadedPageNum(loadedPageNum + 1));
    };

    loadMore();
    // eslint-disable-next-line
  }, [inView, fetchMore]);

  return (
    <>
      {!error && (
        <div style={{ position: 'relative' }}>
          {/* Loading circle */}
          <MainContentAnimationWrapper condition={loading}>
            <ProgressWrapper>
              <CircularProgress color="primary" />
            </ProgressWrapper>
          </MainContentAnimationWrapper>

          {/* Results */}
          <MainContentAnimationWrapper condition={data?.songs?.songs}>
            {data?.songs?.songs ? <SongList songs={songs} /> : <div />}
          </MainContentAnimationWrapper>

          {/* Load more button */}
          {lastPageNum !== undefined && loadedPageNum < lastPageNum && (
            <div ref={ref} style={{ height: 100 }}></div>
          )}

          {/* No results */}
          <MainContentAnimationWrapper
            condition={
              !loading && data?.songs?.songs && !data?.songs?.songs.length
            }
          >
            <div>Ingen resultater. Prøv igjen eller nullstill filteret.</div>
          </MainContentAnimationWrapper>
        </div>
      )}
      {error && <div>Det skjedde en feil. Prøv på nytt senere.</div>}
    </>
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

export default SearchResults;
