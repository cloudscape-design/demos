// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import { SelectProps } from '@cloudscape-design/components/select';

import { applyCustomTheme } from '../../common/apply-theme';
import { generateThemeConfigOneTheme } from '../../common/theme-one-theme';

export function GlobalSplitPanelContent() {
  const [fontStretch] = useState(95);
  const [checked] = useState(false);
  const [checkedFontSmooth] = useState(true);
  const linkColorOptions: SelectProps.Options = [
    {
      label: 'Blue for info links only',
      value: 'blue-secondary',
      description:
        'Recommended default: primary links use the body text color, while info links use blue for clearer distinction.',
    },
    { label: 'Same color as normal text', value: 'same-as-text' },
    { label: 'Lighter than normal text', value: 'lighter' },
    { label: 'Darker than normal text', value: 'darker' },
    { label: 'Blue for all link texts', value: 'blue' },
  ];
  const [selectedLinkColor] = useState<SelectProps.Option>(linkColorOptions[0]);

  // Apply theme on mount and when settings change
  useEffect(() => {
    const applyThemeChanges = () => {
      try {
        const baseTheme = generateThemeConfigOneTheme();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const themeTokens: any = { ...baseTheme.tokens };

        // Apply borderRadiusFlashbar only when toggle is on
        if (checked) {
          themeTokens.borderRadiusFlashbar = '0px';
        }

        const updatedTheme = {
          tokens: themeTokens,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          referenceTokens: (baseTheme as any).referenceTokens || {},
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          contexts: (baseTheme as any).contexts || {},
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        applyCustomTheme(updatedTheme as any);
      } catch (error) {
        console.error('Failed to apply theme:', error);
      }
    };

    if (checked) {
      document.body.classList.add('filled-flashbar');
    } else {
      document.body.classList.remove('filled-flashbar');
    }

    document.body.classList.add('custom-css-enabled');

    // Toggle blue-secondary link color class
    if (selectedLinkColor?.value === 'blue-secondary') {
      document.body.classList.add('blue-secondary-link');
    } else {
      document.body.classList.remove('blue-secondary-link');
    }

    applyThemeChanges();
  }, [checked, selectedLinkColor]);

  // Toggle font-smooth-auto class on body
  useEffect(() => {
    if (checkedFontSmooth) {
      document.body.classList.remove('font-smooth-auto');
    } else {
      document.body.classList.add('font-smooth-auto');
    }
  }, [checkedFontSmooth]);

  // Apply font-stretch globally via injected style tag
  useEffect(() => {
    const styleId = 'font-stretch-override';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `* { font-stretch: ${fontStretch}% !important; }`;
    return () => {
      styleEl?.remove();
    };
  }, [fontStretch]);

  return (
    <Box padding={{ vertical: 'm' }}>
      <ColumnLayout borders="horizontal">
        {/* <Box padding={{ bottom: 'l' }}>
          <Box variant="h3" padding={{ vertical: 'm' }}>
            Display Settings
          </Box>
          <SpaceBetween size="m">
            <FormField label="Link color">
              <Select
                selectedOption={selectedLinkColor}
                onChange={({ detail }) => setSelectedLinkColor(detail.selectedOption)}
                options={linkColorOptions}
              />
            </FormField>
            <FormField label="fontSmooth">
              <Checkbox onChange={({ detail }) => setCheckedFontSmooth(detail.checked)} checked={checkedFontSmooth}>
                font-smooth
              </Checkbox>
            </FormField>
            <FormField label={`fontStretch: ${fontStretch}%`} constraintText="Available only for variable font">
              <Slider onChange={({ detail }) => setFontStretch(detail.value)} value={fontStretch} max={100} min={90} />
            </FormField>
            <FormField label="Flashbar style">
              <Checkbox onChange={({ detail }) => setChecked(detail.checked)} checked={checked}>
                Filled flashbar (borderRadius: 0)
              </Checkbox>
            </FormField>
          </SpaceBetween>
        </Box> */}
      </ColumnLayout>
    </Box>
  );
}
