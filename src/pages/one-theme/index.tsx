// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';
import { applyMode, Mode } from '@cloudscape-design/global-styles';

import { App } from './app';
import { theme } from './theme';

import '../../styles/base.scss';
import './fonts.css';

applyTheme({ theme });

// Apply dark mode based on system preference and listen for changes
const mq = window.matchMedia('(prefers-color-scheme: dark)');
applyMode(mq.matches ? Mode.Dark : Mode.Light);
mq.addEventListener('change', e => applyMode(e.matches ? Mode.Dark : Mode.Light));

createRoot(document.getElementById('app')!).render(<App />);
