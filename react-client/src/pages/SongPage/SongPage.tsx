import React from 'react';
import { useParams } from 'react-router';
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper';

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  return <PageLayoutWrapper>Sang id: {id}</PageLayoutWrapper>;
};

export default SongPage;
