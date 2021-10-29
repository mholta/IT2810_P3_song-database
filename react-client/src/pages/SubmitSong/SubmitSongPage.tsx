import React from 'react';
import { PageWrapper } from '../../components/elements/PageWrapper/PageWrapper';
import SubmitSongForm from './components/SubmitSongForm';

/**
 * A page for adding a new song.
 */
const SubmitSongPage = () => {
  return (
    <PageWrapper>
      <SubmitSongForm />
    </PageWrapper>
  );
};

export default SubmitSongPage;
