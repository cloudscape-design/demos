// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';

import { headerText } from '../config';

export default function Breadcrumbs() {
  return (
    <BreadcrumbGroup
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
      items={[
        { text: 'Service', href: '#' },
        { text: 'Monitoring and alarms', href: '#' },
        { text: headerText, href: '#' },
      ]}
    />
  );
}
