import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { Song } from '../../../api/types';
import { CategoryButton } from '../../../components/elements/Buttons';
import LinkWithIcon from '../../../components/elements/LinkWithIcon';
import { H2, Link } from '../../../components/elements/Typography';
import { QueryParam } from '../../../hooks/useQueryParams';
import { RouteFolders } from '../../MainRouter';

interface InfoColumnProps {
  song: Song;
}

const InfoColumn = ({ song }: InfoColumnProps) => {
  const history = useHistory();
  console.log(song.categories);
  return (
    <Wrapper>
      <InfoSection>
        <H2>Om sangen</H2>
        {song.categories && song.categories.length > 0 && (
          <InfoListItem style={{ paddingTop: 0 }}>
            <h3>Tema:</h3>
            <div>
              {song.categories.map((category, index) => (
                <span key={'category-' + index}>
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
        {song.writers && song.writers.length > 0 && (
          <InfoListItem>
            <h3>Tekst og melodi:</h3>
            <div>
              {song.writers.map((writer, i, a) => (
                <span key={'writer-' + i}>
                  <Link
                    to={
                      RouteFolders.SEARCH +
                      `?${QueryParam.CONTRIBUTOR}=` +
                      writer
                    }
                  >
                    {writer}
                  </Link>
                  {i === a.length - 1 ? '' : i === a.length - 2 ? ' & ' : ', '}
                </span>
              ))}
            </div>
          </InfoListItem>
        )}
        {song.producers && song.producers.length > 0 && (
          <InfoListItem>
            <h3>Produsent{song.producers.length > 1 ? 'er' : ''}:</h3>
            <div>
              {song.producers.map((writer, i, a) => (
                <span key={'writer-' + i}>
                  <Link
                    to={
                      RouteFolders.SEARCH +
                      `?${QueryParam.CONTRIBUTOR}=` +
                      writer
                    }
                  >
                    {writer}
                  </Link>
                  {i === a.length - 1 ? '' : i === a.length - 2 ? ' & ' : ' , '}
                </span>
              ))}
            </div>
          </InfoListItem>
        )}
        <InfoListItem>
          <h3>Toneart:</h3>
          <div>{song.key}</div>
        </InfoListItem>
        {song.tempo && song.time && (
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
        Andre sanger som:{' '}
        {song.artists.map((artist, i, a) => (
          /* If we want to link to pages */
          /* <Link to={RouteFolders.ARTIST + artist.id}>{artist.name}</Link> */

          <span key={'info-artist-' + i}>
            <Link
              to={
                RouteFolders.SEARCH +
                `?${QueryParam.CONTRIBUTOR}=` +
                artist.name
              }
            >
              {artist.name}
            </Link>
            {i === a.length - 1 ? ' ' : i === a.length - 2 ? ' eller ' : ' , '}
          </span>
        ))}
        bidrar på.
      </InfoSection>
    </Wrapper>
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

const Wrapper = styled('div')`
  padding-bottom: 2rem;
`;

export default InfoColumn;
