// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { App } from './app';
import { theme } from './theme';

import '../../styles/base.scss';
import './fonts.css';

applyTheme({ theme });

createRoot(document.getElementById('app')!).render(<App />);
