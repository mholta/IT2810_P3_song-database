import React from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setMenuOpen } from '../../../store/layout/layout.actions';

interface HamburgerProps {}

const Hamburger = ({}: HamburgerProps) => {
  const dispatch = useDispatch();
  const menuOpen = useSelector(
    (rootState: RootState) => rootState.layout.menuOpen
  );
  return (
    <HamburgerWrapper
      open={menuOpen}
      onClick={() => dispatch(setMenuOpen(!menuOpen))}
    >
      <span />
      <span />
      <span />
      <span />
    </HamburgerWrapper>
  );
};

const HamburgerWrapper = styled('div')<{ open: boolean }>`
  font-size: 2rem;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 1.8rem;
  }

  position: ${({ open }) => (open ? 'fixed' : 'fixed')};
  z-index: 150;

  top: 2rem;
  right: 2rem;
  width: 1.4em;
  height: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 200ms ease;

  & > span {
    height: 2px;
    width: 100%;
    background-color: #fff;
    transition: transform 200ms ease, opacity 200ms ease;
  }
  & > span:nth-child(2) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ${(props) =>
    props.open &&
    `
  & > span:nth-child(3) {
    transform: rotateZ(-45deg);
  }
  & > span:nth-child(2) {
    transform: rotateZ(45deg);
  }
  & > span:nth-child(1) {
    opacity: 0;
    transform: translateY(1000%) scaleX(0.2);
  }
  & > span:nth-child(4) {
    opacity: 0;
    transform: translateY(-1000%) scaleX(0.2);
  }
  `}

  // Hide on large screens
  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: none;
  }
`;

export default Hamburger;
