import React from 'react';
import { PageWrapper } from '../../components/elements/PageWrapper/PageWrapper';
import SubmitSongForm from './components/SubmitSongForm';

/**
 * A page for adding a new song.
 */
const SubmitSongPage = () => {
  return (
    <PageWrapper>
      <h1>Send inn ny sang</h1>
      <SubmitSongForm />
    </PageWrapper>
  );
};

export default SubmitSongPage;
