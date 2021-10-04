import React from 'react';
import { useParams } from 'react-router';

const SongPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>Sang id: {id}</div>;
};

export default SongPage;
