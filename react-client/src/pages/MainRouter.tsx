import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import ContributorPage from './ContributorPage/ContributorPage';
import HomePage from './HomePage/HomePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import SearchResultsPage from './SearchResultsPage/SearchResultsPage';
import SongPage from './SongPage/SongPage';

export enum Routes {
  HOME = '/',
  SONG = '/song/:id',
  SEARCH_RESULTS = '/search',
  NOT_FOUND = '/404',
  CONTRIBUTOR = '/contributor',
}

export enum RouteFolders {
  BASE = '/',
  SONG = '/song',
  ALBUM = '/album',
  ARTIST = '/artist',
  SEARCH = '/search',
  CONTRIBUTOR = '/contributor',
}

const MainRouter = () => {
  // location holds state of what route is active
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route exact path={Routes.HOME} component={HomePage} key={location.key} />
      <Route path={Routes.SONG} component={SongPage} key={location.key} />
      <Route
        path={Routes.SEARCH_RESULTS}
        component={SearchResultsPage}
        key={location.key}
      />
      <Route
        path={Routes.CONTRIBUTOR}
        component={ContributorPage}
        key={location.key}
      />
      <Route component={NotFoundPage} key={location.key} />
    </Switch>
  );
};

export default MainRouter;
