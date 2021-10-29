import React from 'react';

interface FilterTabProps {
  activeTab: number;
  index: number;
  children: React.ReactChild;
}

/**
 * Panel containing filters.
 */
const FilterTabPanel = ({ activeTab, index, children }: FilterTabProps) => {
  return (
    <div
      role="tabpanel"
      hidden={activeTab !== index}
      id={`filter-tabpanel-${index}`}
      aria-labelledby={`filter-tab-${index}`}
    >
      {activeTab === index && children}
    </div>
  );
};

export default FilterTabPanel;
