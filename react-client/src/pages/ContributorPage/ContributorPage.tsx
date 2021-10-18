import React from 'react';
import { QueryParam, useQueryParams } from '../../hooks/useQueryParams';

const ContributorPage = () => {
  const queryParams = useQueryParams();

  return <>Contributor: {queryParams.get(QueryParam.CONTRIBUTOR)}</>;
};

export default ContributorPage;
