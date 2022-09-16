// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import { CreateTranscriptionJobPage } from './subpages/create-transcription-job';
import { TranscriptionJobListPage } from './subpages/transcription-job-list';
import { TranscriptionJobDetailsPage } from './subpages/transcription-job-details';

const pages = {
  'create-transcription-job': CreateTranscriptionJobPage,
  'transcription-job-list': TranscriptionJobListPage,
  'transcription-job-details': TranscriptionJobDetailsPage,
};

function NotFound() {
  return <div>Not found</div>;
}

export function Router({ initialPage }) {
  const [currentPagePath, setCurrentPage] = useState(window.location.hash.substring(1) || initialPage);

  useEffect(() => {
    const handler = () => setCurrentPage(window.location.hash.substring(1));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPagePath]);

  const CurrentPage = currentPagePath in pages ? pages[currentPagePath] : NotFound;

  return <CurrentPage />;
}

export function useRouter() {
  return {
    navigate: newPage => (location.hash = `#${newPage}`),
  };
}
