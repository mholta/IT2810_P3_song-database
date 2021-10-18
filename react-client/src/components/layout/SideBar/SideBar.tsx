import React from 'react';
import { styled } from '@mui/system';
import { LinkWithIconGridRouter } from '../../elements/LinkWithIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RouteFolders } from '../../../pages/MainRouter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const SideBar = () => {
  const menuOpen = useSelector(
    (rootState: RootState) => rootState.layout.menuOpen
  );

  return (
    <SideBarOuterWrapper open={menuOpen}>
      <SideBarInnerWrapper>
        <LinkWithIconGridRouter to={RouteFolders.BASE}>
          <FontAwesomeIcon icon={['fas', 'home']} /> <span>Hjem</span>
        </LinkWithIconGridRouter>
        <LinkWithIconGridRouter
          to={RouteFolders.SEARCH + '?query=søker på dette'}
        >
          <FontAwesomeIcon icon={['fas', 'music']} /> <span>Sanger</span>
        </LinkWithIconGridRouter>
        <LinkWithIconGridRouter
          to={RouteFolders.SEARCH + '?query=søker på dette'}
        >
          <FontAwesomeIcon icon={['fas', 'music']} /> <span>Søk på noe</span>
        </LinkWithIconGridRouter>
        <LinkWithIconGridRouter to={RouteFolders.SONG + '/testsang'}>
          <FontAwesomeIcon icon={['fas', 'music']} /> <span>Se test-sang</span>
        </LinkWithIconGridRouter>
      </SideBarInnerWrapper>
    </SideBarOuterWrapper>
  );
};

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

  height: 100%;
  max-height: 100%;
  width: var(--sidebar-width);
  flex-shrink: 0;

  overflow: auto;

  word-break: break-all;

  display: flex;

  ${(props) => props.theme.breakpoints.down('md')} {
    position: absolute;
    top: 0;
    left: calc(-1 * var(--sidebar-width));
    z-index: 100;

    transition: transform 200ms ease;

    ${(props) =>
      props.open
        ? `
        transform: translateX(100%);
    `
        : ''}
  }
`;

export default SideBar;
