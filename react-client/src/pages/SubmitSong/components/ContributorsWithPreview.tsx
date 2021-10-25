import { Stack, TextField, Chip, styled } from '@mui/material';
import React from 'react';

interface ContributorsWithPreviewProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueString: string;
  valueList: string[];
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
}

const ContributorsWithPreview = ({
  onChange,
  id,
  label,
  valueString,
  valueList,
  helperText,
  placeholder,
}: ContributorsWithPreviewProps) => {
  return (
    <TwoColumnGrid>
      <TextField
        label={label}
        id={id}
        placeholder={placeholder}
        multiline
        onChange={onChange}
        value={valueString}
        helperText={helperText}
      />
      <Stack
        direction="row"
        spacing={1}
        style={{ flexWrap: 'wrap', justifyContent: 'start' }}
      >
        {valueList.map(
          (string, i) =>
            string.trim() && (
              <Stack direction="row" spacing={1} key={'producer-' + i}>
                <Chip label={string} variant="outlined" />
              </Stack>
            )
        )}
      </Stack>
    </TwoColumnGrid>
  );
};

const TwoColumnGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

export default ContributorsWithPreview;
