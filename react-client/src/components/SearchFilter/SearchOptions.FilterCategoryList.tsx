import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { FilterCategory } from '../../api/types';
import { RootState } from '../../store';

import { CategoryButton } from '../elements/Buttons';
import { QueryParam, useQuery } from '../../hooks/useQuery';

interface FilterCategoryListProps {
  queryParam: QueryParam;
  categories: FilterCategory[];
}

const FilterCategoryList = ({
  queryParam,
  categories: allCategories,
}: FilterCategoryListProps) => {
  const query = useQuery();

  const [selectedCategories, setSelectedCategories] = useState<
    FilterCategory[]
  >([]);

  useEffect(() => {
    const categoryStringsFromQuery = query.getAll(queryParam);
    const categoryObjects = allCategories.filter((theme) =>
      categoryStringsFromQuery.includes(theme.title)
    );

    setSelectedCategories(categoryObjects);
  }, []);

  const categoriesInOrder = [
    ...selectedCategories,
    ...allCategories.filter((c) => !selectedCategories.includes(c)),
  ];

  const addSelectedCategory = (filterCategory: FilterCategory) => {
    query.set(queryParam, filterCategory.title, true);
  };

  const removeSelectedCategory = (filterCategory: FilterCategory) => {
    query.deleteParamWithValue(queryParam, filterCategory.title);
  };

  return (
    <FilterCategoryListWrapper>
      {categoriesInOrder.map((category, index) => {
        const isSelected = query.hasValue(queryParam, category.title);

        return (
          <FilterCategoryListItem
            key={'filter-item-' + queryParam + category.id + index}
          >
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
