import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';
import { useQueryParams } from '../../hooks/useQueryParams';

type ButtonType = 'reset' | 'search';
interface ResetButtonProps {
  type: ButtonType;
}

const ResetButton = ({ type }: ResetButtonProps) => {
  const queryParams = useQueryParams();

  return (
    <>
      {type === 'reset' && (
        <Button variant="outlined" onClick={() => queryParams.reset()}>
          Nullstill
        </Button>
      )}
      {type === 'search' && (
        <Button variant="outlined" type="submit">
          Søk
        </Button>
      )}
    </>
  );
};

const Button = styled(MuiButton)`
  margin-left: 1rem;
  width: auto;
  min-width: 0;
`;

export default ResetButton;
