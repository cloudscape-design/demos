// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { ReactNode, useState } from 'react';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import type { IconProps } from '@cloudscape-design/components/icon';
import Icon from '@cloudscape-design/components/icon';
import SpaceBetween from '@cloudscape-design/components/space-between';
import * as awsui from '@cloudscape-design/design-tokens';

export interface SidebarItem {
  icon: IconProps.Name;
  label: string;
  path: string;
  badge?: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarBrand {
  text: string;
  /** Short visual shown when the sidebar is collapsed (single character / glyph). */
  short: ReactNode;
}

export interface SidebarUser {
  name: string;
  email: string;
}

export interface SidebarProps {
  brand: SidebarBrand;
  sections: SidebarSection[];
  activePath: string;
  user: SidebarUser;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  /** Custom footer content. When provided, replaces the default user card at the bottom. */
  footer?: ReactNode;
}

/**
 * Pick the item whose path is the longest match against the current path.
 * Returns `null` if nothing matches. This avoids false positives when one item's
 * path (e.g. `/omega`) is a prefix of another (`/omega/projects`).
 */
function findActivePath(sections: SidebarSection[], activePath: string): string | null {
  const allPaths = sections.flatMap(s => s.items.map(i => i.path));
  const matches = allPaths
    .filter(p => activePath === p || activePath.startsWith(p + '/'))
    .sort((a, b) => b.length - a.length);
  return matches[0] ?? null;
}

interface NavItemProps extends SidebarItem {
  active: boolean;
  expanded: boolean;
  onNavigate: () => void;
}

function NavItem({ icon, label, active, badge, expanded, onNavigate }: NavItemProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onNavigate}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate();
        }
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: expanded ? '8px 12px' : '8px',
        justifyContent: expanded ? 'flex-start' : 'center',
        borderRadius: 8,
        cursor: 'pointer',
        backgroundColor: active
          ? awsui.colorBackgroundItemSelected
          : hovered
            ? awsui.colorBackgroundDropdownItemHover
            : 'transparent',
        color: active ? awsui.colorTextAccent : awsui.colorTextBodyDefault,
        fontWeight: active ? 500 : 400,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon name={icon} variant={active ? 'link' : 'normal'} />
      {expanded && <span style={{ flex: 1 }}>{label}</span>}
      {expanded && badge && <Badge color="blue">{badge}</Badge>}
    </div>
  );
}

export function Sidebar({ brand, sections, activePath, user, expanded, onToggle, onNavigate, footer }: SidebarProps) {
  const activeMatch = findActivePath(sections, activePath);
  return (
    <div
      style={{
        width: expanded ? 240 : 48,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'width 200ms',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: expanded ? '12px 16px 24px' : '12px 16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: expanded ? 'flex-start' : 'center',
          whiteSpace: 'nowrap',
          minHeight: '30px',
        }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={onToggle}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            color: awsui.colorTextHeadingDefault,
          }}
        >
          {brand.short}
        </div>
        {expanded && (
          <>
            <Box fontSize="heading-s">{brand.text}</Box>
            <div style={{ marginInlineStart: 'auto' }}>
              <Button iconName="angle-left" variant="icon" ariaLabel="Collapse sidebar" onClick={onToggle} />
            </div>
          </>
        )}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: expanded ? '0 8px' : '0 4px' }} tabIndex={0}>
        <SpaceBetween size="m" direction="vertical">
          {sections.map((section, si) => (
            <div key={si}>
              {expanded && section.title && (
                <Box variant="small" color="text-body-secondary" padding={{ horizontal: 'xs', bottom: 'xxs' }}>
                  {section.title}
                </Box>
              )}
              <SpaceBetween size="xxs" direction="vertical">
                {section.items.map(item => (
                  <NavItem
                    key={item.path}
                    {...item}
                    active={item.path === activeMatch}
                    expanded={expanded}
                    onNavigate={() => onNavigate(item.path)}
                  />
                ))}
              </SpaceBetween>
            </div>
          ))}
        </SpaceBetween>
      </div>
      {footer && expanded ? (
        footer
      ) : (
        <div
          style={{
            padding: expanded ? '12px 16px' : '12px 0',
            borderTop: `1px solid ${awsui.colorBorderDividerDefault}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: expanded ? 'flex-start' : 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <Icon name="user-profile" />
          {expanded && (
            <div>
              <Box fontSize="body-s">{user.name}</Box>
              <Box variant="small" color="text-body-secondary">
                {user.email}
              </Box>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
