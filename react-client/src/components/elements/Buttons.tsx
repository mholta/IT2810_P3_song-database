import { ButtonBase } from '@mui/material';
import { styled } from '@mui/system';

export const CategoryButton = styled(ButtonBase)<{
  nomargin?: string;
  selected: number;
}>`
  padding: 0.2em 0.7em;
  font-size: 0.9rem;
  border-radius: 2em;
  margin-right: ${({ nomargin }) => (nomargin ? 0 : '1em')};

  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.palette.primary.main : theme.palette.text.secondary};

  background-color: ${({ theme, selected }) =>
    selected ? theme.palette.primary.dark : 'transparent'};
`;
