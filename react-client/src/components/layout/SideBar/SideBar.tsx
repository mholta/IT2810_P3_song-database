import React from 'react';
import { styled } from '@mui/system';

const SideBar = () => {
  return (
    <SideBarOuterWrapper open={false}>
      <SideBarInnerWrapper>
        <div>Link</div>
        <div>Link</div>
        <div>Link</div>
        <div>Link</div>
        <div>Link</div>
      </SideBarInnerWrapper>
    </SideBarOuterWrapper>
  );
};

const SideBarInnerWrapper = styled('div')`
  padding: 1rem;
  background-color: aliceblue;
  flex-grow: 1;
`;

const SideBarOuterWrapper = styled('nav')<{ open: boolean }>`
  --sidebar-width: 8rem;

  height: 100%;
  max-height: 100%;
  width: var(--sidebar-width);
  flex-shrink: 0;

  overflow: auto;

  word-break: break-all;

  display: flex;

  ${(props) => props.theme.breakpoints.down('sm')} {
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
