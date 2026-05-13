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

/**
 * A container whose content fades and clips horizontally as `expanded` changes.
 * The content is kept in the DOM at all times so the transition is smooth.
 */
function CollapsingContent({ expanded, flex, children }: { expanded: boolean; flex?: boolean; children: ReactNode }) {
  return (
    <div
      style={{
        // maxWidth drives the clipping animation; opacity softens the appearance.
        maxWidth: expanded ? 1000 : 0,
        opacity: expanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-width 200ms, opacity 150ms',
        // flex: 1 lets this container fill remaining space (e.g. brand header row).
        // flexShrink: 0 is the default for non-flex children.
        ...(flex ? { flex: 1 } : { flexShrink: 0 }),
      }}
    >
      {children}
    </div>
  );
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
        // No horizontal padding — the icon column handles its own centering.
        // minHeight restores the original 36px item height.
        padding: 0,
        minHeight: 36,
        borderRadius: 8,
        cursor: 'pointer',
        backgroundColor: active
          ? awsui.colorBackgroundStatusIndicatorInfo
          : hovered
            ? awsui.colorBackgroundDropdownItemHover
            : 'transparent',
        color: active ? awsui.colorTextAccent : awsui.colorTextBodyDefault,
        fontWeight: active ? 500 : 400,
        whiteSpace: 'nowrap',
      }}
    >
      {/*
       * Icon column: fixed width = collapsed item width (40px).
       * justify-content: center keeps the icon perfectly centred when collapsed,
       * and acts as a stable left anchor when the label is visible.
       */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          flexShrink: 0,
          ...(active ? { color: '#5C7FFF' } : undefined),
        }}
      >
        <Icon name={icon} variant="normal" />
      </span>

      {/* Label and badge animate in/out without touching the icon position. */}
      <CollapsingContent expanded={expanded}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingInlineEnd: 8 }}>
          <span style={{ flex: 1 }}>{label}</span>
          {badge && <Badge color="blue">{badge}</Badge>}
        </div>
      </CollapsingContent>
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
      {/* ── Brand / header row ──────────────────────────────────────────────
          The logo always occupies the same fixed-width column (padding 8px on
          each side + icon). Only the brand text and collapse button animate. */}
      <div
        style={{
          // 4px horizontal padding matches the nav scroll area so the logo column
          // (width 40px) is centred within the 48px collapsed sidebar.
          padding: '12px 4px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
          minHeight: '30px',
        }}
      >
        {/* Logo / toggle button — fixed-width column, always centered. */}
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
            justifyContent: 'center',
            width: 40,
            flexShrink: 0,
            color: awsui.colorTextHeadingDefault,
          }}
        >
          {brand.short}
        </div>

        {/* Brand text + collapse button animate in/out.
            flex: 1 lets this container grow to fill remaining header width so
            the collapse button can be pushed to the far right with marginInlineStart: auto. */}
        <CollapsingContent expanded={expanded} flex={true}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Box fontSize="heading-s">{brand.text}</Box>
            <div style={{ marginInlineStart: 'auto', paddingInlineEnd: '4px' }}>
              <Button
                iconSvg={
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 3V13" />
                    <rect x="1" y="3" width="14" height="10" rx="1" />
                  </svg>
                }
                variant="icon"
                ariaLabel="Collapse sidebar"
                onClick={onToggle}
              />
            </div>
          </div>
        </CollapsingContent>
      </div>

      {/* ── Nav sections ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', padding: '0 4px' }} tabIndex={0}>
        <SpaceBetween size="m" direction="vertical">
          {sections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <CollapsingContent expanded={expanded}>
                  <Box variant="small" color="text-body-secondary" padding={{ horizontal: 'xs', bottom: 'xxs' }}>
                    {section.title}
                  </Box>
                </CollapsingContent>
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

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      {footer ? (
        <CollapsingContent expanded={expanded}>{footer}</CollapsingContent>
      ) : (
        <div
          style={{
            padding: '12px 8px',
            borderTop: `1px solid ${awsui.colorBorderDividerDefault}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <Icon name="user-profile" />
          </span>
          <CollapsingContent expanded={expanded}>
            <div>
              <Box fontSize="body-s">{user.name}</Box>
              <Box variant="small" color="text-body-secondary">
                {user.email}
              </Box>
            </div>
          </CollapsingContent>
        </div>
      )}
    </div>
  );
}
