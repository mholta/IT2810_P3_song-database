import React, { useState } from 'react';
import {
  FormControl as MuiFormControl,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/system';
import { QueryParam, useQuery } from '../../hooks/useQuery';

interface SearchSortProps {}

const SearchSort = ({}: SearchSortProps) => {
  const query = useQuery();

  const selectedSortType = query.has(QueryParam.SORT)
    ? (query.get(QueryParam.SORT) as SortType)
    : SortType.RELEASE_DATE;

  const selectedSortOrder = query.has(QueryParam.ORDER)
    ? (query.get(QueryParam.ORDER) as SortOrder)
    : SortOrder.DESC;

  const selectedSortObjectString = sortOptionObjectToString(
    getSortOptionFromTypeAndOrder(selectedSortType, selectedSortOrder)
  );

  const handleChange = (event: SelectChangeEvent) => {
    const { sortType, sortOrder } = typeAndOrderFromSortOptionString(
      event.target.value
    );
    query.set(QueryParam.SORT, sortType);
    query.set(QueryParam.ORDER, sortOrder);
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

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

enum SortType {
  RELEASE_DATE = 'release_date',
  TITLE = 'title',
}

export interface SortOption {
  displayName: string;
  graphqlName: string;
  sortType: SortType;
  sortOrder: SortOrder;
}

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
