import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import SearchInputField from './SearchInputField';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useHistory, useLocation } from 'react-router';
import { RouteFolders, Routes } from '../../../pages/MainRouter';
import { getQueryStringFromFormSubmitEvent } from '../../../utils/search';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';
import SearchOptions from '../../SearchFilter/SearchFilter';
import { outline } from '../../../styles/classes';

const TopBar = () => {
  // Store
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );
  const dispatch = useDispatch();

  const closeTopBar = () => topBarOpen && dispatch(setTopBarOpen(false));

  const history = useHistory();

  const location = useLocation();
  const [openOptionsOnClick, setOpenOptionsOnClick] = useState<boolean>(true);

  // Prevent openining options menu on search page
  useEffect(() => {
    const isSearchPage = location.pathname.startsWith(Routes.SEARCH_RESULTS);
    setOpenOptionsOnClick(!isSearchPage);
  }, [location.pathname]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get query string
    const formData = new FormData(e.target as HTMLFormElement);
    const queryString: string = getQueryStringFromFormSubmitEvent(formData);
    console.log(formData, queryString);

    history.push(RouteFolders.SEARCH + '?' + queryString);

    closeTopBar();
  };

  console.log('TopBar rendered', topBarOpen);

  return (
    <MainWrapper style={outline}>
      <BarFlexWrapper>
        <FormTopLayer
          action="/search"
          onSubmit={handleSubmit}
          onChange={() => console.log('Changed')}
        >
          <TopBarInnerWrapper>
            <SearchInputField />
          </TopBarInnerWrapper>

          <AnimatePresence>
            {openOptionsOnClick && topBarOpen && (
              <ExpandedContentWrapper
                variants={expandedContentVariants}
                initial="hide"
                animate="show"
                exit="hide"
                transition={{ duration: 0.1 }}
              >
                <SearchOptions inForm />
              </ExpandedContentWrapper>
            )}
          </AnimatePresence>
        </FormTopLayer>
      </BarFlexWrapper>
      {openOptionsOnClick && topBarOpen && <Backdrop onClick={closeTopBar} />}
    </MainWrapper>
  );
};

const Backdrop = styled('div')`
  background-color: transparent;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

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

  padding: 4rem;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const TopBarInnerWrapper = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
`;

const MainWrapper = styled('div')`
  position: relative;
`;

export default TopBar;
