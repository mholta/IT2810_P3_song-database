import React from 'react';
import { styled } from '@mui/system';
import { Song } from '../../../api/types';
import Image from '../../../components/elements/Image';

interface HeaderProps {
  song: Song;
}

/**
 * Displays album cover, title and artist.
 */
const Header = ({ song }: HeaderProps) => {
  const albumString: string = [
    song.album.title,
    '(' + song.album.releaseDate.getFullYear() + ')',
  ].join(' ');

  return (
    <HeaderGrid>
      <ImageWrapper>
        <Image
          src={song.album.picture}
          aspectratio="1:1"
          borderradius={3}
          borderradiusunit="%"
          alt={`Bilde av albumet til sangen ${song.title} `}
        />
      </ImageWrapper>
      <div>
        <Title>{song.title}</Title>
        <SubtitleWrapper>
          {albumString}
          {' - '}
          {song.artists.map((artist, index) => (
            /* If we want to link to pages */
            /* <Link to={RouteFolders.ARTIST + artist.id}>{artist.name}</Link> */
            <span key={'header-artist-' + index}>{artist.name} </span>
          ))}
        </SubtitleWrapper>
      </div>
    </HeaderGrid>
  );
};

const SubtitleWrapper = styled('div')`
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 0.9rem;
  }
`;

const Title = styled('h1')`
  font-size: 4rem;
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 2rem;
  }
`;

const ImageWrapper = styled('div')`
  width: 20rem;
`;

const HeaderGrid = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4rem;
  align-items: center;

  margin-top: 2rem;
  margin-bottom: 2rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
    gap: 0;
    justify-content: center;
  }
`;

export default Header;
