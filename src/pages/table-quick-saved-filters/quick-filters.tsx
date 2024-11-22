// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import {
  Box,
  Button,
  Checkbox,
  ExpandableSection,
  FormField,
  Slider,
  SpaceBetween,
} from '@cloudscape-design/components';
import React, { useState } from 'react';

interface QuickFilterFormProps {
  expandable?: boolean;
  defaultExpanded?: boolean;
  title: string;
  counter?: number;
  children: React.ReactNode;
}

interface QuickFilterEnumProps {
  expandable?: boolean;
  defaultExpanded?: boolean;
  title: string;
  values: string[];
  renderValue?: (value: string) => React.ReactNode;
  checkedValues: string[];
  onChange: (value: string) => void;
  getTotal: (value: string) => number;
  hideCounter?: boolean;
  limit?: number;
}

export function QuickFilterEnum({
  values,
  renderValue,
  checkedValues,
  onChange,
  limit,
  getTotal,
  hideCounter = false,
  ...formProps
}: QuickFilterEnumProps) {
  const [effectiveLimit, setEffectiveLimit] = useState(limit ?? 999);
  const showToggle = limit && values.length > limit;
  return (
    <QuickFilterForm {...formProps} counter={!hideCounter ? checkedValues.length : undefined}>
      {values.slice(0, effectiveLimit).map(value => (
        <Checkbox key={value} checked={checkedValues.includes(value)} onChange={() => onChange(value)}>
          <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
            <Box>{renderValue ? renderValue(value) : value}</Box>
            <Box fontSize="body-s" color="text-body-secondary">
              ({getTotal(value)})
            </Box>
          </SpaceBetween>
        </Checkbox>
      ))}

      {showToggle && (
        <Button
          variant="inline-link"
          iconName={effectiveLimit === 4 ? 'treeview-expand' : 'treeview-collapse'}
          onClick={() => setEffectiveLimit(prev => (prev === limit ? 999 : limit))}
        >
          {effectiveLimit === limit ? 'Show more' : 'Show fewer'}
        </Button>
      )}
    </QuickFilterForm>
  );
}

interface QuickFilterRangeProps {
  expandable?: boolean;
  defaultExpanded?: boolean;
  title: string;
  value: { min: number; max: number };
  enabled: boolean;
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
}

export function QuickFilterRange({ value, min, max, enabled, onChange, ...formProps }: QuickFilterRangeProps) {
  const [diff, setDiff] = useState(value.max - value.min);
  return (
    <QuickFilterForm {...formProps} counter={enabled ? 1 : 0}>
      <SpaceBetween size="xxs">
        <FormField description="Min">
          <Slider
            value={value?.min ?? 0}
            min={min}
            max={max}
            onChange={({ detail }) => onChange({ min: detail.value, max: Math.min(max, detail.value + diff) })}
          />
        </FormField>
        <FormField description="Max">
          <Slider
            value={value?.max ?? diff}
            min={min}
            max={max}
            onChange={({ detail }) => {
              const nextValue = { max: detail.value, min: Math.min(detail.value, value?.min ?? 0) };
              onChange(nextValue);
              setDiff(nextValue.max - nextValue.min);
            }}
          />
        </FormField>
      </SpaceBetween>
    </QuickFilterForm>
  );
}

interface SingleClickFilter {
  expandable?: boolean;
  defaultExpanded?: boolean;
  title: string;
  values: string[];
  getTotal: (value: string) => number;
  onSelect: (value: string) => void;
}

export function SingleClickFilter({ values, onSelect, getTotal, ...formProps }: SingleClickFilter) {
  return (
    <QuickFilterForm {...formProps}>
      <ul style={{ padding: '0 0 0 16px', margin: '-8px 0 0 0' }}>
        {values.map(value => (
          <li key={value}>
            <SpaceBetween size="xxs" direction="horizontal" alignItems="center">
              <Button variant="inline-link" onClick={() => onSelect(value)}>
                {value}
              </Button>
              <Box fontSize="body-s" color="text-body-secondary">
                ({getTotal(value)})
              </Box>
            </SpaceBetween>
          </li>
        ))}
      </ul>
    </QuickFilterForm>
  );
}

function QuickFilterForm({
  title,
  counter,
  expandable = true,
  defaultExpanded = true,
  children,
}: QuickFilterFormProps) {
  const headerText = !counter ? title : `${title} (${counter})`;

  if (expandable) {
    return (
      <ExpandableSection variant="footer" defaultExpanded={defaultExpanded} headerText={headerText}>
        {children}
      </ExpandableSection>
    );
  }

  return (
    <div>
      <Box variant="h4">{headerText}</Box>
      <Box>{children}</Box>
    </div>
  );
}
