// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import DataProvider from '../commons/data-provider';
import { COLUMN_DEFINITIONS, DEFAULT_PREFERENCES, SEARCHABLE_COLUMNS, Preferences } from './table-date-filter-config';
import { Pagination, Table, Input, DateRangePicker } from '@cloudscape-design/components';
import { Breadcrumbs, FullPageHeader, ToolsContent } from './common-components';
import {
  CustomAppLayout,
  Navigation,
  Notifications,
  TableEmptyState,
  TableNoMatchState,
} from '../commons/common-components';
import { paginationLabels, distributionSelectionLabels } from '../../common/labels';
import { getFilterCounterText } from '../../common/tableCounterStrings';
import '../../styles/base.scss';
import '../../styles/table-date-filter.scss';
import { useColumnWidths } from '../commons/use-column-widths';
import { isWithinInterval, addHours, addSeconds, addMinutes, addWeeks, addMonths, addYears, addDays } from 'date-fns';
import { useLocalStorage } from '../../common/localStorage';

const differenceInDays = (dateOne, dateTwo) => {
  const milliseconds = Math.abs(new Date(dateTwo) - new Date(dateOne));
  const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));
  return days;
};

const lengthInDays = (unit, amount) => {
  switch (unit) {
    case 'second':
      return amount / (24 * 60 * 60);
    case 'minute':
      return amount / (24 * 60);
    case 'hour':
      return amount / 24;
    case 'day':
      return amount;
    case 'week':
      return amount * 7;
    case 'month':
      return amount * 30;
    case 'year':
      return amount * 365;
  }
};

const isValidRangeFunction = range => {
  if (range.type === 'absolute') {
    const [startDateWithoutTime] = range.startDate.split('T');
    const [endDateWithoutTime] = range.endDate.split('T');

    if (!startDateWithoutTime || !endDateWithoutTime) {
      return {
        valid: false,
        errorMessage: 'The selected date range is incomplete. Select a start and end date for the date range.',
      };
    }

    if (differenceInDays(range.startDate, range.endDate) >= 366) {
      return {
        valid: false,
        errorMessage: 'The selected date range is too large. Select a range up to one year.',
      };
    }

    if (differenceInDays(range.startDate, range.endDate) < 2) {
      return {
        valid: false,
        errorMessage: 'The selected date range is too small. Select a range larger than one day.',
      };
    }
  } else if (range.type === 'relative') {
    if (isNaN(range.amount)) {
      return {
        valid: false,
        errorMessage: 'The selected date range is incomplete. Specify a duration for the date range.',
      };
    }

    if (lengthInDays(range.unit, range.amount) < 2) {
      return {
        valid: false,
        errorMessage: 'The selected date range is too small. Select a range larger than one day.',
      };
    }

    if (lengthInDays(range.unit, range.amount) >= 366) {
      return {
        valid: false,
        errorMessage: 'The selected date range is too large. Select a range up to one year.',
      };
    }
  }
  return { valid: true };
};

function convertToAbsoluteRange(range) {
  if (range.type === 'absolute') {
    return {
      start: new Date(range.startDate),
      end: new Date(range.endDate),
    };
  } else {
    const now = new Date();
    const start = (() => {
      switch (range.unit) {
        case 'second':
          return addSeconds(now, -range.amount);
        case 'minute':
          return addMinutes(now, -range.amount);
        case 'hour':
          return addHours(now, -range.amount);
        case 'day':
          return addDays(now, -range.amount);
        case 'week':
          return addWeeks(now, -range.amount);
        case 'month':
          return addMonths(now, -range.amount);
        case 'year':
          return addYears(now, -range.amount);
      }
    })();
    return {
      start: start,
      end: now,
    };
  }
}

function TableContent({ distributions, updateTools }) {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableDateFilter-Widths', COLUMN_DEFINITIONS);
  const [preferences, setPreferences] = useLocalStorage('React-TableDateFilter-Preferences', DEFAULT_PREFERENCES);
  const [rangeFilter, setRangeFilter] = useState(null);
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(
    distributions,
    {
      filtering: {
        empty: <TableEmptyState resourceName="Distribution" />,
        noMatch: (
          <TableNoMatchState
            onClearFilter={() => {
              actions.setFiltering('');
              setRangeFilter(null);
            }}
          />
        ),
        filteringFunction: (item, filteringText) => {
          if (rangeFilter !== null) {
            const range = convertToAbsoluteRange(rangeFilter);
            if (!isWithinInterval(new Date(item.date), range)) {
              return false;
            }
          }

          const filteringTextLowerCase = filteringText.toLowerCase();

          return SEARCHABLE_COLUMNS.map(key => item[key]).some(
            value => typeof value === 'string' && value.toLowerCase().indexOf(filteringTextLowerCase) > -1
          );
        },
      },
      pagination: { pageSize: preferences.pageSize },
      sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
      selection: {},
    }
  );

  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      visibleColumns={preferences.visibleContent}
      items={items}
      selectionType="multi"
      ariaLabels={distributionSelectionLabels}
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      header={
        <FullPageHeader
          selectedItems={collectionProps.selectedItems}
          totalItems={distributions}
          updateTools={updateTools}
        />
      }
      filter={
        <div className="filter-container">
          <div className="input-filter">
            <Input
              type="search"
              value={filterProps.filteringText}
              onChange={event => {
                actions.setFiltering(event.detail.value);
              }}
              ariaLabel="Filter distributions"
              placeholder="Find distributions"
              ariaDescribedby={null}
            />
          </div>

          <DateRangePicker
            i18nStrings={dateRangeFilterI18nStrings}
            value={rangeFilter}
            onChange={e => setRangeFilter(e.detail.value)}
            placeholder="Filter by a date and time range"
            className="date-range-filter"
            isValidRange={isValidRangeFunction}
            relativeOptions={[
              {
                type: 'relative',
                amount: 1,
                unit: 'month',
                key: 'one-month',
              },
              {
                type: 'relative',
                amount: 6,
                unit: 'month',
                key: 'six-months',
              },
              {
                type: 'relative',
                amount: 1,
                unit: 'year',
                key: 'one-year',
              },
            ]}
            expandToViewport={true}
          />

          {(filterProps.filteringText || rangeFilter) && (
            <span className="filtering-results">{getFilterCounterText(filteredItemsCount)}</span>
          )}
        </div>
      }
      pagination={<Pagination {...paginationProps} ariaLabels={paginationLabels} />}
      preferences={<Preferences preferences={preferences} setPreferences={setPreferences} />}
    />
  );
}

function App({ distributions }) {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <CustomAppLayout
      navigation={<Navigation activeHref="#/distributions" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={<TableContent distributions={distributions} updateTools={() => setToolsOpen(true)} />}
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      stickyNotifications
    />
  );
}

const root = createRoot(document.getElementById('app'));
new DataProvider().getData('distributions').then(distributions => {
  root.render(<App distributions={distributions} />);
});

function formatRelativeRange(range) {
  const unit = range.amount === 1 ? range.unit : `${range.unit}s`;
  return `Last ${range.amount} ${unit}`;
}

const dateRangeFilterI18nStrings = {
  todayAriaLabel: 'Today',
  nextMonthAriaLabel: 'Next month',
  previousMonthAriaLabel: 'Previous month',
  customRelativeRangeDurationLabel: 'Duration',
  customRelativeRangeDurationPlaceholder: 'Enter duration',
  customRelativeRangeOptionLabel: 'Custom duration',
  customRelativeRangeOptionDescription: 'Set a custom range in the past',
  customRelativeRangeUnitLabel: 'Unit of time',
  formatUnit: (unit, value) => (value === 1 ? unit : `${unit}s`),
  formatRelativeRange: formatRelativeRange,
  dateTimeConstraintText: '',
  relativeModeTitle: 'Relative range',
  absoluteModeTitle: 'Absolute range',
  relativeRangeSelectionHeading: 'Choose a range',
  startDateLabel: 'Start date',
  endDateLabel: 'End date',
  startTimeLabel: 'Start time',
  endTimeLabel: 'End time',
  clearButtonLabel: 'Clear and dismiss',
  cancelButtonLabel: 'Cancel',
  applyButtonLabel: 'Apply',
};
