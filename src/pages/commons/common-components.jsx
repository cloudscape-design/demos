// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { forwardRef } from 'react';
import {
  AppLayout,
  Badge,
  Box,
  Button,
  Flashbar,
  Header,
  Link,
  SideNavigation,
  SpaceBetween,
} from '@cloudscape-design/components';
import { appLayoutLabels, externalLinkProps } from '../../common/labels';
import { getHeaderCounterText, getServerHeaderCounterText } from '../../common/tableCounterStrings';
import { useNotifications } from './use-notifications';

export const navHeader = { text: 'Service', href: '#/' };
export const navItems = [
  {
    type: 'section',
    text: 'Reports and analytics',
    items: [
      { type: 'link', text: 'Distributions', href: '#/distributions' },
      { type: 'link', text: 'Cache statistics', href: '#/cache' },
      { type: 'link', text: 'Monitoring and alarms', href: '#/monitoring' },
      { type: 'link', text: 'Popular objects', href: '#/popular' },
      { type: 'link', text: 'Top referrers', href: '#/referrers' },
      { type: 'link', text: 'Usage', href: '#/usage' },
      { type: 'link', text: 'Viewers', href: '#/viewers' },
    ],
  },
  {
    type: 'section',
    text: 'Private content',
    items: [
      { type: 'link', text: 'How-to guide', href: '#/howto' },
      { type: 'link', text: 'Origin access identity', href: '#/origin' },
    ],
  },
];

export const ec2NavItems = [
  { type: 'link', text: 'Instances', href: '#/instances' },
  { type: 'link', text: 'Instance types', href: '#/instance-types' },
  { type: 'link', text: 'Launch templates', href: '#/launch-templates' },
  { type: 'link', text: 'Spot requests', href: '#/spot-requests' },
  { type: 'link', text: 'Saving plans', href: '#/saving-plans' },
  { type: 'link', text: 'Reserved instances', href: '#/reserved-instances' },
  { type: 'divider' },
  {
    type: 'link',
    text: 'Notifications',
    info: <Badge color="red">23</Badge>,
    href: '#/notifications',
  },
  {
    type: 'link',
    text: 'Documentation',
    external: true,
    href: '#/documentation',
  },
];

export const InfoLink = ({ id, onFollow, ariaLabel }) => (
  <Link variant="info" id={id} onFollow={onFollow} ariaLabel={ariaLabel}>
    Info
  </Link>
);

// a special case of external link, to be used within a link group, where all of them are external
// and we do not repeat the icon
export const ExternalLinkItem = ({ href, text }) => (
  <Link href={href} ariaLabel={`${text} ${externalLinkProps.externalIconAriaLabel}`} target="_blank">
    {text}
  </Link>
);

export const TableNoMatchState = props => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={props.onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

export const TableEmptyState = ({ resourceName }) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No {resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          No {resourceName.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button>Create {resourceName.toLowerCase()}</Button>
    </SpaceBetween>
  </Box>
);

function getCounter(props) {
  if (props.counter) {
    return props.counter;
  }
  if (!props.totalItems) {
    return null;
  }
  if (props.serverSide) {
    return getServerHeaderCounterText(props.totalItems, props.selectedItems);
  }
  return getHeaderCounterText(props.totalItems, props.selectedItems);
}

export const TableHeader = props => {
  return (
    <Header
      variant={props.variant}
      counter={getCounter(props)}
      info={
        props.loadHelpPanelContent && <InfoLink onFollow={props.loadHelpPanelContent} ariaLabel={`Information about ${props.title}.`} />
      }
      description={props.description}
      actions={props.actionButtons}
    >
      {props.title}
    </Header>
  );
};

const defaultOnFollowHandler = ev => {
  // keep the locked href for our demo pages
  ev.preventDefault();
};

export function Navigation({
  activeHref,
  header = navHeader,
  items = navItems,
  onFollowHandler = defaultOnFollowHandler,
}) {
  return <SideNavigation items={items} header={header} activeHref={activeHref} onFollow={onFollowHandler} />;
}

export function Notifications({ successNotification }) {
  const notifications = useNotifications(successNotification);
  return <Flashbar items={notifications} />;
}

export const CustomAppLayout = forwardRef((props, ref) => {
  return (
    <AppLayout
      ref={ref}
      {...props}
      headerSelector="#header"
      ariaLabels={appLayoutLabels}
      onNavigationChange={event => {
        if (props.onNavigationChange) {
          props.onNavigationChange(event);
        }
      }}
      onToolsChange={event => {
        if (props.onToolsChange) {
          props.onToolsChange(event);
        }
      }}
    />
  );
})

export const CounterLink = ({ children }) => {
  return (
    <Link variant="awsui-value-large" href="#">
      {children}
    </Link>
  );
};
