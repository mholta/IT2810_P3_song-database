import React from 'react';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

const SearchInputField = () => {
  return (
    <SearchInputFieldForm action="/search" method="GET">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput placeholder="Søk på sang" name="query" />
    </SearchInputFieldForm>
  );
};

const SearchInput = styled('input')`
  all: unset;
  display: block;
  padding: 1.4rem;
  padding-left: 4rem;

  color: ${(props) => props.theme.palette.grey[900]};

  cursor: pointer;

  &:focus {
    cursor: text;
  }
`;

const SearchIconWrapper = styled('div')`
  position: absolute;
  left: 0;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    font-size: 1.6em;
  }
`;

const SearchInputFieldForm = styled('form')`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[400]};
`;

export default SearchInputField;
