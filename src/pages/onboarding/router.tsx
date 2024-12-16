// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { FC, useEffect, useState } from 'react';

import { CreateTranscriptionJobPage } from './subpages/create-transcription-job';
import { TranscriptionJobDetailsPage } from './subpages/transcription-job-details';
import { TranscriptionJobListPage } from './subpages/transcription-job-list';

const pages: Record<string, FC> = {
  'create-transcription-job': CreateTranscriptionJobPage,
  'transcription-job-list': TranscriptionJobListPage,
  'transcription-job-details': TranscriptionJobDetailsPage,
};

function NotFound() {
  return <div>Not found</div>;
}

interface RouterProps {
  initialPage: string;
}

export function Router({ initialPage }: RouterProps) {
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
    navigate: (newPage: string) => (location.hash = `#${newPage}`),
  };
}
