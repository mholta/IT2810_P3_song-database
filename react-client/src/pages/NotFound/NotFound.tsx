import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Routes } from '../MainRouter';

const NotFound = () => {
  const location = useLocation();
  const history = useHistory();

  if (location.pathname !== Routes.NOT_FOUND) history.replace(Routes.NOT_FOUND);

  return <div>404</div>;
};

export default NotFound;
