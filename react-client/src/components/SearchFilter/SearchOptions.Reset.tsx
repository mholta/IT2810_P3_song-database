import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '../../hooks/useQuery';

type ButtonType = 'reset' | 'search';
interface ResetButtonProps {
  type: ButtonType;
}

const ResetButton = ({ type }: ResetButtonProps) => {
  const query = useQuery();

  return (
    <>
      {type === 'reset' && (
        <Button variant="outlined" onClick={() => query.reset()}>
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
