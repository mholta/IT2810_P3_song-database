import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery, DocumentNode } from '@apollo/client';

type SearchKey = 'name' | 'title';

type Artist = {
  [searchKey in SearchKey]: string;
} & {
  _id: string;
};

interface DropdownSearchProps {
  setValueCallback: (value: string) => void;
  query: DocumentNode;
  variables: { [key: string]: any };
  searchKey: SearchKey;
  label: string;
  dataKey: string;
  id: string;
  required: boolean;
}

const DropdownSearch = ({
  setValueCallback,
  query,
  variables,
  searchKey,
  label,
  dataKey,
  id,
  required,
}: DropdownSearchProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Artist[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const { loading, error, refetch } = useQuery(query, {
    variables: variables,
  });

  useEffect(() => {
    let active = true;

    if (!open) return;

    (async () => {
      await refetch({ [searchKey]: inputValue }).then(({ data }) => {
        setOptions(data[dataKey]);
      });
    })();

    return () => {
      active = false;
    };
  }, [loading, inputValue, open]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option[searchKey]}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      filterOptions={(x) => x}
      options={options}
      loading={loading}
      onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
      onChange={(e, newValue) => setValueCallback(newValue?._id ?? '')}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default DropdownSearch;
