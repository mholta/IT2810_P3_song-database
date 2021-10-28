import React, { createRef, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import SearchInputField from './SearchInputField';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useLocation } from 'react-router';
import { Routes } from '../../../pages/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';
import FilterCategoryList from '../../SearchFilter/SearchOptions.FilterCategoryList';
import { QueryParam } from '../../../hooks/useQueryParams';
import Hamburger from './Hamburger';
import { useClickOutside } from '../../../hooks/useClickOutside';

const TopBar = () => {
  // Store
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );

  const dispatch = useDispatch();

  const ref = createRef<HTMLDivElement>();

  const closeTopBar = () => topBarOpen && dispatch(setTopBarOpen(false));

  // Close top bar on click outside
  useClickOutside(ref, closeTopBar);

  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);

  const themes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );

  // Prevent openining options menu on search page
  useEffect(() => {
    const isSearchPage = location.pathname.startsWith(Routes.SEARCH_RESULTS);
    setIsSearchPage(isSearchPage);
    closeTopBar();
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  console.log('TopBar rendered', topBarOpen);

  return (
    <MainWrapper ref={ref}>
      <BarFlexWrapper>
        <FormTopLayer action="/search" onSubmit={handleSubmit}>
          <TopBarInnerWrapper>
            <SearchInputField />
            <Hamburger />
          </TopBarInnerWrapper>

          <AnimatePresence>
            {!isSearchPage && topBarOpen && (
              <ExpandedContentWrapper
                variants={expandedContentVariants}
                initial="hide"
                animate="show"
                exit="hide"
                transition={{ duration: 0.1 }}
              >
                <FilterCategoryList
                  queryParam={QueryParam.THEME}
                  categories={themes}
                  horizontalScroll
                />
              </ExpandedContentWrapper>
            )}
          </AnimatePresence>
        </FormTopLayer>
      </BarFlexWrapper>
    </MainWrapper>
  );
};

const expandedContentVariants: Variants = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};

const BarFlexWrapper = styled('div')``;

const FormTopLayer = styled('form')`
  position: relative;
  z-index: 10;
`;

const ExpandedContentWrapper = styled(motion.div)`
  position: absolute;

  height: fit-content;
  width: 100%;

  padding: 1rem 0;
  & > * {
    margin: 0;
  }
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const TopBarInnerWrapper = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
`;

const MainWrapper = styled('div')`
  position: sticky;
  top: 0;
`;

export default TopBar;
