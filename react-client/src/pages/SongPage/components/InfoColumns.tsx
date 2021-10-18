import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { Song } from '../../../api/types';
import { CategoryButton } from '../../../components/elements/Buttons';
import LinkWithIcon from '../../../components/elements/LinkWithIcon';
import { H2, Link } from '../../../components/elements/Typography';
import { RouteFolders } from '../../MainRouter';

interface InfoColumnProps {
  song: Song;
}

const InfoColumn = ({ song }: InfoColumnProps) => {
  const history = useHistory();

  return (
    <div>
      <InfoSection>
        <H2>Om sangen</H2>
        {song.categories && (
          <InfoListItem style={{ paddingTop: 0 }}>
            <h3>Kategorier:</h3>
            <div>
              {song.categories.map((category) => (
                <span>
                  <CategoryButton
                    selected={0}
                    onClick={() => {
                      history.push(
                        RouteFolders.SEARCH + '?theme=' + category._id
                      );
                    }}
                  >
                    {category.title}
                  </CategoryButton>
                </span>
              ))}
            </div>
          </InfoListItem>
        )}
        {song.writers && (
          <InfoListItem>
            <h3>Tekst og melodi:</h3>
            <div>
              {song.writers.map((writer, i, a) => (
                <span key={'writer-' + i}>
                  <Link to={RouteFolders.SEARCH + '?query=' + writer}>
                    {writer}
                  </Link>
                  {i === a.length - 1 ? '' : i === a.length - 2 ? ' & ' : ', '}
                </span>
              ))}
            </div>
          </InfoListItem>
        )}
        {song.producers && (
          <InfoListItem>
            <h3>Produsent{song.producers.length > 1 ? 'er' : ''}:</h3>
            <div>
              {song.producers.map((writer, i, a) => (
                <Link
                  to={RouteFolders.SEARCH + '?query=' + writer}
                  key={'writer-' + i}
                >
                  {writer}
                  {i === a.length - 1 ? '' : i === a.length - 2 ? ' & ' : ' , '}
                </Link>
              ))}
            </div>
          </InfoListItem>
        )}
        <InfoListItem>
          <h3>Toneart:</h3>
          <div>{song.key}</div>
        </InfoListItem>
        {song.tempo && (
          <InfoListItem>
            <h3>Tempo:</h3>
            <div>
              {song.tempo} BPM {song.time}
            </div>
          </InfoListItem>
        )}
        <InfoListItem>
          <h3>Utgitt:</h3>
          <div>{song.album.releaseDate.getFullYear()}</div>
        </InfoListItem>
      </InfoSection>

      <InfoSection>
        <H2>Om sangen</H2>
        {song.iTunes && (
          <LinkWithIcon
            href={song.iTunes}
            icon={<FontAwesomeIcon icon={['fab', 'apple']} />}
          >
            Apple Music
          </LinkWithIcon>
        )}
        {song.spotify && (
          <LinkWithIcon
            href={song.spotify}
            icon={<FontAwesomeIcon icon={['fab', 'spotify']} />}
          >
            Spotify
          </LinkWithIcon>
        )}
        {song.artists
          .filter((a) => a.webPage)
          .map((artist, i) => (
            <LinkWithIcon
              href={artist.webPage}
              key={'artist-' + i}
              icon={<FontAwesomeIcon icon={['fas', 'mouse-pointer']} />}
            >
              {artist.name}
            </LinkWithIcon>
          ))}
      </InfoSection>
    </div>
  );
};

const InfoSection = styled('section')`
  margin-bottom: 3rem;
`;

const InfoListItem = styled('div')`
  display: grid;
  grid-template-columns: 8rem 1fr;

  padding: 0.8rem 0;

  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[700]};

  & h3 {
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
  }
`;

export default InfoColumn;
