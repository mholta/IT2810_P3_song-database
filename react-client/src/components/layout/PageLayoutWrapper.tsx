import { styled } from '@mui/system';
import React from 'react';
import Div100vh from 'react-div-100vh';
import { SectionsWrapper } from '../elements/Section';
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';
import { useStaticContent } from '../../hooks/useStaticContent';

interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

const PageLayoutWrapper = ({ children }: PageLayoutWrapperProps) => {
  // Hook for fetching categories and adding to redux. Only on initial page load
  useStaticContent();

  return (
    <FullPageWrapper>
      <SideBar />
      <MainContentWrapper>
        <TopBar />
        <ChildrenWrapper>
          <ChildrenInnerWrapper>{children}</ChildrenInnerWrapper>
        </ChildrenWrapper>
      </MainContentWrapper>
    </FullPageWrapper>
  );
};

const MainContentWrapper = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr;

  height: 100%;
  max-height: 100%;
  flex-grow: 1;
`;

const ChildrenInnerWrapper = styled(SectionsWrapper)``;

const ChildrenWrapper = styled('main')`
  overflow: auto;
  max-height: 100%;
`;

const FullPageWrapper = styled(Div100vh)`
  height: 100%;
  width: 100%;
  display: flex;

  overflow: hidden;
  position: relative;
`;

export default PageLayoutWrapper;
