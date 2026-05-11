// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyMode, Mode } from '@cloudscape-design/global-styles';

import '../../common/apply-theme';
import { App } from './app';

import '../../styles/base.scss';
import './fonts.css';

// Default to dark mode and listen for system preference changes
applyMode(Mode.Dark);
const mq = window.matchMedia('(prefers-color-scheme: dark)');
mq.addEventListener('change', e => applyMode(e.matches ? Mode.Dark : Mode.Light));

createRoot(document.getElementById('app')!).render(<App />);
