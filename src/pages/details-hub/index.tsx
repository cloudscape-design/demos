// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import customTheme from '../../common/theme-definition';
import { App } from './app';

import '../../styles/base.scss';
applyTheme({ theme: customTheme });

createRoot(document.getElementById('app')!).render(<App />);
