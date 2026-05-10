// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { lazy, Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Spinner from '@cloudscape-design/components/spinner';

const HomePage = lazy(() => import('./pages/home'));
const AuthPage = lazy(() => import('./pages/auth'));
const ConsoleHomePage = lazy(() => import('./pages/console-home'));
const OmegaShell = lazy(() => import('./pages/omega-shell'));
const CourtyardShell = lazy(() => import('./pages/courtyard-shell'));

export function App() {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Spinner size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/console" element={<ConsoleHomePage />} />
          <Route path="/omega/*" element={<OmegaShell />} />
          <Route path="/courtyard/*" element={<CourtyardShell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
