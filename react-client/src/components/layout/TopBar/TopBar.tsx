import React, { useRef, useState } from 'react';
import { styled } from '@mui/system';
import SearchInputField from './SearchInputField';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useClickOutside } from '../../../hooks/useClickOutside';
import SearchOptions from './SearchOptions';

const TopBar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  useClickOutside(wrapperRef, closeMenu);

  return (
    <MainWrapper ref={wrapperRef}>
      <BarFlexWrapper>
        <FormTopLayer action="/search" method="GET">
          <TopBarInnerWrapper>
            <SearchInputField focused={open} setFocused={setOpen} />
          </TopBarInnerWrapper>

          <AnimatePresence>
            {open && (
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
      {open && <Backdrop onClick={openMenu} />}
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

const Backdrop = styled('div')`
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

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
