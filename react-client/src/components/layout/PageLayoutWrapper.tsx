import { styled } from '@mui/system';
import React from 'react';
import Div100vh from 'react-div-100vh';
import SearchBar from './SearchBar/SearchBar';
import SideBar from './SideBar/SideBar';

interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

const PageLayoutWrapper = ({ children }: PageLayoutWrapperProps) => {
  return (
    <FullPageWrapper>
      <SideBar />
      <MainContentWrapper>
        <SearchBar />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </MainContentWrapper>
    </FullPageWrapper>
  );
};

const MainContentWrapper = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  outline: 1px solid green;
  outline-offset: -5px;
  height: 100%;
  max-height: 100%;
  flex-grow: 1;
`;

const ChildrenWrapper = styled('main')`
  overflow: auto;
  max-height: 100%;
`;

const FullPageWrapper = styled(Div100vh)`
  height: 100%;
  width: 100%;
  display: flex;
  outline: 1px solid red;
  outline-offset: -1px;
  overflow: hidden;
  position: relative;
`;

export default PageLayoutWrapper;
