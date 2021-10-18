import React, { useState } from 'react';
import { IconButton, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';
import { styled } from '@mui/system';
import FilterTabPanel from './SearchOptions.FilterTab';
import FilterCategoryList from './SearchOptions.FilterCategoryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QueryParam } from '../../hooks/useQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleChange = (event: React.SyntheticEvent, newActiveTab: number) => {
    setActiveTab(newActiveTab);
  };

  const handleClick = (newActiveTab: number) => {
    if (activeTab === newActiveTab) setActiveTab(0);
  };

  const tabProps = (index: number) => ({
    id: `filter-tab-${index}`,
    'aria-controls': `filter-tabpanel-${index}`,
    disableRipple: true,
    onClick: () => {
      handleClick(index);
    },
  });

  const themes = useSelector(
    (rootState: RootState) => rootState.filter.allCategories
  );

  return (
    <CategoryTabsWrapper>
      <OpenCloseButtonWrapper onClick={() => setActiveTab(activeTab ? 0 : 1)}>
        {activeTab ? (
          <FontAwesomeIcon icon={['fas', 'chevron-up']} />
        ) : (
          <FontAwesomeIcon icon={['fas', 'sliders-h']} />
        )}
      </OpenCloseButtonWrapper>
      <Tabs
        value={activeTab}
        showindicator={activeTab}
        onChange={handleChange}
        aria-label="filter tabs"
      >
        {/* Empty tab when activeTab === 0 */}
        <Tab label="" {...tabProps(0)} style={{ marginLeft: '1rem' }} />
        <Tab label="Tema" {...tabProps(1)} />
      </Tabs>

      <FilterTabPanel activeTab={activeTab} index={1}>
        <FilterCategoryList queryParam={QueryParam.THEME} categories={themes} />
      </FilterTabPanel>
    </CategoryTabsWrapper>
  );
};

const CategoryTabsWrapper = styled('div')`
  position: relative;
`;

const OpenCloseButtonWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1rem;
  z-index: 100;

  color: ${({ theme }) => theme.palette.text.secondary};

  cursor: pointer;
`;

const Tab = styled(MuiTab)`
  margin: 0;
  margin-right: 1rem;
  padding: 0;
  padding-bottom: 0.6rem;
  min-width: 0;
  min-height: 0;

  &.Mui-selected {
    color: inherit;
    margin: inherit;
    margin-right: 1rem;
    padding: inherit;
    padding-bottom: 0.6rem;
  }
`;

const Tabs = styled(MuiTabs)<{ showindicator: number }>`
  min-height: 0;
  & .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.palette.text.primary};
    opacity: ${({ showindicator }) => (showindicator ? 1 : 0)};
  }
`;

export default CategoryTabs;
