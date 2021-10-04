import React from 'react';
import { styled } from '@mui/system';
import SearchInputField from './SearchInputField';

const SearchBar = () => {
  return (
    <OuterWrapper>
      <SearchInputField />
    </OuterWrapper>
  );
};

const OuterWrapper = styled('div')`
  position: relative;
`;

export default SearchBar;
