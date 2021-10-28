import { styled } from '@mui/system';
import React, { useEffect } from 'react';
import Div100vh from 'react-div-100vh';
import { SectionsWrapper } from '../elements/Section';
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';
import { useStaticContent } from '../../hooks/useStaticContent';
import { outline } from '../../styles/classes';

interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

const PageLayoutWrapper = ({ children }: PageLayoutWrapperProps) => {
  // Hook for fetching categories and adding to redux. Only on initial page load
  useStaticContent();

  // Use effect for setting height values on resize
  useEffect(() => {
    const handleResize = () => {
      document.body.setAttribute('style', `--100vh: ${window.innerHeight}px;`);
    };

    window.addEventListener('resize', handleResize);

    // Trigger on initial load
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FullPageWrapper>
      <SideBar />
      <div>
        <TopBar />
        <main>
          <ChildrenInnerWrapper>{children}</ChildrenInnerWrapper>
        </main>
      </div>
    </FullPageWrapper>
  );
};

const ChildrenInnerWrapper = styled(SectionsWrapper)``;

const FullPageWrapper = styled('div')`
  height: var(--100vh);
  width: 100%;
  display: flex;

  overflow: auto;
  position: relative;
`;

export default PageLayoutWrapper;
