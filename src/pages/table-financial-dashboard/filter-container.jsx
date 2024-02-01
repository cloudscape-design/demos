// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Container,
  Header,
  SpaceBetween,
  FormField,
  Box,
  Grid,
  RadioGroup,
  Select,
  Button,
} from '@cloudscape-design/components';
import '../../styles/base.scss';
import DateRangePicker from './date-range-picker';

function FilterContainer() {
  const [radioValue, setRadioValue] = React.useState('second');
  const [displayedColumns, setDisplayedColumns] = React.useState({ label: 'Customers', value: '1' });
  const [activeCells, setActiveCells] = React.useState({ label: 'Active rows / active columns', value: '1' });
  const [comparisonPeriod, setComparisonPeriod] = React.useState({ label: 'None', value: '1' });

  return (
    <Container
      header={
        <Header
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button>Customize</Button>
              <Button variant="primary">Save customization</Button>
            </SpaceBetween>
          }
        >
          Profit and Loss by Customer Report
        </Header>
      }
    >
      <Grid
        gridDefinition={[
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
        ]}
      >
        <FormField label="Report period">
          <DateRangePicker />
        </FormField>
      </Grid>
      <Grid
        gridDefinition={[
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
          { colspan: { default: 6, xs: 3 } },
        ]}
      >
        <FormField label="Display columns by">
          <Select
            selectedOption={displayedColumns}
            onChange={({ detail }) => setDisplayedColumns(detail.selectedOption)}
            options={[
              { label: 'Customers', value: '1' },
              { label: 'Services', value: '2' },
            ]}
            selectedAriaLabel="Selected"
          />
        </FormField>
        <FormField label="Show non-zero or active only">
          <Select
            selectedOption={activeCells}
            onChange={({ detail }) => setActiveCells(detail.selectedOption)}
            options={[
              { label: 'Active rows / active columns', value: '1' },
              { label: 'Active rows only', value: '2' },
              { label: 'Active columns only', value: '3' },
              { label: 'Show all', value: '4' },
            ]}
            selectedAriaLabel="Selected"
          />
        </FormField>
        <FormField label="Compare another period">
          <Select
            selectedOption={comparisonPeriod}
            onChange={({ detail }) => setComparisonPeriod(detail.selectedOption)}
            options={[
              { label: 'None', value: '1' },
              { label: 'Last month', value: '2' },
              { label: 'Last quarter', value: '3' },
              { label: 'Last year', value: '4' },
            ]}
            selectedAriaLabel="Selected"
          />
        </FormField>
        <FormField label="Accounting method">
          <RadioGroup
            onChange={({ detail }) => setRadioValue(detail.value)}
            value={radioValue}
            items={[
              { value: 'first', label: 'Cash' },
              { value: 'second', label: 'Accrual' },
            ]}
          />
        </FormField>
      </Grid>
      <Box textAlign="right">
        <Button variant="primary">Run report</Button>
      </Box>
    </Container>
  );
}

export default FilterContainer;
