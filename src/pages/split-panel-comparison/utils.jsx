// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import { Header, Table, BreadcrumbGroup, KeyValuePairs, Box, Link } from '@cloudscape-design/components';
import { COLUMN_DEFINITIONS_PANEL_CONTENT_SINGLE, SELECTION_LABELS } from './table-config';
import { isVisualRefresh } from '../../common/apply-mode';

const EMPTY_PANEL_CONTENT = {
  header: '0 instances selected',
  body: 'Select an instance to see its details.',
};

export const getPanelContent = (items, type) => {
  if (type === 'single') {
    return getPanelContentSingle(items);
  } else if (type === 'multiple') {
    return getPanelContentMultiple(items);
  } else {
    return getPanelContentComparison(items);
  }
};

export const getPanelContentSingle = items => {
  if (!items.length) {
    return EMPTY_PANEL_CONTENT;
  }

  const item = items[0];

  return {
    header: item.id,
    body: (
      <Table
        enableKeyboardNavigation={true}
        header={
          <Header variant="h2" counter={`(${item.inboundRules.length})`}>
            Inbound rules
          </Header>
        }
        columnDefinitions={COLUMN_DEFINITIONS_PANEL_CONTENT_SINGLE}
        items={item.inboundRules}
        variant={isVisualRefresh ? 'borderless' : 'container'}
      ></Table>
    ),
  };
};

export const getPanelContentMultiple = items => {
  if (!items.length) {
    return EMPTY_PANEL_CONTENT;
  }

  if (items.length === 1) {
    return getPanelContentSingle(items);
  }

  const enabled = items.filter(({ state }) => state === 'Deactivated').length;
  const volumes = items.reduce((volumes, { volume }) => {
    volumes += volume;
    return volumes;
  }, 0);
  const securityGroups = items.reduce((numOfSecurityGroups, { securityGroups }) => {
    numOfSecurityGroups += securityGroups.length;
    return numOfSecurityGroups;
  }, 0);
  const loadBalancers = items.reduce((numOfLoadBalancers, { loadBalancers }) => {
    numOfLoadBalancers += loadBalancers.length;
    return numOfLoadBalancers;
  }, 0);

  return {
    header: `${items.length} instances selected`,
    body: (
      <KeyValuePairs
        columns={4}
        items={[
          {
            label: 'Running instances',
            value: (
              <Link variant="awsui-value-large" href="#" ariaLabel={`Running instances (${enabled})`}>
                {enabled}
              </Link>
            ),
          },
          {
            label: 'Volumes',
            value: (
              <Link variant="awsui-value-large" href="#" ariaLabel={`Volumes (${volumes})`}>
                {volumes}
              </Link>
            ),
          },
          {
            label: 'Security groups',
            value: (
              <Link variant="awsui-value-large" href="#" ariaLabel={`Security groups (${securityGroups})`}>
                {securityGroups}
              </Link>
            ),
          },
          {
            label: 'Load balancers',
            value: (
              <Link variant="awsui-value-large" href="#" ariaLabel={`Load balancers (${loadBalancers})`}>
                {loadBalancers}
              </Link>
            ),
          },
        ]}
      />
    ),
  };
};

export const getPanelContentComparison = items => {
  if (!items.length) {
    return {
      header: '0 instances selected',
      body: 'Select an instance to see its details. Select multiple instances to compare.',
    };
  }

  if (items.length === 1) {
    return getPanelContentSingle(items);
  }
  const keyHeaderMap = {
    platformDetails: 'Platform details',
    numOfvCpu: 'Number of vCPUs',
    launchTime: 'Launch time',
    availabilityZone: 'Availability zone',
    monitoring: 'Monitoring',
    securityGroups: 'Security groups',
  };
  const transformedData = [
    'platformDetails',
    'numOfvCpu',
    'launchTime',
    'availabilityZone',
    'monitoring',
    'securityGroups',
  ].map(key => {
    const data = { comparisonType: keyHeaderMap[key] };

    for (const item of items) {
      data[item.id] = item[key];
    }

    return data;
  });

  const columnDefinitions = [
    {
      id: 'comparisonType',
      header: '',
      cell: ({ comparisonType }) => <b>{comparisonType}</b>,
    },
    ...items.map(({ id }) => ({
      id,
      header: id,
      cell: item => (Array.isArray(item[id]) ? item[id].join(', ') : item[id]),
    })),
  ];

  return {
    header: `${items.length} instances selected`,
    body: (
      <Box padding={{ bottom: 'l' }}>
        <Table
          enableKeyboardNavigation={true}
          ariaLabels={SELECTION_LABELS}
          header={<Header variant="h2">Compare details</Header>}
          items={transformedData}
          columnDefinitions={columnDefinitions}
          variant={isVisualRefresh ? 'borderless' : 'container'}
        />
      </Box>
    ),
  };
};

export const Breadcrumbs = () => (
  <BreadcrumbGroup
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
    items={[
      { text: 'Service', href: '#/ec2' },
      { text: 'Instances', href: '#/ec2/instances' },
    ]}
  />
);

export const useSplitPanel = selectedItems => {
  const [splitPanelSize, setSplitPanelSize] = useState(300);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [hasManuallyClosedOnce, setHasManuallyClosedOnce] = useState(false);

  const onSplitPanelResize = ({ detail: { size } }) => {
    setSplitPanelSize(size);
  };

  const onSplitPanelToggle = ({ detail: { open } }) => {
    setSplitPanelOpen(open);

    if (!open) {
      setHasManuallyClosedOnce(true);
    }
  };

  useEffect(() => {
    if (selectedItems.length && !hasManuallyClosedOnce) {
      setSplitPanelOpen(true);
    }
  }, [selectedItems.length, hasManuallyClosedOnce]);

  return {
    splitPanelOpen,
    onSplitPanelToggle,
    splitPanelSize,
    onSplitPanelResize,
  };
};
