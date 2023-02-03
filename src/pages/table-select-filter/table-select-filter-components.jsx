// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { BreadcrumbGroup, HelpPanel, StatusIndicator, SideNavigation } from '@cloudscape-design/components';
import { ExternalLinkGroup } from '../commons';
import '../../styles/table-select.scss';

export const StatusComponent = ({ status }) => {
  if (status === 'available') {
    return <StatusIndicator type="success">Available</StatusIndicator>;
  } else {
    return <StatusIndicator type="error">Unavailable</StatusIndicator>;
  }
};

const header = { text: 'Service', href: '#/' };

const items = [
  { type: 'link', text: 'Dashboard', href: '#/dashboard' },
  { type: 'link', text: 'Instances', href: '#/instances' },
  { type: 'link', text: 'Clusters', href: '#/clusters' },
  { type: 'link', text: 'Performance Insights', href: '#/perfomance' },
  { type: 'link', text: 'Snapshots', href: '#/usage' },
  { type: 'link', text: 'Reserved instances', href: '#/reservedinstances' },
  { type: 'divider' },
  { type: 'link', text: 'Subnet groups', href: '#/subnetgroups' },
  { type: 'link', text: 'Parameter groups', href: '#/paramgroups' },
  { type: 'link', text: 'Option groups', href: '#/optiongroups' },
  { type: 'link', text: 'Events', href: '#/event' },
  { type: 'link', text: 'Event subscriptions', href: '#/eventsub' },
];

export class Navigation extends React.Component {
  onFollowHandler(ev) {
    // keep the locked href for our demo pages
    ev.preventDefault();
  }

  render() {
    return (
      <SideNavigation
        items={items}
        header={header}
        activeHref={this.props.activeHref}
        onFollow={this.onFollowHandler.bind(this)}
      />
    );
  }
}

export const Breadcrumbs = () => (
  <BreadcrumbGroup
    expandAriaLabel="Show path"
    ariaLabel="Breadcrumbs"
    items={[
      { text: 'RDS', href: '#' },
      { text: 'Instances', href: '#' },
    ]}
  />
);

export const ToolsContent = () => (
  <HelpPanel
    header={<h2>Instances</h2>}
    footer={
      <ExternalLinkGroup
        items={[
          {
            href: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html',
            text: 'Amazon RDS database instances',
          },
          {
            href: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.Status.html',
            text: 'DB instance status',
          },
        ]}
      />
    }
  >
    <p>
      View your current DB instances and related information such as the engine, status, connections, class, and more.
      You can filter your instances by engine or class. To drill down even further into the details, choose the name of
      an individual instance.
    </p>
    <p>
      The status of a DB instance indicates the health of the DB instance. When you first create a DB instance, it has a
      status of <b>Creating</b> until the instance is ready to use. When the state changes to <b>Available</b>, you can
      connect to the instance.
    </p>
  </HelpPanel>
);
