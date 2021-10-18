import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FilterCategory } from '../../api/types';
import { CategoryButton } from '../elements/Buttons';
import { QueryParam, useQueryParams } from '../../hooks/useQueryParams';
import '../../styles/hideScrollbars.css';

interface FilterCategoryListProps {
  queryParam: QueryParam;
  categories: FilterCategory[];
  horizontalScroll?: boolean;
}

const FilterCategoryList = ({
  queryParam,
  categories: allCategories,
  horizontalScroll = false,
}: FilterCategoryListProps) => {
  const queryParams = useQueryParams();

  const [selectedCategories, setSelectedCategories] = useState<
    FilterCategory[]
  >([]);

  useEffect(() => {
    const categoryStringsFromQuery = queryParams.getAll(queryParam);
    const categoryObjects = allCategories.filter((theme) =>
      categoryStringsFromQuery.includes(theme._id)
    );

    setSelectedCategories(categoryObjects);
    // eslint-disable-next-line
  }, [allCategories, queryParam]);

  const categoriesInOrder = [
    ...selectedCategories,
    ...allCategories.filter((c) => !selectedCategories.includes(c)),
  ];

  const addSelectedCategory = (filterCategory: FilterCategory) => {
    queryParams.set(queryParam, filterCategory._id, true);
  };

  const removeSelectedCategory = (filterCategory: FilterCategory) => {
    queryParams.deleteParamWithValue(queryParam, filterCategory._id);
  };

  return (
    <FilterCategoryListWrapper
      horizontalScroll={horizontalScroll}
      className={horizontalScroll ? 'hide-scrollbars' : ''}
    >
      {categoriesInOrder.map((category, index) => {
        const isSelected = queryParams.hasValue(queryParam, category._id);

        return (
          <FilterCategoryListItem
            key={'filter-item-' + queryParam + category._id + index}
          >
            <CategoryButton
              selected={isSelected ? 1 : 0}
              onClick={() => {
                isSelected
                  ? removeSelectedCategory(category)
                  : addSelectedCategory(category);
              }}
              nomargin="true"
            >
              {category.title}
            </CategoryButton>
          </FilterCategoryListItem>
        );
      })}
      {horizontalScroll && <li style={{ listStyle: 'none', width: 1 }}></li>}
    </FilterCategoryListWrapper>
  );
};

const FilterCategoryListItem = styled('li')`
  flex-shrink: 0;
`;

const FilterCategoryListWrapper = styled('ul')<{ horizontalScroll: boolean }>`
  list-style: none;
  padding: 0;
  --horiz-margin: 0.3rem;

  margin: 0 calc(-1 * var(--horiz-margin));

  & > li {
    margin: var(--horiz-margin);
  }

  display: flex;
  ${({ horizontalScroll }) =>
    horizontalScroll
      ? `
      flex-wrap: no-wrap;
      overflow: auto;
      padding: 0 4rem;
    `
      : `
      flex-wrap: wrap;
      `}
`;

export default FilterCategoryList;
