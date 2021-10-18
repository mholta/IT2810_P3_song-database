import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAllThemes } from '../store/filter/filter.actions';

export const useStaticContent = () => {
  const dispatch = useDispatch();
  const { data: themesData, loading } = useQuery(GET_THEMES);

  useEffect(() => {
    if (!loading && themesData?.categories) {
      dispatch(setAllThemes(themesData.categories));
    }
  }, [loading]);
};

const GET_THEMES = gql`
  query GetThemes {
    categories {
      _id
      title
    }
  }
`;
