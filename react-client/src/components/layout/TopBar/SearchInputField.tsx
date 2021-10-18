import React, { useState } from 'react';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';
import { QueryParam, useQuery } from '../../../hooks/useQuery';

const SearchInputField = () => {
  const dispatch = useDispatch();
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );

  const query = useQuery();
  const [initialValue, setInitialValue] = useState<string>(
    query.get(QueryParam.QUERY) ?? ''
  );

  const openTopBar = () => !topBarOpen && dispatch(setTopBarOpen(true));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValue(event.target.value);
  };

  return (
    <SearchInputFieldWrapper>
      <SearchIconWrapper focused={topBarOpen ? 1 : 0}>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        placeholder="Søk på sang"
        name="query"
        autoComplete="off"
        onFocus={openTopBar}
        open={topBarOpen ? 1 : 0}
        value={initialValue}
        onChange={handleChange}
      />
    </SearchInputFieldWrapper>
  );
};

const SearchInput = styled('input')<{ open: number }>`
  all: unset;
  display: block;
  padding: 1.4rem;
  padding-left: 4rem;

  color: ${({ theme }) => theme.palette.text.primary};

  cursor: ${({ open }) => (open ? 'text' : 'pointer')};

  &:focus {
    cursor: text;
  }
`;

const SearchIconWrapper = styled('div')<{ focused: number }>`
  position: absolute;
  left: 0;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: color 200ms ease;

  color: ${({ theme, focused }) =>
    focused ? theme.palette.text.primary : theme.palette.text.secondary};

  pointer-events: none;

  & svg {
    font-size: 1.6em;
  }
`;

const SearchInputFieldWrapper = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
`;

export default SearchInputField;
