import React from 'react';
import {
  FormControl as MuiFormControl,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/system';
import { QueryParam, useQueryParams } from '../../hooks/useQueryParams';
import { SortOptions } from '../../hooks/useSearchParams';

export enum SortType {
  RELEASE_DATE = 'releaseDate',
  TITLE = 'title',
  ARTISTS = 'artists',
  RELEVANCE = 'relevance',
}

interface SortOption extends SortOptions {
  displayName: string;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

const SearchSort = () => {
  const queryParams = useQueryParams();

  const hasSearchString = queryParams.has(QueryParam.QUERY);

  const selectedSortType: SortType = queryParams.has(QueryParam.SORT)
    ? (queryParams.get(QueryParam.SORT) as SortType)
    : hasSearchString
    ? SortType.RELEVANCE
    : SortType.RELEASE_DATE;

  const selectedSortOrder: SortOrder = queryParams.has(QueryParam.ORDER)
    ? (queryParams.get(QueryParam.ORDER) as SortOrder)
    : SortOrder.DESC;

  const selectedSortObjectString = sortOptionObjectToString(
    getSortOptionFromTypeAndOrder(selectedSortType, selectedSortOrder)
  );

  const handleChange = (event: SelectChangeEvent) => {
    const { sortType, sortOrder } = typeAndOrderFromSortOptionString(
      event.target.value
    );

    if (sortType === SortType.RELEVANCE) {
      queryParams.delete(QueryParam.SORT);
      queryParams.delete(QueryParam.ORDER);
      return;
    }

    queryParams.set(QueryParam.SORT, sortType);
    queryParams.set(QueryParam.ORDER, sortOrder);
  };

  const options: SortOption[] = hasSearchString
    ? [relevanceSortOption, ...sortOptions]
    : sortOptions;

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
          {options.map((e: SortOption, i: number) => (
            <MenuItem
              value={sortOptionObjectToString(e)}
              key={'sort-option-' + i + e.displayName}
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

    case SortType.ARTISTS:
      return sortOrder === SortOrder.ASC ? sortOptions[4] : sortOptions[5];

    case SortType.RELEVANCE:
      return relevanceSortOption;

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

const relevanceSortOption: SortOption = {
  displayName: 'relevanse',
  sortType: SortType.RELEVANCE,
  sortOrder: SortOrder.DESC,
};

const sortOptions: SortOption[] = [
  {
    displayName: 'nyeste',
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.DESC,
  },
  {
    displayName: 'eldste',
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: 'Tittel A-Å',
    sortType: SortType.TITLE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: 'Tittel Å-A',
    sortType: SortType.TITLE,
    sortOrder: SortOrder.DESC,
  },
  {
    displayName: 'Artist A-Å',
    sortType: SortType.ARTISTS,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: 'Artist Å-A',
    sortType: SortType.ARTISTS,
    sortOrder: SortOrder.DESC,
  },
];

export default SearchSort;
