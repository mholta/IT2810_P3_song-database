import React, { useState } from 'react';
import {
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SearchSortProps {}

const SearchSort = ({}: SearchSortProps) => {
  const selectedSortingMethod = sortOptions[0].graphqlName;

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    console.log('dispatch(setSortMethod(event.target.value));');
  };

  return (
    <FormControl fullWidth>
      <SelectWrapper>
        <MuiSelect
          labelId="sort-select-label"
          name="sort"
          id="sort-select"
          value={selectedSortingMethod ?? sortOptions[0].graphqlName}
          onChange={handleChange}
        >
          {sortOptions.map((e) => (
            <MenuItem
              value={e.graphqlName}
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

export interface SortOption {
  displayName: string;
  graphqlName: string;
  value: string;
}

export const sortOptions: SortOption[] = [
  { displayName: 'nylig lagt til', graphqlName: '1', value: 'nylige' },
  { displayName: 'nyeste', graphqlName: '2', value: 'nyeste' },
  { displayName: 'eldste', graphqlName: '3', value: 'eldste' },
  { displayName: 'A-Å', graphqlName: '4', value: 'title_asc' },
  { displayName: 'Å-A', graphqlName: '5', value: 'title_desc' },
];

export default SearchSort;
