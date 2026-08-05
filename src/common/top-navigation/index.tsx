// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import '../theming/init-theme';
import DemosTopNav from './top-navigation';

createRoot(document.getElementsByClassName('top-navigation-container')[0]!).render(<DemosTopNav />);
