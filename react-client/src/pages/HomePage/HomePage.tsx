import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { RouteFolders } from '../MainRouter';

/**
 * Does nothing. Just redirection to /songs
 * Natural page to have in the future
 */
const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace(RouteFolders.SEARCH);
  });
  return <></>;
};

export default HomePage;
