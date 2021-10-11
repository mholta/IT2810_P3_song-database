import React, { useState } from 'react';
import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { styled } from '@mui/system';
import FilterTabPanel from './SearchOptions.FilterTab';
import FilterCategoryList from './SearchOptions.FilterCategoryList';
import SearchSort from './Search.Sort';
import CategoryTabs from './CategoryTabs';
import ResetButton from './SearchOptions.Reset';

interface SearchOptionsProps {
  inForm?: boolean;
}

const SearchOptions = ({ inForm }: SearchOptionsProps) => {
  return (
    <SearchOptionsWrapper>
      <CategoryTabs />

      <SearchSortWrapper>
        <SearchSort />
        <ResetButton type={inForm ? 'search' : 'reset'} />
      </SearchSortWrapper>
    </SearchOptionsWrapper>
  );
};

const SearchSortWrapper = styled('div')`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;

  --padding-v: 0.4em; // Used in SearchSort
  margin-top: calc(-1 * var(--padding-v));
`;

const SearchOptionsWrapper = styled('div')`
  position: relative;
`;

export default SearchOptions;
