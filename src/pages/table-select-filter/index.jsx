// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCollection } from '@cloudscape-design/collection-hooks';
import { COLUMN_DEFINITIONS, SEARCHABLE_COLUMNS, CONTENT_DISPLAY_OPTIONS } from './table-select-filter-config';
import { Preferences } from '../commons/table-config';
import { Button, Input, FormField, Pagination, SpaceBetween, Select, Table } from '@cloudscape-design/components';
import { Navigation, Breadcrumbs, ToolsContent } from './table-select-filter-components';
import '../../styles/table-select.scss';
import DATA from '../../resources/instances';
import { getTextFilterCounterText, getHeaderCounterText, renderAriaLive } from '../../i18n-strings';
import { CustomAppLayout, Notifications, TableEmptyState, TableNoMatchState } from '../commons/common-components';
import { FullPageHeader } from '../commons';
import { useColumnWidths } from '../commons/use-column-widths';
import { useLocalStorage } from '../commons/use-local-storage';

const defaultEngine = { value: '0', label: 'Any Engine' };
const defaultClass = { value: '0', label: 'Any Class' };
const selectEngineOptions = prepareSelectOptions('engine', defaultEngine);
const selectClassOptions = prepareSelectOptions('class', defaultClass);

function prepareSelectOptions(field, defaultOption) {
  const optionSet = [];
  // Building a non redundant list of the field passed as parameter.

  DATA.forEach(item => {
    if (optionSet.indexOf(item[field]) === -1) {
      optionSet.push(item[field]);
    }
  });
  optionSet.sort();

  // The first element is the default one.
  const options = [defaultOption];

  // Adding the other element ot the list.
  optionSet.forEach((item, index) => options.push({ label: item, value: (index + 1).toString() }));
  return options;
}

function matchesEngine(item, selectedEngine) {
  return selectedEngine === defaultEngine || item.engine === selectedEngine.label;
}

function matchesClass(item, selectedClass) {
  return selectedClass === defaultClass || item.class === selectedClass.label;
}

function TableSelectFilter({ loadHelpPanelContent }) {
  const [columnDefinitions, saveWidths] = useColumnWidths('React-TableSelectFilter-Widths', COLUMN_DEFINITIONS);
  const [engine, setEngine] = useState(defaultEngine);
  const [instanceClass, setInstanceClass] = useState(defaultClass);
  const [preferences, setPreferences] = useLocalStorage('React-TableSelectFilter-Preferences', {
    pageSize: 30,
    contentDisplay: [
      { id: 'id', visible: true },
      { id: 'engine', visible: true },
      { id: 'version', visible: true },
      { id: 'status', visible: true },
      { id: 'activity', visible: true },
      { id: 'maint', visible: false },
      { id: 'class', visible: true },
      { id: 'zone', visible: false },
      { id: 'iops', visible: false },
    ],
    wrapLines: false,
    stripedRows: false,
    contentDensity: 'comfortable',
    custom: 'table',
  });
  const { items, actions, filteredItemsCount, collectionProps, filterProps, paginationProps } = useCollection(DATA, {
    filtering: {
      empty: <TableEmptyState resourceName="Instance" />,
      noMatch: <TableNoMatchState onClearFilter={clearFilter} />,
      filteringFunction: (item, filteringText) => {
        if (!matchesEngine(item, engine)) {
          return false;
        }
        if (!matchesClass(item, instanceClass)) {
          return false;
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
  });
  useLayoutEffect(() => {
    collectionProps.ref.current?.scrollToTop();
  }, [instanceClass, engine, collectionProps.ref, filterProps.filteringText]);

  function clearFilter() {
    actions.setFiltering('');
    setEngine(defaultEngine);
    setInstanceClass(defaultClass);
  }

  return (
    <Table
      {...collectionProps}
      columnDefinitions={columnDefinitions}
      columnDisplay={preferences.contentDisplay}
      items={items}
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      onColumnWidthsChange={saveWidths}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      selectionType="single"
      ariaLabels={{
        itemSelectionLabel: (data, row) => `Select DB instance ${row.id}`,
        allItemsSelectionLabel: () => 'Select all DB instances',
        selectionGroupLabel: 'Instances selection',
      }}
      renderAriaLive={renderAriaLive}
      header={
        <FullPageHeader
          title="Instances"
          selectedItemsCount={collectionProps.selectedItems.length}
          counter={getHeaderCounterText(DATA, collectionProps.selectedItems)}
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled={collectionProps.selectedItems.length === 0}>Instance actions</Button>
              <Button>Restore from S3</Button>
              <Button variant="primary">Launch DB instance</Button>
            </SpaceBetween>
          }
          onInfoLinkClick={loadHelpPanelContent}
        />
      }
      filter={
        <div className="input-container">
          <div className="input-filter">
            <Input
              data-testid="input-filter"
              type="search"
              value={filterProps.filteringText}
              onChange={event => {
                actions.setFiltering(event.detail.value);
              }}
              ariaLabel="Find instances"
              placeholder="Find instances"
              clearAriaLabel="clear"
              ariaDescribedby={null}
            />
          </div>
          <div className="select-filter">
            <FormField label="Filter engine">
              <Select
                data-testid="engine-filter"
                options={selectEngineOptions}
                selectedAriaLabel="Selected"
                selectedOption={engine}
                onChange={event => {
                  setEngine(event.detail.selectedOption);
                }}
                ariaDescribedby={null}
                expandToViewport={true}
              />
            </FormField>
          </div>
          <div className="select-filter">
            <FormField label="Filter class">
              <Select
                data-testid="class-filter"
                options={selectClassOptions}
                selectedAriaLabel="Selected"
                selectedOption={instanceClass}
                onChange={event => {
                  setInstanceClass(event.detail.selectedOption);
                }}
                ariaDescribedby={null}
                expandToViewport={true}
              />
            </FormField>
          </div>
          <div aria-live="polite">
            {(filterProps.filteringText || engine !== defaultEngine || instanceClass !== defaultClass) && (
              <span className="filtering-results">{getTextFilterCounterText(filteredItemsCount)}</span>
            )}
          </div>
        </div>
      }
      pagination={<Pagination {...paginationProps} />}
      preferences={
        <Preferences
          preferences={preferences}
          setPreferences={setPreferences}
          contentDisplayOptions={CONTENT_DISPLAY_OPTIONS}
        />
      }
    />
  );
}

function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();

  return (
    <CustomAppLayout
      ref={appLayout}
      navigation={<Navigation activeHref="#/instances" />}
      notifications={<Notifications successNotification={true} />}
      breadcrumbs={<Breadcrumbs />}
      content={
        <TableSelectFilter
          loadHelpPanelContent={() => {
            setToolsOpen(true);
            appLayout.current?.focusToolsClose();
          }}
        />
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
    />
  );
}

createRoot(document.getElementById('app')).render(<App />);
