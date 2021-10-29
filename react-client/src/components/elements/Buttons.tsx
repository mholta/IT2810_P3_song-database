import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const CategoryButton = styled(Button)<{
  nomargin?: string;
  selected: number;
}>`
  padding: 0.2em 0.7em;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 2em;
  margin-right: ${({ nomargin }) => (nomargin ? 0 : '1em')};

  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.palette.primary.main : theme.palette.text.secondary};

  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.dark : 'transparent'};
`;
