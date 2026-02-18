// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import { themeCoreConfig } from '../../common/theme-core';
import { App } from './app';

import '../../styles/form.scss';

applyTheme({ theme: themeCoreConfig });
createRoot(document.getElementById('app')!).render(<App />);
