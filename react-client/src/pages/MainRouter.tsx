import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NotFound from './NotFound/NotFound';
import SongPage from './SongPage/SongPage';

export enum Routes {
  HOME = '/',
  SONG = '/song/:id',
  NOT_FOUND = '/404',
}

const MainRouter = () => {
  // location holds state of what route is active
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route exact path={Routes.HOME} component={HomePage} key={location.key} />
      <Route path={Routes.SONG} component={SongPage} key={location.key} />
      <Route component={NotFound} key={location.key} />
    </Switch>
  );
};

export default MainRouter;
