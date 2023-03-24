// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './app';
import '../../styles/base.scss';

createRoot(document.getElementById('app')!).render(<App />);
