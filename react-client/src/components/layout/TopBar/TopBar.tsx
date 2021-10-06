import React, { useRef } from 'react';
import { styled } from '@mui/system';
import SearchInputField from './SearchInputField';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useClickOutside } from '../../../hooks/useClickOutside';
import SearchOptions from './SearchOptions';
import { useHistory } from 'react-router';
import { RouteFolders } from '../../../pages/MainRouter';
import { getQueryStringFromFormSubmitEvent } from '../../../utils/search';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';

const TopBar = () => {
  // Store
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );
  const dispatch = useDispatch();

  const closeTopBar = () => topBarOpen && dispatch(setTopBarOpen(false));

  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, closeTopBar);

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get query string
    const formData = new FormData(e.target as HTMLFormElement);
    const queryString: string = getQueryStringFromFormSubmitEvent(formData);
    console.log(queryString);

    history.push(RouteFolders.SEARCH + '?' + queryString);
    closeTopBar();
  };

  return (
    <MainWrapper ref={wrapperRef}>
      <BarFlexWrapper>
        <FormTopLayer action="/search" onSubmit={handleSubmit}>
          <TopBarInnerWrapper>
            <SearchInputField />
          </TopBarInnerWrapper>

          <AnimatePresence>
            {topBarOpen && (
              <ExpandedContentWrapper
                variants={expandedContentVariants}
                initial="hide"
                animate="show"
                exit="hide"
                transition={{ duration: 0.1 }}
              >
                <SearchOptions />
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
