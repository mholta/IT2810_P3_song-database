import React from 'react';
import { useParams } from 'react-router';
import { dummySong } from '../../api/dummyContent';
import { QueryParam, useQuery } from '../../hooks/useQuery';

const ContributorPage = () => {
  const query = useQuery();

  return <>Contributor: {query.get(QueryParam.CONTRIBUTOR)}</>;
};

export default ContributorPage;
