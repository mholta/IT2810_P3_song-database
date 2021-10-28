import React from 'react';
import { styled } from '@mui/system';
import { LinkWithIconGridRouter } from '../../elements/LinkWithIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouteFolders, Routes } from '../../../pages/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setMenuOpen } from '../../../store/layout/layout.actions';

const SideBar = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector(
    (rootState: RootState) => rootState.layout.menuOpen
  );

  const closeMenu = () => dispatch(setMenuOpen(false));

  return (
    <MainWrapper>
      <SideBarOuterWrapper open={menuOpen}>
        <SideBarInnerWrapper>
          <LinkWithIconGridRouter to={RouteFolders.BASE}>
            <FontAwesomeIcon icon={['fas', 'home']} /> <span>Hjem</span>
          </LinkWithIconGridRouter>

          <LinkWithIconGridRouter to={RouteFolders.SEARCH}>
            <FontAwesomeIcon icon={['fas', 'music']} /> <span>Sanger</span>
          </LinkWithIconGridRouter>

          <LinkWithIconGridRouter to={Routes.SUBMIT_SONG}>
            <FontAwesomeIcon icon={['fas', 'music']} />{' '}
            <span>Send inn sang</span>
          </LinkWithIconGridRouter>
        </SideBarInnerWrapper>
      </SideBarOuterWrapper>
      {menuOpen && <Backdrop onClick={closeMenu} />}
    </MainWrapper>
  );
};

const MainWrapper = styled('div')`
  position: relative;
  z-index: 100;
`;

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  height: var(--100vh);
  width: 100%;
  z-index: -1;
`;

const SideBarInnerWrapper = styled('div')`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.default};
  flex-grow: 1;
  border-right: 1px solid ${({ theme }) => theme.palette.border.main};
  font-size: 1.2rem;

  & > * {
    margin: 2rem 0;
  }
`;

const SideBarOuterWrapper = styled('nav')<{ open: boolean }>`
  --sidebar-width: 14rem;

  position: sticky;
  top: 0;

  display: flex;
  flex-shrink: 0;
  overflow: auto;

  height: 100%;
  max-height: 100%;
  width: var(--sidebar-width);

  transition: transform 200ms ease;
  word-break: break-all;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    transform: translateX(0);
    margin-left: calc(-1 * var(--sidebar-width));
    z-index: 100;

    ${(props) =>
      props.open
        ? `
      transform: translateX(var(--sidebar-width));
    `
        : ''}
  }
`;

export default SideBar;
