import React from 'react';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Song } from '../../../api/types';
import { RouteFolders } from '../../../pages/MainRouter';
import Image from '../../elements/Image';
import { truncate, truncateParent } from '../../../styles/classes';

interface SongListItemProps {
  song: Song;
}

/**
 * A link button to a song page.
 */
const SongListItem = ({ song }: SongListItemProps) => {
  return (
    <ListItemWrapper>
      <LinkWrapper to={RouteFolders.SONG + '/' + song._id}>
        <CoverImageWrapper>
          <Image
            src={song.album.picture}
            alt={`Bilde av albumet til sangen ${song.title} `}
          />
        </CoverImageWrapper>
        <div style={truncateParent}>
          <SongTitle style={truncate}>{song.title}</SongTitle>
          <div style={truncate}>
            {song.artists.map((a) => a.name).join(', ')}
          </div>
        </div>
      </LinkWrapper>
    </ListItemWrapper>
  );
};

const SongTitle = styled('h4')`
  font-size: inherit;
  margin: 0;
`;

const CoverImageWrapper = styled('div')`
  width: 4rem;
`;

const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;

  padding: 0.5rem;

  border-radius: 0.3rem;

  transition: background-color 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.palette.background.paper};
  }
`;

const ListItemWrapper = styled('li')`
  list-style: none;
`;

export default SongListItem;
