import React from 'react';
import { useHistory, useLocation } from 'react-router';
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper';
import { Routes } from '../MainRouter';

const NotFoundPage = () => {
  const location = useLocation();
  const history = useHistory();

  if (location.pathname !== Routes.NOT_FOUND) history.replace(Routes.NOT_FOUND);

  return <PageLayoutWrapper>404</PageLayoutWrapper>;
};

export default NotFoundPage;
