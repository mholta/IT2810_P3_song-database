import React, { useState } from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { FilterCategory } from '../../api/types';
import { RootState } from '../../store';

import { CategoryButton } from '../elements/Buttons';
import { QueryParam, useQuery } from '../../hooks/useQuery';

const FilterCategoryList = () => {
  const dispatch = useDispatch();
  const [query, pushQuery] = useQuery();

  const allCategories: FilterCategory[] = useSelector(
    (rootState: RootState) => rootState.filter.allCategories
  );

  const [selectedCategories, setSelectedCategories] = useState<
    FilterCategory[]
  >([]);

  const categoriesInOrder = [
    ...selectedCategories,
    ...allCategories.filter((c) => !selectedCategories.includes(c)),
  ];

  const addSelectedCategory = (filterCategory: FilterCategory) => {
    setSelectedCategories([...selectedCategories, filterCategory]);

    // Set query param
    query.set(QueryParam.THEME, filterCategory.title);
    pushQuery();
  };

  const removeSelectedCategory = (filterCategory: FilterCategory) => {
    setSelectedCategories(
      selectedCategories.filter((c) => c !== filterCategory)
    );
  };

  return (
    <FilterCategoryListWrapper>
      {categoriesInOrder.map((category, index) => {
        const isSelected = selectedCategories.includes(category);

        return (
          <FilterCategoryListItem key={'filter-item-' + category.id + index}>
            <CategoryButton
              selected={isSelected ? 1 : 0}
              onClick={() => {
                isSelected
                  ? removeSelectedCategory(category)
                  : addSelectedCategory(category);
              }}
            >
              {category.title}
            </CategoryButton>
          </FilterCategoryListItem>
        );
      })}
    </FilterCategoryListWrapper>
  );
};

const FilterCategoryListItem = styled('li')``;

const FilterCategoryListWrapper = styled('ul')`
  list-style: none;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
`;

export default FilterCategoryList;
