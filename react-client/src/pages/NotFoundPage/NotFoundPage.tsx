import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { Routes } from '../MainRouter';

const NotFoundPage = () => {
  const location = useLocation();
  const history = useHistory();

  if (location.pathname !== Routes.NOT_FOUND) history.replace(Routes.NOT_FOUND);

  return <>404</>;
};

export default NotFoundPage;
