import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';
import { QueryParam, useQueryParams } from '../../../hooks/useQueryParams';
import { useLocation } from 'react-router';
import { RouteFolders } from '../../../pages/MainRouter';

const SearchInputField = () => {
  const dispatch = useDispatch();
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );

  const queryParams = useQueryParams();
  const [value, setValue] = useState<string>(
    queryParams.get(QueryParam.QUERY) ?? ''
  );

  const location = useLocation();
  const isSearchPage = location.pathname.startsWith(RouteFolders.SEARCH);

  useEffect(() => {
    isSearchPage && setValue(queryParams.get(QueryParam.QUERY) ?? '');
    // eslint-disable-next-line
  }, [location.pathname]);

  const openTopBar = () => !topBarOpen && dispatch(setTopBarOpen(true));

  const triggerSubmit = () => {
    if (value) queryParams.set(QueryParam.QUERY, value);
    else queryParams.delete(QueryParam.QUERY);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [bypassTimeout, setBypassTimeout] = useState<boolean>(false);
  const [enterCount, setEnterCount] = useState<number>(1);

  useEffect(() => {
    if (isSearchPage) {
      if (bypassTimeout) {
        setBypassTimeout(false);
      } else {
        if (!isInitialRender) {
          const timeoutId = setTimeout(triggerSubmit, 500);
          return () => clearTimeout(timeoutId);
        } else {
          setIsInitialRender(false);
        }
      }
    }
    // eslint-disable-next-line
  }, [value, enterCount]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        setBypassTimeout(true);
        setEnterCount(enterCount + 1);
        triggerSubmit();
        break;
      default:
        break;
    }
  };

  return (
    <SearchInputFieldWrapper>
      <SearchIconWrapper focused={topBarOpen ? 1 : 0}>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        placeholder="Søk på sang"
        name="query"
        type="search"
        autoComplete="off"
        onFocus={openTopBar}
        open={topBarOpen ? 1 : 0}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </SearchInputFieldWrapper>
  );
};

const SearchInput = styled('input')<{ open: number }>`
  all: unset;
  display: block;
  padding: 1.4rem;
  padding-left: 4rem;
  width: 100%;

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
