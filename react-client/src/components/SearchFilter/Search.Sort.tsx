import React from 'react';
import {
  FormControl as MuiFormControl,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/system';
import { QueryParam, useQueryParams } from '../../hooks/useQueryParams';

enum SortType {
  RELEASE_DATE = 'release_date',
  TITLE = 'title',
}

interface SortOption {
  displayName: string;
  graphqlName: string;
  sortType: SortType;
  sortOrder: SortOrder;
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

const SearchSort = () => {
  const queryParams = useQueryParams();

  const selectedSortType = queryParams.has(QueryParam.SORT)
    ? (queryParams.get(QueryParam.SORT) as SortType)
    : SortType.RELEASE_DATE;

  const selectedSortOrder = queryParams.has(QueryParam.ORDER)
    ? (queryParams.get(QueryParam.ORDER) as SortOrder)
    : SortOrder.DESC;

  const selectedSortObjectString = sortOptionObjectToString(
    getSortOptionFromTypeAndOrder(selectedSortType, selectedSortOrder)
  );

  const handleChange = (event: SelectChangeEvent) => {
    const { sortType, sortOrder } = typeAndOrderFromSortOptionString(
      event.target.value
    );
    queryParams.set(QueryParam.SORT, sortType);
    queryParams.set(QueryParam.ORDER, sortOrder);
  };

  return (
    <FormControl fullWidth>
      <SelectWrapper>
        <MuiSelect
          labelId="sort-select-label"
          name="sort"
          id="sort-select"
          value={selectedSortObjectString}
          onChange={handleChange}
        >
          {sortOptions.map((e: SortOption) => (
            <MenuItem
              value={sortOptionObjectToString(e)}
              key={'sort-option-' + e.graphqlName}
            >
              Sorter på {e.displayName}
            </MenuItem>
          ))}
        </MuiSelect>
      </SelectWrapper>
    </FormControl>
  );
};

const FormControl = styled(MuiFormControl)``;

const SelectWrapper = styled('div')`
  & .MuiSelect-select {
    padding-top: var(--padding-v);
    padding-bottom: var(--padding-v);
    border: none;
  }
`;

export const getSortOptionFromTypeAndOrder = (
  sortType: SortType,
  sortOrder: SortOrder
): SortOption => {
  switch (sortType) {
    case SortType.RELEASE_DATE:
      return sortOrder === SortOrder.DESC ? sortOptions[0] : sortOptions[1];

    case SortType.TITLE:
      return sortOrder === SortOrder.ASC ? sortOptions[2] : sortOptions[3];

    default:
      return sortOptions[0];
  }
};

const sortOptionObjectToString = (sortOption: SortOption): string => {
  return sortOption.sortType + '--' + sortOption.sortOrder;
};

const typeAndOrderFromSortOptionString = (sortOptionString: string) => {
  const strings: string[] = sortOptionString.split('--');
  const sortType = strings[0] as SortType;
  const sortOrder = strings[1] as SortOrder;

  return { sortType, sortOrder };
};

const sortOptions: SortOption[] = [
  {
    displayName: 'nyeste',
    graphqlName: '2',
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.DESC,
  },
  {
    displayName: 'eldste',
    graphqlName: '3',
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: 'A-Å',
    graphqlName: '4',
    sortType: SortType.TITLE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: 'Å-A',
    graphqlName: '5',
    sortType: SortType.TITLE,
    sortOrder: SortOrder.DESC,
  },
];

export default SearchSort;
