// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import FormField from '@cloudscape-design/components/form-field';
import Input from '@cloudscape-design/components/input';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Toggle from '@cloudscape-design/components/toggle';

import { applyCustomTheme } from '../../common/apply-theme';
import { generateThemeConfig, themeCoreConfig } from '../../common/theme-core';

interface ThemeConfig {
  colorSelectedAccent?: string;
  borderWidthButton?: string;
  borderWidthField?: string;
  borderWidthIconSmall?: string;
  borderWidthIconNormal?: string;
  borderWidthIconMedium?: string;
  borderWidthIconBig?: string;
  borderWidthIconLarge?: string;
  borderRadiusButton?: string;
  borderRadiusInput?: string;
  borderRadiusContainer?: string;
  spaceScaledXxxs?: string;
  spaceScaledXxs?: string;
  spaceScaledXs?: string;
  spaceScaledS?: string;
  spaceScaledM?: string;
  spaceScaledL?: string;
  spaceScaledXl?: string;
  spaceScaledXxl?: string;
  colorBackgroundButtonPrimaryDefault?: string;
  colorBackgroundButtonPrimaryHover?: string;
  colorTextButtonPrimaryDefault?: string;
  fontSizeBodyS?: string;
  fontSizeBodyM?: string;
  fontSizeHeadingXl?: string;
  fontSizeHeadingL?: string;
  fontSizeHeadingM?: string;
  fontSizeHeadingS?: string;
  fontSizeHeadingXs?: string;
  lineHeightHeadingXl?: string;
  lineHeightHeadingL?: string;
  lineHeightHeadingM?: string;
  lineHeightHeadingS?: string;
  lineHeightHeadingXs?: string;
  shadowContainer?: string;
  fontFamilyBase?: string;
}

export function GlobalSplitPanelContent() {
  // Helper function to extract numeric value from CSS value like "24px" -> "24"
  const extractNumericValue = (value: string | undefined): string => {
    if (!value) {
      return '';
    }
    const match = value.match(/^(\d+(?:\.\d+)?)/);
    return match ? match[1] : value;
  };

  // Helper function to format color object to string
  const formatColorValue = (value: { light: string; dark: string } | undefined): string => {
    if (!value) {
      return '';
    }
    return `light: '${value.light}', dark: '${value.dark}'`;
  };

  const [checked, setChecked] = useState(false);
  const [config, setConfig] = useState<ThemeConfig>({
    colorSelectedAccent: formatColorValue({ light: '#1b232d', dark: '#f3f3f7' }),
    borderWidthButton: extractNumericValue((themeCoreConfig.tokens?.borderWidthButton as string) || '2px'),
    borderWidthIconSmall: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconSmall as string) || '1.5px'),
    borderWidthIconNormal: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconNormal as string) || '1.5px'),
    borderWidthIconMedium: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconMedium as string) || '2px'),
    borderWidthIconBig: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconBig as string) || '2px'),
    borderWidthIconLarge: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconLarge as string) || '2.5px'),
    borderRadiusButton: extractNumericValue((themeCoreConfig.tokens?.borderRadiusButton as string) || '8px'),
    borderRadiusContainer: extractNumericValue((themeCoreConfig.tokens?.borderRadiusContainer as string) || '12px'),
    fontSizeHeadingXl: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingXl as string) || '26px'),
    fontSizeHeadingL: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingL as string) || '22px'),
    fontSizeHeadingM: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingM as string) || '20px'),
    fontSizeHeadingS: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingS as string) || '18px'),
    fontSizeHeadingXs: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingXs as string) || '16px'),
    lineHeightHeadingXl: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingXl as string) || '32px'),
    lineHeightHeadingL: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingL as string) || '26px'),
    lineHeightHeadingM: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingM as string) || '24px'),
    lineHeightHeadingS: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingS as string) || '22px'),
    lineHeightHeadingXs: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingXs as string) || '20px'),
    fontFamilyBase: (themeCoreConfig.tokens?.fontFamilyBase as string) || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Apply CSS class to body when toggle changes
  useEffect(() => {
    const applyThemeChanges = () => {
      try {
        // Parse colorSelectedAccent if present
        let customAccentColor;
        if (config.colorSelectedAccent) {
          const lightMatch = config.colorSelectedAccent.match(/light:\s*'([^']+)'/);
          const darkMatch = config.colorSelectedAccent.match(/dark:\s*'([^']+)'/);
          if (lightMatch && darkMatch) {
            customAccentColor = { light: lightMatch[1], dark: darkMatch[1] };
          }
        }

        // Generate new theme config with custom accent color
        const baseTheme = customAccentColor ? generateThemeConfig(customAccentColor) : themeCoreConfig;

        // Ensure all values have 'px' unit appended if they're just numbers
        const customTokens = Object.fromEntries(
          Object.entries(config)
            .filter(([key, value]) => key !== 'colorSelectedAccent' && value !== undefined && value !== '')
            .map(([key, value]) => {
              // Font family should not have 'px' appended
              if (key === 'fontFamilyBase') {
                return [key, value];
              }
              // If value is a number without unit, append 'px'
              const stringValue = String(value).trim();
              if (stringValue && /^\d+(\.\d+)?$/.test(stringValue)) {
                return [key, `${stringValue}px`];
              }
              return [key, value];
            }),
        );

        const updatedTheme = {
          tokens: {
            ...baseTheme.tokens,
            ...customTokens,
            // Apply borderRadiusFlashbar only when toggle is on
            ...(checked && { borderRadiusFlashbar: '0px' }),
          },
          referenceTokens: baseTheme.referenceTokens,
          contexts: baseTheme.contexts,
        };

        applyCustomTheme(updatedTheme);
      } catch (error) {
        console.error('Failed to apply theme:', error);
      }
    };

    if (checked) {
      document.body.classList.add('filled-flashbar');
    } else {
      document.body.classList.remove('filled-flashbar');
    }
    // Apply theme changes when toggle state changes
    applyThemeChanges();
  }, [checked, config]);

  const handleInputChange = (key: keyof ThemeConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const applyThemeChanges = () => {
    try {
      // Parse colorSelectedAccent if present
      let customAccentColor;
      if (config.colorSelectedAccent) {
        const lightMatch = config.colorSelectedAccent.match(/light:\s*'([^']+)'/);
        const darkMatch = config.colorSelectedAccent.match(/dark:\s*'([^']+)'/);
        if (lightMatch && darkMatch) {
          customAccentColor = { light: lightMatch[1], dark: darkMatch[1] };
        }
      }

      // Generate new theme config with custom accent color
      const baseTheme = customAccentColor ? generateThemeConfig(customAccentColor) : themeCoreConfig;

      // Ensure all values have 'px' unit appended if they're just numbers
      const customTokens = Object.fromEntries(
        Object.entries(config)
          .filter(([key, value]) => key !== 'colorSelectedAccent' && value !== undefined && value !== '')
          .map(([key, value]) => {
            // Font family should not have 'px' appended
            if (key === 'fontFamilyBase') {
              return [key, value];
            }
            // If value is a number without unit, append 'px'
            const stringValue = String(value).trim();
            if (stringValue && /^\d+(\.\d+)?$/.test(stringValue)) {
              return [key, `${stringValue}px`];
            }
            return [key, value];
          }),
      );

      const updatedTheme = {
        tokens: {
          ...baseTheme.tokens,
          ...customTokens,
          // Apply borderRadiusFlashbar only when toggle is on
          ...(checked && { borderRadiusFlashbar: '0px' }),
        },
        referenceTokens: baseTheme.referenceTokens,
        contexts: baseTheme.contexts,
      };

      applyCustomTheme(updatedTheme);
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  };

  const resetTheme = () => {
    setChecked(false);
    setConfig({
      colorSelectedAccent: formatColorValue({ light: '#1b232d', dark: '#f3f3f7' }),
      borderWidthButton: extractNumericValue((themeCoreConfig.tokens?.borderWidthButton as string) || '1px'),
      borderWidthIconSmall: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconSmall as string) || '1.5px'),
      borderWidthIconNormal: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconNormal as string) || '1.5px'),
      borderWidthIconMedium: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconMedium as string) || '2px'),
      borderWidthIconBig: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconBig as string) || '2px'),
      borderWidthIconLarge: extractNumericValue((themeCoreConfig.tokens?.borderWidthIconLarge as string) || '2.5px'),
      borderRadiusButton: extractNumericValue((themeCoreConfig.tokens?.borderRadiusButton as string) || '8px'),
      borderRadiusInput: extractNumericValue((themeCoreConfig.tokens?.borderRadiusInput as string) || '8px'),
      borderRadiusContainer: extractNumericValue((themeCoreConfig.tokens?.borderRadiusContainer as string) || '12px'),
      fontSizeHeadingXl: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingXl as string) || '26px'),
      fontSizeHeadingL: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingL as string) || '22px'),
      fontSizeHeadingM: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingM as string) || '20px'),
      fontSizeHeadingS: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingS as string) || '18px'),
      fontSizeHeadingXs: extractNumericValue((themeCoreConfig.tokens?.fontSizeHeadingXs as string) || '16px'),
      lineHeightHeadingXl: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingXl as string) || '32px'),
      lineHeightHeadingL: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingL as string) || '26px'),
      lineHeightHeadingM: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingM as string) || '24px'),
      lineHeightHeadingS: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingS as string) || '22px'),
      lineHeightHeadingXs: extractNumericValue((themeCoreConfig.tokens?.lineHeightHeadingXs as string) || '20px'),
      fontFamilyBase: (themeCoreConfig.tokens?.fontFamilyBase as string) || '',
    });
    setErrors({});
    applyCustomTheme();
  };

  return (
    <Box padding={{ vertical: 'm' }}>
      <ColumnLayout borders="horizontal">
        <Box padding={{ bottom: 'l' }}>
          <Box variant="h3" padding={{ vertical: 'm' }}>
            Accent color
          </Box>
          <SpaceBetween size="xs">
            <FormField label="colorSelectedAccent">
              <Input
                type="text"
                placeholder="light: '#1b232d', dark: '#f3f3f7'"
                value={config.colorSelectedAccent || ''}
                onChange={({ detail }) => handleInputChange('colorSelectedAccent', detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Box>
        <Box padding={{ bottom: 'l' }}>
          <SpaceBetween size="xs">
            <FormField label="borderWidthButton" errorText={errors.borderWidthButton}>
              <Input
                type="number"
                placeholder="1px"
                value={config.borderWidthButton || ''}
                onChange={({ detail }) => handleInputChange('borderWidthButton', detail.value)}
              />
            </FormField>

            <FormField label="borderRadiusButton" errorText={errors.borderRadiusButton}>
              <Input
                type="number"
                placeholder="8px"
                value={config.borderRadiusButton || ''}
                onChange={({ detail }) => handleInputChange('borderRadiusButton', detail.value)}
              />
            </FormField>

            <FormField label="borderRadiusContainer" errorText={errors.borderRadiusContainer}>
              <Input
                type="number"
                placeholder="12px"
                value={config.borderRadiusContainer || ''}
                onChange={({ detail }) => handleInputChange('borderRadiusContainer', detail.value)}
              />
            </FormField>

            <FormField label="borderRadiusInput" errorText={errors.borderRadiusInput}>
              <Input
                type="number"
                placeholder="8px"
                value={config.borderRadiusInput || ''}
                onChange={({ detail }) => handleInputChange('borderRadiusInput', detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Box>

        <Box padding={{ bottom: 'l' }}>
          <Box variant="h3" padding={{ vertical: 'm' }}>
            Icon stroke
          </Box>

          <SpaceBetween size="xs">
            <FormField label="borderWidthIconSmall" errorText={errors.borderWidthIconSmall}>
              <Input
                type="number"
                placeholder="1.5px"
                value={config.borderWidthIconSmall || ''}
                onChange={({ detail }) => handleInputChange('borderWidthIconSmall', detail.value)}
              />
            </FormField>

            <FormField label="borderWidthIconNormal" errorText={errors.borderWidthIconNormal}>
              <Input
                type="number"
                placeholder="1.5px"
                value={config.borderWidthIconNormal || ''}
                onChange={({ detail }) => handleInputChange('borderWidthIconNormal', detail.value)}
              />
            </FormField>

            <FormField label="borderWidthIconMedium" errorText={errors.borderWidthIconMedium}>
              <Input
                type="number"
                placeholder="2px"
                value={config.borderWidthIconMedium || ''}
                onChange={({ detail }) => handleInputChange('borderWidthIconMedium', detail.value)}
              />
            </FormField>

            <FormField label="borderWidthIconBig" errorText={errors.borderWidthIconBig}>
              <Input
                type="number"
                placeholder="2px"
                value={config.borderWidthIconBig || ''}
                onChange={({ detail }) => handleInputChange('borderWidthIconBig', detail.value)}
              />
            </FormField>

            <FormField label="borderWidthIconLarge" errorText={errors.borderWidthIconLarge}>
              <Input
                type="number"
                placeholder="2.5px"
                value={config.borderWidthIconLarge || ''}
                onChange={({ detail }) => handleInputChange('borderWidthIconLarge', detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Box>

        <Box padding={{ bottom: 'l' }}>
          <Box variant="h3" padding={{ top: 'm' }}>
            Font related themes
          </Box>

          <SpaceBetween size="xs">
            <Box variant="h5" padding={{ top: 's' }}>
              Font family
            </Box>
            <FormField label="fontFamilyBase" errorText={errors.fontFamilyBase}>
              <Input
                type="text"
                placeholder="Arial, sans-serif"
                value={config.fontFamilyBase || ''}
                onChange={({ detail }) => handleInputChange('fontFamilyBase', detail.value)}
              />
            </FormField>

            <Box variant="h5" padding={{ top: 's' }}>
              H1
            </Box>
            <FormField label="fontSizeHeadingXl" errorText={errors.fontSizeHeadingXl}>
              <Input
                type="number"
                placeholder="26px"
                value={config.fontSizeHeadingXl || ''}
                onChange={({ detail }) => handleInputChange('fontSizeHeadingXl', detail.value)}
              />
            </FormField>

            <FormField label="lineHeightHeadingXl" errorText={errors.lineHeightHeadingXl}>
              <Input
                type="number"
                placeholder="32px"
                value={config.lineHeightHeadingXl || ''}
                onChange={({ detail }) => handleInputChange('lineHeightHeadingXl', detail.value)}
              />
            </FormField>

            <Box variant="h5" padding={{ top: 's' }}>
              H2
            </Box>
            <FormField label="fontSizeHeadingL" errorText={errors.fontSizeHeadingL}>
              <Input
                type="number"
                placeholder="22px"
                value={config.fontSizeHeadingL || ''}
                onChange={({ detail }) => handleInputChange('fontSizeHeadingL', detail.value)}
              />
            </FormField>

            <FormField label="lineHeightHeadingL" errorText={errors.lineHeightHeadingL}>
              <Input
                type="number"
                placeholder="26px"
                value={config.lineHeightHeadingL || ''}
                onChange={({ detail }) => handleInputChange('lineHeightHeadingL', detail.value)}
              />
            </FormField>

            <Box variant="h5" padding={{ top: 's' }}>
              H3
            </Box>
            <FormField label="fontSizeHeadingM" errorText={errors.fontSizeHeadingM}>
              <Input
                type="number"
                placeholder="20px"
                value={config.fontSizeHeadingM || ''}
                onChange={({ detail }) => handleInputChange('fontSizeHeadingM', detail.value)}
              />
            </FormField>

            <FormField label="lineHeightHeadingM" errorText={errors.lineHeightHeadingM}>
              <Input
                type="number"
                placeholder="24px"
                value={config.lineHeightHeadingM || ''}
                onChange={({ detail }) => handleInputChange('lineHeightHeadingM', detail.value)}
              />
            </FormField>

            <Box variant="h5" padding={{ top: 's' }}>
              H4
            </Box>
            <FormField label="fontSizeHeadingS" errorText={errors.fontSizeHeadingS}>
              <Input
                type="number"
                placeholder="18px"
                value={config.fontSizeHeadingS || ''}
                onChange={({ detail }) => handleInputChange('fontSizeHeadingS', detail.value)}
              />
            </FormField>

            <FormField label="lineHeightHeadingS" errorText={errors.lineHeightHeadingS}>
              <Input
                type="number"
                placeholder="22px"
                value={config.lineHeightHeadingS || ''}
                onChange={({ detail }) => handleInputChange('lineHeightHeadingS', detail.value)}
              />
            </FormField>

            <Box variant="h5" padding={{ top: 's' }}>
              H5
            </Box>
            <FormField label="fontSizeHeadingXs" errorText={errors.fontSizeHeadingXs}>
              <Input
                type="number"
                placeholder="16px"
                value={config.fontSizeHeadingXs || ''}
                onChange={({ detail }) => handleInputChange('fontSizeHeadingXs', detail.value)}
              />
            </FormField>

            <FormField label="lineHeightHeadingXs" errorText={errors.lineHeightHeadingXs}>
              <Input
                type="number"
                placeholder="20px"
                value={config.lineHeightHeadingXs || ''}
                onChange={({ detail }) => handleInputChange('lineHeightHeadingXs', detail.value)}
              />
            </FormField>
          </SpaceBetween>
        </Box>
        <Box padding={{ bottom: 'm' }}>
          <Box variant="h5">
            <FormField label="Filled flashbar">
              <Toggle
                onChange={({ detail }) => {
                  setChecked(detail.checked);
                }}
                checked={checked}
              >
                Filled flashbar
              </Toggle>
            </FormField>
          </Box>
        </Box>
      </ColumnLayout>

      <SpaceBetween direction="horizontal" size="xs">
        <Button onClick={applyThemeChanges} variant="primary">
          Apply Theme
        </Button>
        <Button onClick={resetTheme}>Reset to Default</Button>
      </SpaceBetween>
    </Box>
  );
}
