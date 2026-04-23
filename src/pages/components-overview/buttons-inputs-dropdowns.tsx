// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import ButtonGroup from '@cloudscape-design/components/button-group';
import DatePicker from '@cloudscape-design/components/date-picker';
import DateRangePicker, { DateRangePickerProps } from '@cloudscape-design/components/date-range-picker';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import Grid from '@cloudscape-design/components/grid';
import Multiselect, { MultiselectProps } from '@cloudscape-design/components/multiselect';
import PropertyFilter, { PropertyFilterProps } from '@cloudscape-design/components/property-filter';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import SpaceBetween from '@cloudscape-design/components/space-between';
import ToggleButton from '@cloudscape-design/components/toggle-button';

import { generateDropdownOptions } from './component-data';
import { Section } from './utils';

function Buttons() {
  const [selectedSegment, setSelectedSegment] = useState('seg-1');
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(true);
  const [toggle5, setToggle5] = useState(false);
  const [toggle6, setToggle6] = useState(true);

  return (
    <SpaceBetween size="l">
      <SpaceBetween direction="horizontal" size="m" alignItems="center">
        <Button variant="primary">Primary button</Button>
        <Button variant="normal">Secondary button</Button>
        <Button iconName="refresh" ariaLabel="Icon in normal button" />
        <Button variant="link">Tertiary button</Button>
      </SpaceBetween>
      <SpaceBetween direction="horizontal" size="m" alignItems="center">
        <Button variant="primary" disabled={true}>
          Primary button
        </Button>
        <Button variant="normal" disabled={true}>
          Secondary button
        </Button>
        <Button iconName="refresh" disabled={true} ariaLabel="Disabled refresh button" />
        <Button variant="link" disabled={true}>
          Tertiary button
        </Button>
      </SpaceBetween>
      <SpaceBetween direction="horizontal" size="m" alignItems="center">
        <Button variant="inline-icon" iconName="copy" ariaLabel="Inline icon button" />
        <Button variant="icon" iconName="add-plus" ariaLabel="Icon button" />
        <ButtonGroup
          ariaLabel="Button group"
          items={[
            {
              type: 'icon-button',
              id: 'copy',
              iconName: 'upload',
              text: 'Upload files',
            },
            {
              type: 'icon-button',
              id: 'expand',
              iconName: 'expand',
              text: 'Go full page',
            },
          ]}
          variant="icon"
        />
      </SpaceBetween>
      <SpaceBetween direction="horizontal" size="m" alignItems="center">
        <ToggleButton
          onChange={({ detail }) => setToggle1(detail.pressed)}
          pressed={toggle1}
          iconName="star"
          pressedIconName="star-filled"
        >
          Toggle button
        </ToggleButton>
        <ToggleButton
          onChange={({ detail }) => setToggle2(detail.pressed)}
          pressed={toggle2}
          iconName="star"
          pressedIconName="star-filled"
        >
          Toggle button
        </ToggleButton>
        <ToggleButton
          onChange={({ detail }) => setToggle3(detail.pressed)}
          pressed={toggle3}
          iconName="star"
          pressedIconName="star-filled"
          ariaLabel="Toggle button"
        />
        <ToggleButton
          onChange={({ detail }) => setToggle4(detail.pressed)}
          pressed={toggle4}
          iconName="star"
          pressedIconName="star-filled"
          ariaLabel="Toggle button pressed"
        />
        <ToggleButton
          variant="icon"
          onChange={({ detail }) => setToggle5(detail.pressed)}
          pressed={toggle5}
          iconName="star"
          pressedIconName="star-filled"
          ariaLabel="Toggle button icon"
        />
        <ToggleButton
          variant="icon"
          onChange={({ detail }) => setToggle6(detail.pressed)}
          pressed={toggle6}
          iconName="star"
          pressedIconName="star-filled"
          ariaLabel="Toggle button icon pressed"
        />
      </SpaceBetween>
      <SpaceBetween direction="horizontal" size="m" alignItems="center">
        <ToggleButton pressed={true} iconName="star" pressedIconName="star-filled" disabled={true}>
          Toggle button
        </ToggleButton>
        <ToggleButton pressed={false} iconName="star" pressedIconName="star-filled" disabled={true}>
          Toggle button
        </ToggleButton>
        <ToggleButton
          pressed={false}
          iconName="star"
          pressedIconName="star-filled"
          disabled={true}
          ariaLabel="Toggle button disabled"
        />
        <ToggleButton
          pressed={true}
          iconName="star"
          pressedIconName="star-filled"
          disabled={true}
          ariaLabel="Toggle button disabled pressed"
        />
        <ToggleButton
          variant="icon"
          pressed={false}
          iconName="star"
          pressedIconName="star-filled"
          disabled={true}
          ariaLabel="Toggle button icon disabled"
        />
        <ToggleButton
          variant="icon"
          pressed={true}
          iconName="star"
          pressedIconName="star-filled"
          disabled={true}
          ariaLabel="Toggle button icon disabled pressed"
        />
      </SpaceBetween>
      <SegmentedControl
        selectedId={selectedSegment}
        onChange={({ detail }) => setSelectedSegment(detail.selectedId)}
        label="Default segmented control"
        options={[
          { text: 'Segment 1', id: 'seg-1' },
          { text: 'Segment 2', id: 'seg-2' },
          { text: 'Segment 3', id: 'seg-3' },
        ]}
      />
    </SpaceBetween>
  );
}

function Inputs() {
  const multiSelectOptions = generateDropdownOptions() as MultiselectProps.Options;
  const [selectedItems, setSelectedItems] = useState([
    multiSelectOptions[1],
    multiSelectOptions[3],
  ] as MultiselectProps.Options);
  const [dateValue, setDateValue] = useState('2018-01-02');
  const [dateRangeValue, setDateRangeValue] = useState<DateRangePickerProps['value']>(null);

  return (
    <Grid>
      <SpaceBetween size="s" direction="horizontal">
        <Multiselect
          options={multiSelectOptions}
          placeholder="Multiselect"
          selectedOptions={selectedItems}
          onChange={({ detail }) => setSelectedItems(detail.selectedOptions)}
        />
        <Multiselect disabled={true} placeholder="Disabled multi-select" selectedOptions={selectedItems} />
        <Multiselect readOnly={true} placeholder="Read-only multi-select" selectedOptions={selectedItems} />
      </SpaceBetween>
      <SpaceBetween direction="horizontal" size="l">
        <DatePicker
          value={dateValue}
          placeholder="Datepicker"
          openCalendarAriaLabel={() => 'Open calendar'}
          onChange={({ detail }) => {
            setDateValue(detail.value);
          }}
        />
        <DateRangePicker
          value={dateRangeValue}
          onChange={({ detail }) => setDateRangeValue(detail.value)}
          relativeOptions={[
            { key: 'previous-5-minutes', amount: 5, unit: 'minute', type: 'relative' },
            { key: 'previous-30-minutes', amount: 30, unit: 'minute', type: 'relative' },
            { key: 'previous-1-hour', amount: 1, unit: 'hour', type: 'relative' },
            { key: 'previous-6-hours', amount: 6, unit: 'hour', type: 'relative' },
          ]}
          isValidRange={range => {
            if (range?.type === 'absolute') {
              const [startDateWithoutTime] = range.startDate.split('T');
              const [endDateWithoutTime] = range.endDate.split('T');
              if (!startDateWithoutTime || !endDateWithoutTime) {
                return {
                  valid: false,
                  errorMessage:
                    'The selected date range is incomplete. Select a start and end date for the date range.',
                };
              }
            }
            return { valid: true };
          }}
          i18nStrings={{}}
          placeholder="Filter by a date and time range"
        />
      </SpaceBetween>
      <SpaceBetween size="xl" direction="horizontal">
        <SpaceBetween size="s">
          <ExpandableSection variant="footer" headerText="Expandable section">
            Expanded
          </ExpandableSection>
        </SpaceBetween>
      </SpaceBetween>
    </Grid>
  );
}

export default function ButtonsInputsDropdowns() {
  const [query, setQuery] = React.useState<PropertyFilterProps.Query>({
    tokens: [],
    operation: 'and',
  });
  return (
    <Section header="Buttons, inputs, and dropdowns">
      <SpaceBetween size="l">
        <Grid gridDefinition={[{ colspan: { default: 12, xxs: 6 } }, { colspan: { default: 12, xxs: 6 } }]}>
          <Buttons />
          <Inputs />
        </Grid>
        <PropertyFilter
          query={query}
          onChange={({ detail }) => setQuery(detail)}
          countText="5 matches"
          enableTokenGroups
          expandToViewport
          filteringAriaLabel="Find distributions"
          filteringOptions={[
            {
              propertyKey: 'instanceid',
              value: 'i-2dc5ce28a0328391',
            },
            {
              propertyKey: 'instanceid',
              value: 'i-d0312e022392efa0',
            },
            {
              propertyKey: 'instanceid',
              value: 'i-070eef935c1301e6',
            },
            {
              propertyKey: 'instanceid',
              value: 'i-3b44795b1fea36ac',
            },
            { propertyKey: 'state', value: 'Stopped' },
            { propertyKey: 'state', value: 'Stopping' },
            { propertyKey: 'state', value: 'Pending' },
            { propertyKey: 'state', value: 'Running' },
            {
              propertyKey: 'instancetype',
              value: 't3.small',
            },
            {
              propertyKey: 'instancetype',
              value: 't2.small',
            },
            { propertyKey: 'instancetype', value: 't3.nano' },
            {
              propertyKey: 'instancetype',
              value: 't2.medium',
            },
            {
              propertyKey: 'instancetype',
              value: 't3.medium',
            },
            {
              propertyKey: 'instancetype',
              value: 't2.large',
            },
            { propertyKey: 'instancetype', value: 't2.nano' },
            {
              propertyKey: 'instancetype',
              value: 't2.micro',
            },
            {
              propertyKey: 'instancetype',
              value: 't3.large',
            },
            {
              propertyKey: 'instancetype',
              value: 't3.micro',
            },
            { propertyKey: 'averagelatency', value: '17' },
            { propertyKey: 'averagelatency', value: '53' },
            { propertyKey: 'averagelatency', value: '73' },
            { propertyKey: 'averagelatency', value: '74' },
            { propertyKey: 'averagelatency', value: '107' },
            { propertyKey: 'averagelatency', value: '236' },
            { propertyKey: 'averagelatency', value: '242' },
            { propertyKey: 'averagelatency', value: '375' },
            { propertyKey: 'averagelatency', value: '402' },
            { propertyKey: 'averagelatency', value: '636' },
            { propertyKey: 'averagelatency', value: '639' },
            { propertyKey: 'averagelatency', value: '743' },
            { propertyKey: 'averagelatency', value: '835' },
            { propertyKey: 'averagelatency', value: '981' },
            { propertyKey: 'averagelatency', value: '995' },
          ]}
          filteringPlaceholder="Find distributions"
          filteringProperties={[
            {
              key: 'instanceid',
              operators: ['=', '!=', ':', '!:', '^', '!^'],
              propertyLabel: 'Instance ID',
              groupValuesLabel: 'Instance ID values',
            },
            {
              key: 'state',
              operators: [
                { operator: '=', tokenType: 'enum' },
                { operator: '!=', tokenType: 'enum' },
                ':',
                '!:',
                '^',
                '!^',
              ],
              propertyLabel: 'State',
              groupValuesLabel: 'State values',
            },
            {
              key: 'instancetype',
              operators: [
                { operator: '=', tokenType: 'enum' },
                { operator: '!=', tokenType: 'enum' },
                ':',
                '!:',
                '^',
                '!^',
              ],
              propertyLabel: 'Instance type',
              groupValuesLabel: 'Instance type values',
            },
            {
              key: 'averagelatency',
              operators: ['=', '!=', '>', '<', '<=', '>='],
              propertyLabel: 'Average latency',
              groupValuesLabel: 'Average latency values',
            },
          ]}
        />
      </SpaceBetween>
    </Section>
  );
}
