// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import Button from '@cloudscape-design/components/button';
import NavigationBar from '@cloudscape-design/components/navigation-bar';
import Spinner from '@cloudscape-design/components/spinner';
import * as awsui from '@cloudscape-design/design-tokens';

import { AwsLogoMark } from '../aws-mark';
import { Sidebar, SidebarSection } from '../components/sidebar';

const OverviewPage = lazy(() => import('./omega/overview'));
const ProjectsPage = lazy(() => import('./omega/projects'));
const DeploymentsPage = lazy(() => import('./omega/deployments'));
const DeploymentDetailPage = lazy(() => import('./omega/deployment-detail'));
const CreateProjectPage = lazy(() => import('./omega/create'));
const ProjectDetailPage = lazy(() => import('./omega/project-detail'));

const SECTIONS: SidebarSection[] = [
  {
    items: [
      { icon: 'grid-view', label: 'Overview', path: '/omega' },
      { icon: 'folder', label: 'Projects', path: '/omega/projects' },
      { icon: 'upload-download', label: 'Deployments', path: '/omega/deployments' },
      { icon: 'status-positive', label: 'Health', path: '/omega/health' },
      { icon: 'group-active', label: 'Team', path: '/omega/team' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { icon: 'search', label: 'Explorer', path: '/omega/explorer' },
      { icon: 'ticket', label: 'Billing', path: '/courtyard/billing' },
      { icon: 'settings', label: 'Settings', path: '/omega/settings' },
    ],
  },
];

// Raw SVG for the book icon. Used by Button's `iconSvg` prop which wraps it in Button's
// own sizing (the <Icon> wrapper is not usable here because iconSvg expects a raw <svg>).
function bookIconSvg() {
  return (
    <svg viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true">
      <path
        d="M2 3.5C2 2.67 2.67 2 3.5 2H7v11H3.5a1.5 1.5 0 0 0-1.5 1.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5C14 2.67 13.33 2 12.5 2H9v11h3.5a1.5 1.5 0 0 1 1.5 1.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function computeBreadcrumbs(pathname: string): BreadcrumbGroupProps.Item[] {
  // Split `/omega/deployments/abc-123` into ['omega', 'deployments', 'abc-123'].
  const parts = pathname.replace(/^\/|\/$/g, '').split('/');
  const crumbs: BreadcrumbGroupProps.Item[] = [{ text: 'Omega', href: '#/omega' }];

  if (parts.length < 2) {
    return crumbs;
  }

  const second = parts[1];
  if (second === 'projects') {
    crumbs.push({ text: 'Projects', href: '#/omega/projects' });
  } else if (second === 'project' && parts[2]) {
    crumbs.push({ text: 'Projects', href: '#/omega/projects' });
    crumbs.push({ text: parts[2], href: `#/omega/project/${parts[2]}` });
  } else if (second === 'deployments') {
    crumbs.push({ text: 'Deployments', href: '#/omega/deployments' });
    if (parts[2]) {
      crumbs.push({ text: parts[2], href: `#/omega/deployments/${parts[2]}` });
    }
  } else if (second === 'create') {
    crumbs.push({ text: 'Create project', href: '#/omega/create' });
  } else {
    // Unknown nested route — fall back to title-cased segment.
    const label = second.charAt(0).toUpperCase() + second.slice(1);
    crumbs.push({ text: label, href: `#/omega/${second}` });
  }
  return crumbs;
}

interface TopBarProps {
  onNavigate: (path: string) => void;
  breadcrumbs: BreadcrumbGroupProps.Item[];
}

function OmegaTopBar({ onNavigate, breadcrumbs }: TopBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        height: 48,
        gap: 8,
        flex: 1,
        inlineSize: '100%',
        minInlineSize: 0,
      }}
    >
      <div style={{ flex: 1, minInlineSize: 0, overflow: 'hidden' }}>
        <BreadcrumbGroup
          items={breadcrumbs}
          ariaLabel="Breadcrumbs"
          expandAriaLabel="Show path"
          onFollow={event => {
            event.preventDefault();
            onNavigate(event.detail.href.replace(/^#/, ''));
          }}
        />
      </div>
      <Button iconName="notification" variant="icon" ariaLabel="Notifications" />
      <Button iconSvg={bookIconSvg()} variant="icon" ariaLabel="Documentation" />
      <Button iconName="user-profile" variant="icon" ariaLabel="User profile" />
      <span style={{ fontSize: 14, color: awsui.colorTextBodyDefault }}>Alex</span>
    </div>
  );
}

export default function OmegaShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const breadcrumbs = useMemo(() => computeBreadcrumbs(location.pathname), [location.pathname]);

  return (
    <AppLayoutToolbar
      navigationHide={true}
      toolsHide={true}
      disableContentPaddings={true}
      content={
        <div
          style={{
            display: 'flex',
            height: '100dvh',
            backgroundColor: awsui.colorBackgroundLayoutMain,
          }}
        >
          {/* Sidebar spans full height */}
          <NavigationBar
            placement="start"
            variant="secondary"
            ariaLabel="Side navigation"
            content={
              <Sidebar
                brand={{ text: 'Omega', short: <AwsLogoMark width={52} height={30} aria-label="AWS" /> }}
                sections={SECTIONS}
                activePath={location.pathname}
                user={{ name: 'Alex', email: 'alex@example.com' }}
                expanded={expanded}
                onToggle={() => setExpanded(e => !e)}
                onNavigate={navigate}
              />
            }
          />
          {/* Top nav + content only occupy the remaining width */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <NavigationBar
              placement="top"
              role="banner"
              variant="primary"
              ariaLabel="Main navigation"
              content={<OmegaTopBar onNavigate={navigate} breadcrumbs={breadcrumbs} />}
            />
            <main style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }} tabIndex={-1}>
              <Suspense fallback={<Spinner size="large" />}>
                <Routes>
                  <Route index={true} element={<OverviewPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="deployments" element={<DeploymentsPage />} />
                  <Route path="deployments/:deploymentId" element={<DeploymentDetailPage />} />
                  <Route path="create" element={<CreateProjectPage />} />
                  <Route path="project/:id" element={<ProjectDetailPage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      }
    />
  );
}
