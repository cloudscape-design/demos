// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import { applyTheme } from '@cloudscape-design/components/theming';

import customTheme from '../../common/theme-definition';
applyTheme({ theme: customTheme });
import {
  AppLayout,
  AttributeEditor,
  Badge,
  Box,
  ContentLayout,
  DatePicker,
  FormField,
  Header,
  Icon,
  Input,
  Link,
  Pagination,
  Select,
  SpaceBetween,
  Table,
  Tabs,
} from '@cloudscape-design/components';
import Button from '@cloudscape-design/components/button';

import anonymousAvatar from '../commons/avatar-a.png';
import headerGradientImageDark from '../commons/bg-gradient-purple-dark.png';
import headerGradientImageLight from '../commons/bg-gradient-purple-light.png';
import { SideContent } from '../commons/common-components';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import { HeroHeader } from './hero-header';

import '../../styles/product-page.scss';

interface Item {
  name: JSX.Element | string;
  alt: JSX.Element | string;
  description: string;
  type: string;
  size?: string;
  comments?: string;
  ideator?: JSX.Element | string;
  date?: string;
}

interface ColumnDefinition {
  id: string;
  header: string;
  cell: (item: Item) => JSX.Element | string;
  sortingField?: string;
  isRowHeader?: boolean;
}

interface ColumnDisplay {
  id: string;
  visible: boolean;
}

function Ideator() {
  return (
    <div
      style={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: `28px 1fr`,
        gridTemplateRows: '1fr',
        gridColumnGap: 12,
      }}
    >
      <img src={anonymousAvatar} width="28" height="28" />
      <Box variant="p" color="text-body-secondary">
        johndoe
      </Box>
    </div>
  );
}

const CustomTable: React.FC = () => {
  const [selectedItems] = React.useState<Item[]>([
    { name: 'Item 2', alt: 'Second', description: '27', type: '1B', comments: 'Large' },
  ]);
  const [sortingColumn, setSortingColumn] = useState<{ sortingField?: string }>({
    sortingField: 'name',
  });
  const [sortingDescending, setSortingDescending] = useState(false);

  return (
    <Table
      columnDefinitions={
        [
          {
            id: 'variable',
            header: 'Suggested idea',
            cell: (item: Item) => item.name,
            sortingField: 'name',
            isRowHeader: true,
          },
          {
            id: 'ideator',
            header: 'Ideator',
            cell: (item: Item) => item.ideator,
            sortingField: 'ideator',
            isRowHeader: true,
          },
          {
            id: 'date',
            header: 'Published',
            cell: (item: Item) => item.date,
            sortingField: 'date',
            isRowHeader: true,
          },
          {
            id: 'value',
            header: 'Status',
            cell: (item: Item) => item.alt,
            sortingField: 'alt',
          },
          {
            id: 'type',
            header: (
              <SpaceBetween direction="horizontal" size="xs">
                <>Liked</>
                <Icon name="thumbs-up" />
              </SpaceBetween>
            ),
            cell: (item: Item) => item.type,
            sortingField: 'type',
          },
          {
            id: 'description',
            header: (
              <SpaceBetween direction="horizontal" size="xs">
                <>Views</>
                <Icon name="multiscreen" />
              </SpaceBetween>
            ),
            cell: (item: Item) => item.description,
            sortingField: 'description',
          },
          {
            id: 'comments',
            header: (
              <SpaceBetween direction="horizontal" size="xs">
                <>Comments</>
                <Icon name="contact" />
              </SpaceBetween>
            ),
            cell: (item: Item) => item.comments,
            sortingField: 'comments',
          },
        ] as ColumnDefinition[]
      }
      columnDisplay={
        [
          { id: 'variable', visible: true },
          { id: 'ideator', visible: true },
          { id: 'date', visible: true },
          { id: 'value', visible: true },
          { id: 'type', visible: true },
          { id: 'description', visible: true },
          { id: 'comments', visible: true },
        ] as ColumnDisplay[]
      }
      enableKeyboardNavigation
      items={
        [
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: '5 hours ago',
            alt: <Badge color="severity-neutral">Neutral</Badge>,
            description: '27',
            type: '125',
            comments: '36',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Model compatibility
              </Link>
            ),
            ideator: <Ideator />,
            date: '5 hours ago',
            alt: <Badge color="severity-low">Delivered</Badge>,
            description: '27',
            type: '115',
            comments: '42',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: '7 hours ago',
            alt: <Badge color="severity-neutral">Neutral</Badge>,
            description: '36',
            type: '134',
            comments: '21',
          },
          {
            name: (
              <Link href="#" variant="primary">
                AWSome Quiz
              </Link>
            ),
            ideator: <Ideator />,
            date: '10 hours ago',
            alt: <Badge color="severity-medium">Investigating</Badge>,
            description: '34',
            type: '125',
            comments: '12',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Container
              </Link>
            ),
            ideator: <Ideator />,
            date: '12 hours ago',
            alt: <Badge color="severity-low">Delivered</Badge>,
            description: '56',
            type: '132',
            comments: '21',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Effective deployment
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 12, 2025',
            alt: <Badge color="severity-neutral">Neutral</Badge>,
            description: '32',
            type: '124',
            comments: '15',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 13, 2025',
            alt: <Badge color="severity-neutral">Neutral</Badge>,
            description: '14',
            type: '125',
            comments: '6',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 13, 2025',
            alt: <Badge color="severity-low">Delivered</Badge>,
            description: '51',
            type: '115',
            comments: '4',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 15, 2025',
            alt: <Badge color="severity-neutral">Neutral</Badge>,
            description: '2',
            type: '134',
            comments: '26',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 20, 2025',
            alt: <Badge color="severity-medium">Investigating</Badge>,
            description: '21',
            type: '125',
            comments: '42',
          },
          {
            name: (
              <Link href="#" variant="primary">
                Serverless: Alarms
              </Link>
            ),
            ideator: <Ideator />,
            date: 'May 21, 2025',
            alt: <Badge color="severity-low">Delivered</Badge>,
            description: '31',
            type: '132',
            comments: '31',
          },
        ] as Item[]
      }
      sortingColumn={sortingColumn}
      sortingDescending={sortingDescending}
      onSortingChange={event => {
        setSortingColumn(event.detail.sortingColumn);
        setSortingDescending(event.detail.isDescending ?? false);
      }}
      trackBy="name"
      variant="embedded"
      filter={
        <div
          style={{ display: 'grid', gridTemplateColumns: `repeat(5, 1fr)`, gridColumnGap: '8px', alignItems: 'end' }}
        >
          <div className="input-filter">
            <Input
              data-testid="input-filter"
              type="search"
              ariaLabel="Find instances"
              placeholder="Search ideas"
              clearAriaLabel="clear"
              value={''}
            />
          </div>
          <div className="select-filter">
            <Select
              data-testid="engine-filter"
              inlineLabelText="AWS services"
              selectedAriaLabel="Selected"
              selectedOption={null}
            />
          </div>
          <div className="select-filter">
            <Select
              inlineLabelText="Status"
              data-testid="class-filter"
              selectedAriaLabel="Selected"
              selectedOption={null}
            />
          </div>
        </div>
      }
      header={<Header counter={selectedItems.length ? `(${selectedItems.length}/10)` : '(10)'}>Product ideas</Header>}
      pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
    />
  );
};

function CustomAttributeEditor() {
  const [items, setItems] = React.useState([
    { key: 'some-key-1', value: 'some-value-1' },
    { key: 'some-key-2', value: 'some-value-2' },
  ]);
  const [value, setValue] = React.useState('');
  return (
    <SpaceBetween size="l">
      <AttributeEditor
        removeButtonText="Remove"
        onAddButtonClick={() => setItems([...items, { key: '', value: '' }])}
        onRemoveButtonClick={({ detail: { itemIndex } }) => {
          const tmpItems = [...items];
          tmpItems.splice(itemIndex, 1);
          setItems(tmpItems);
        }}
        items={items}
        addButtonText="Add new item"
        definition={[
          {
            label: 'Key',
            control: item => <Input value={item.key} placeholder="Enter key" />,
          },
          {
            label: 'Value',
            control: item => <Input value={item.value} placeholder="Enter value" />,
          },
        ]}
        empty="No items associated with the resource."
      />
      <FormField label="Certificate expiry" constraintText="Use YYYY/MM/DD format.">
        <DatePicker
          onChange={({ detail }) => setValue(detail.value)}
          value={value}
          openCalendarAriaLabel={selectedDate =>
            'Choose certificate expiry date' + (selectedDate ? `, selected date is ${selectedDate}` : '')
          }
          placeholder="YYYY/MM/DD"
        />
      </FormField>
    </SpaceBetween>
  );
}

function ShareAnIdea() {
  return (
    <Tabs
      className="custom-style-tabs"
      tabs={[
        {
          label: 'All ideas',
          id: 'first',
          content: (
            <Box margin={{ top: 'xxl' }}>
              <CustomTable />
            </Box>
          ),
        },
        {
          label: 'My ideas',
          id: 'second',
          content: (
            <Box margin={{ top: 'xxl' }}>
              <CustomAttributeEditor />
            </Box>
          ),
        },
      ]}
    />
  );
}

export function CustomNavBar() {
  const [value, setValue] = React.useState('');
  return (
    <Box margin={{ bottom: 'xs', horizontal: 'xxs' }}>
      <div className="nav-grid-wrapper">
        <div className="header-logo-wrapper">
          <a href="#">
            <svg
              className="service-logo"
              width="102"
              height="30"
              viewBox="0 0 102 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.729 12.5067C13.729 13.0737 13.7886 13.5334 13.8927 13.8706C14.0118 14.2077 14.1606 14.5755 14.369 14.9739C14.4434 15.0965 14.4731 15.2191 14.4731 15.3264C14.4731 15.4796 14.3838 15.6329 14.1904 15.7861L13.2528 16.4297C13.1189 16.5217 12.9849 16.5676 12.8659 16.5676C12.717 16.5676 12.5682 16.491 12.4194 16.3531C12.2111 16.1232 12.0325 15.878 11.8836 15.6329C11.7348 15.3723 11.586 15.0812 11.4223 14.7287C10.2615 16.1386 8.80304 16.8435 7.04694 16.8435C5.79684 16.8435 4.79974 16.4757 4.07051 15.7401C3.34129 15.0046 2.96924 14.0238 2.96924 12.7979C2.96924 11.4953 3.4157 10.4379 4.32351 9.64108C5.23132 8.84423 6.43678 8.4458 7.96964 8.4458C8.47563 8.4458 8.99651 8.49177 9.54715 8.56839C10.0978 8.64501 10.6633 8.7676 11.2586 8.90552V7.78685C11.2586 6.62221 11.0205 5.81003 10.5591 5.33498C10.0829 4.85993 9.27927 4.63007 8.13334 4.63007C7.61247 4.63007 7.07671 4.69136 6.52607 4.82928C5.97543 4.9672 5.43967 5.13577 4.9188 5.3503C4.68068 5.45757 4.5021 5.51887 4.39792 5.54952C4.29375 5.58017 4.21934 5.59549 4.15981 5.59549C3.95146 5.59549 3.84728 5.44225 3.84728 5.12044V4.36955C3.84728 4.12437 3.87705 3.94048 3.95146 3.83321C4.02587 3.72594 4.15981 3.61867 4.36816 3.5114C4.88903 3.23556 5.51408 3.0057 6.24331 2.82181C6.97253 2.62259 7.74641 2.53065 8.56492 2.53065C10.3359 2.53065 11.6306 2.9444 12.464 3.77191C13.2826 4.59942 13.6993 5.856 13.6993 7.54167V12.5067H13.729ZM7.68688 14.836C8.17799 14.836 8.68398 14.744 9.21974 14.5602C9.7555 14.3763 10.2317 14.0391 10.6335 13.5794C10.8717 13.2882 11.0502 12.9664 11.1395 12.5987C11.2288 12.2309 11.2884 11.7865 11.2884 11.2655V10.6218C10.8568 10.5146 10.3954 10.4226 9.9192 10.3613C9.44297 10.3 8.98162 10.2694 8.52028 10.2694C7.52317 10.2694 6.79395 10.4686 6.30284 10.8823C5.81173 11.2961 5.57361 11.8784 5.57361 12.6446C5.57361 13.3649 5.7522 13.9012 6.12425 14.269C6.48142 14.6521 7.0023 14.836 7.68688 14.836ZM19.6372 16.491C19.3694 16.491 19.1908 16.445 19.0717 16.3378C18.9527 16.2458 18.8485 16.0313 18.7592 15.7401L15.2619 3.8945C15.1726 3.58802 15.128 3.3888 15.128 3.28153C15.128 3.03635 15.247 2.89843 15.4851 2.89843H16.9436C17.2263 2.89843 17.4198 2.9444 17.524 3.05167C17.643 3.14362 17.7323 3.35816 17.8216 3.64932L20.3218 13.7939L22.6434 3.64932C22.7178 3.34283 22.8071 3.14362 22.9262 3.05167C23.0453 2.95973 23.2536 2.89843 23.5215 2.89843H24.7121C24.9948 2.89843 25.1883 2.9444 25.3073 3.05167C25.4264 3.14362 25.5306 3.35816 25.5901 3.64932L27.9415 13.9165L30.5161 3.64932C30.6054 3.34283 30.7096 3.14362 30.8137 3.05167C30.9328 2.95973 31.1263 2.89843 31.3941 2.89843H32.7782C33.0163 2.89843 33.1502 3.02102 33.1502 3.28153C33.1502 3.35816 33.1354 3.43478 33.1205 3.52672C33.1056 3.61867 33.0758 3.74126 33.0163 3.90983L29.4297 15.7554C29.3404 16.0619 29.2362 16.2611 29.1172 16.3531C28.9981 16.445 28.8046 16.5063 28.5517 16.5063H27.2718C26.989 16.5063 26.7956 16.4604 26.6765 16.3531C26.5574 16.2458 26.4533 16.0466 26.3937 15.7401L24.087 5.856L21.7952 15.7248C21.7207 16.0313 21.6315 16.2305 21.5124 16.3378C21.3933 16.445 21.185 16.491 20.9171 16.491H19.6372ZM38.7608 16.9048C37.9869 16.9048 37.2131 16.8128 36.469 16.6289C35.7248 16.445 35.1444 16.2458 34.7575 16.016C34.5194 15.878 34.3557 15.7248 34.2962 15.5869C34.2366 15.449 34.2069 15.2957 34.2069 15.1578V14.3763C34.2069 14.0545 34.3259 13.9012 34.5492 13.9012C34.6385 13.9012 34.7277 13.9165 34.817 13.9472C34.9063 13.9778 35.0403 14.0391 35.1891 14.1004C35.6951 14.3303 36.2457 14.5142 36.8261 14.6368C37.4214 14.7594 38.0018 14.8207 38.5971 14.8207C39.5347 14.8207 40.2639 14.6521 40.7699 14.315C41.2759 13.9778 41.5438 13.4875 41.5438 12.8592C41.5438 12.4301 41.4098 12.0776 41.142 11.7865C40.8741 11.4953 40.3681 11.2348 39.6389 10.9896L37.4809 10.3C36.3945 9.94757 35.5909 9.42655 35.0998 8.73696C34.6087 8.06269 34.3557 7.3118 34.3557 6.51494C34.3557 5.87133 34.4896 5.30433 34.7575 4.81396C35.0254 4.32358 35.3826 3.8945 35.829 3.55737C36.2755 3.20491 36.7815 2.9444 37.3768 2.76051C37.9721 2.57662 38.5971 2.5 39.2519 2.5C39.5793 2.5 39.9216 2.51532 40.249 2.5613C40.5913 2.60727 40.9038 2.66857 41.2164 2.72986C41.514 2.80648 41.7968 2.88311 42.0646 2.97505C42.3325 3.067 42.5409 3.15894 42.6897 3.25089C42.898 3.37348 43.0469 3.49607 43.1362 3.63399C43.2255 3.75659 43.2701 3.92515 43.2701 4.13969V4.85993C43.2701 5.18174 43.151 5.3503 42.9278 5.3503C42.8088 5.3503 42.6153 5.28901 42.3623 5.16641C41.514 4.76798 40.5615 4.56877 39.5049 4.56877C38.6566 4.56877 37.9869 4.70669 37.5256 4.99785C37.0642 5.28901 36.8261 5.73341 36.8261 6.3617C36.8261 6.79078 36.975 7.15856 37.2726 7.44972C37.5702 7.74088 38.1209 8.03204 38.9096 8.29255L41.0229 8.98214C42.0944 9.3346 42.8683 9.82497 43.3296 10.4533C43.791 11.0816 44.0142 11.8018 44.0142 12.5987C44.0142 13.2576 43.8803 13.8552 43.6273 14.3763C43.3594 14.8973 43.0022 15.357 42.5409 15.7248C42.0795 16.1079 41.5289 16.3837 40.889 16.583C40.2193 16.7975 39.5198 16.9048 38.7608 16.9048Z"
                fill="#232B37"
              />
              <path
                d="M37.6514 21.6639C39.2583 21.4595 42.8025 21.0191 43.4332 21.8684C44.064 22.7019 42.7274 26.2091 42.1267 27.766C41.9465 28.2378 42.3369 28.4266 42.7424 28.0648C45.3856 25.7372 46.0764 20.8776 45.5357 20.1698C44.9951 19.4778 40.3546 18.8802 37.5312 20.9562C37.0957 21.2865 37.1708 21.7268 37.6514 21.6639Z"
                fill="#232B37"
              />
              <path
                d="M23.3102 30C29.462 30 36.6167 27.9941 41.5412 24.2154C42.3494 23.5934 41.6459 22.6449 40.8227 23.0336C35.2995 25.4594 29.2974 26.6412 23.8341 26.6412C15.7364 26.6412 7.9082 24.3243 1.5618 20.499C1.00799 20.1569 0.588885 20.7478 1.05289 21.1832C6.92032 26.6879 14.6887 30 23.3102 30Z"
                fill="#232B37"
              />
              <path
                d="M67.6924 8.07508C67.3468 8.07508 67.069 7.97632 66.8591 7.7788C66.6493 7.58128 66.5443 7.30968 66.5443 6.96402C66.5443 6.61836 66.6493 6.34677 66.8591 6.14925C67.069 5.95173 67.3468 5.85297 67.6924 5.85297C68.0504 5.85297 68.3282 5.95173 68.5257 6.14925C68.7356 6.34677 68.8405 6.61836 68.8405 6.96402C68.8405 7.30968 68.7356 7.58128 68.5257 7.7788C68.3282 7.97632 68.0504 8.07508 67.6924 8.07508Z"
                fill="#232B37"
              />
              <path
                d="M66.7666 18.7597V10.112C66.7666 9.86511 66.89 9.74166 67.1369 9.74166H68.2294C68.4763 9.74166 68.5998 9.86511 68.5998 10.112V18.7597C68.5998 19.0066 68.4763 19.1301 68.2294 19.1301H67.1369C66.89 19.1301 66.7666 19.0066 66.7666 18.7597Z"
                fill="#232B37"
              />
              <path
                d="M71.7828 19.1302H72.8753C73.1222 19.1302 73.2457 19.0068 73.2457 18.7599V11.8898C73.7025 11.5812 74.1716 11.3467 74.653 11.1862C75.1345 11.0257 75.6221 10.9454 76.1159 10.9454C76.6838 10.9454 77.0974 11.0998 77.3566 11.4084C77.6282 11.717 77.764 12.1985 77.764 12.8528V18.7599C77.764 19.0068 77.8874 19.1302 78.1343 19.1302H79.2269C79.4738 19.1302 79.5972 19.0068 79.5972 18.7599V12.2417C79.5972 11.3405 79.3627 10.6553 78.8936 10.1862C78.4245 9.70477 77.7393 9.46404 76.8381 9.46404C75.5419 9.46404 74.3074 9.90229 73.1346 10.7788L73.0235 10.0936C72.9864 9.85908 72.8445 9.7418 72.5976 9.7418H71.7828C71.5359 9.7418 71.4124 9.86525 71.4124 10.1122V18.7599C71.4124 19.0068 71.5359 19.1302 71.7828 19.1302Z"
                fill="#232B37"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M85.7801 23.1671C84.7678 23.1671 83.8234 22.9819 82.9469 22.6115C82.7987 22.5498 82.7 22.4819 82.6506 22.4078C82.6012 22.3338 82.5765 22.2165 82.5765 22.056V21.519C82.5765 21.2968 82.6506 21.1857 82.7987 21.1857C82.8728 21.1857 82.9592 21.2042 83.058 21.2412C83.1691 21.2783 83.3172 21.3215 83.5024 21.3709C84.2678 21.5807 84.9776 21.6857 85.6319 21.6857C86.6195 21.6857 87.3417 21.4449 87.7985 20.9635C88.2553 20.4944 88.4836 19.7351 88.4836 18.6858V17.8525C87.6318 18.5932 86.6936 18.9636 85.669 18.9636C84.8912 18.9636 84.2122 18.7722 83.632 18.3895C83.0642 18.0068 82.6197 17.4636 82.2988 16.76C81.9778 16.0563 81.8173 15.2354 81.8173 14.2971C81.8173 13.3095 81.9778 12.4577 82.2988 11.7417C82.6197 11.0133 83.0703 10.4516 83.6505 10.0566C84.2308 9.66156 84.9159 9.46404 85.706 9.46404C86.8171 9.46404 87.7861 9.84673 88.6133 10.6121L88.7059 10.0936C88.7429 9.85908 88.8849 9.7418 89.1318 9.7418H89.928C90.1749 9.7418 90.2984 9.86525 90.2984 10.1122V18.5562C90.2984 20.0252 89.9033 21.161 89.1132 21.9634C88.3355 22.7659 87.2244 23.1671 85.7801 23.1671ZM86.206 17.4822C86.9714 17.4822 87.7306 17.1982 88.4836 16.6303V11.7602C87.7553 11.217 86.959 10.9454 86.0949 10.9454C84.49 10.9454 83.6876 12.038 83.6876 14.2231C83.6876 16.3958 84.527 17.4822 86.206 17.4822Z"
                fill="#232B37"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M97.0402 19.408C95.6576 19.408 94.565 18.9759 93.7626 18.1118C92.9602 17.2353 92.559 16.0069 92.559 14.4268C92.559 12.8466 92.9602 11.6244 93.7626 10.7603C94.565 9.89611 95.6576 9.46404 97.0402 9.46404C98.4352 9.46404 99.5278 9.89611 100.318 10.7603C101.12 11.6244 101.521 12.8466 101.521 14.4268C101.521 16.0069 101.12 17.2353 100.318 18.1118C99.5278 18.9759 98.4352 19.408 97.0402 19.408ZM97.0402 17.9266C97.892 17.9266 98.5402 17.6426 98.9846 17.0748C99.429 16.5069 99.6512 15.6242 99.6512 14.4268C99.6512 13.2416 99.429 12.3651 98.9846 11.7973C98.5402 11.2294 97.892 10.9454 97.0402 10.9454C96.1884 10.9454 95.5403 11.2294 95.0959 11.7973C94.6515 12.3651 94.4292 13.2416 94.4292 14.4268C94.4292 15.6242 94.6515 16.5069 95.0959 17.0748C95.5403 17.6426 96.1884 17.9266 97.0402 17.9266Z"
                fill="#232B37"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M55.5215 18.7597C55.5215 19.0066 55.6449 19.1301 55.8918 19.1301H60.2435C61.0829 19.1301 61.8175 18.9881 62.4471 18.7042C63.089 18.4202 63.5828 18.0128 63.9285 17.482C64.2865 16.9388 64.4655 16.2969 64.4655 15.5562C64.4655 14.7414 64.2495 14.0686 63.8174 13.5378C63.3853 13.0069 62.7866 12.6304 62.0212 12.4082C62.5643 12.1613 62.9841 11.8094 63.2804 11.3527C63.589 10.8959 63.7433 10.3404 63.7433 9.68609C63.7433 8.98242 63.5705 8.37752 63.2248 7.87137C62.8915 7.36522 62.4286 6.97635 61.836 6.70476C61.2434 6.43317 60.5521 6.29737 59.762 6.29737H55.8918C55.6449 6.29737 55.5215 6.42082 55.5215 6.66772V18.7597ZM59.5768 11.8712H57.3177V7.74174H59.6324C61.1261 7.74174 61.873 8.43307 61.873 9.81572C61.873 11.186 61.1076 11.8712 59.5768 11.8712ZM60.2064 17.6857H57.3177V13.2785H60.1694C61.7619 13.2785 62.5582 14.013 62.5582 15.4821C62.5582 16.9512 61.7743 17.6857 60.2064 17.6857Z"
                fill="#232B37"
              />
            </svg>
          </a>
        </div>
        <div className="header-search-wrapper">
          <Input
            className="header-search-input"
            value={value}
            onChange={({ detail }) => setValue(detail.value)}
            placeholder="What are you looking for?"
            type="search"
          />
        </div>

        <div className="header-buttons-wrapper">
          <Button iconName="search" variant="icon" className="search-button" />
          <Button iconName="grid-view" variant="icon" className="grid-button" />
          <Button>
            {/* <Box color="inherit" variant="code" fontWeight="bold"> */}
            Sign in
            {/* </Box> */}
          </Button>
        </div>
      </div>
    </Box>
  );
}

function App() {
  return (
    <div>
      {/* <TopNav /> */}
      <AppLayout
        toolsHide={true}
        maxContentWidth={1280000000}
        navigation={<DashboardSideNavigation />}
        disableContentPaddings
        breadcrumbs={<CustomNavBar />}
        content={
          <ContentLayout
            className="product-detail-page"
            //breadcrumbs={<div>hello</div>}
            header={<HeroHeader />}
            defaultPadding={true}
            maxContentWidth={1440}
            disableOverlap={true}
            headerBackgroundStyle={mode => {
              if (mode === 'light') {
                return `center center/cover url(${headerGradientImageLight})`;
              } else {
                return `center center/cover url(${headerGradientImageDark})`;
              }
            }}
          >
            <div className="product-page-content-grid">
              <aside aria-label="Side bar" className="product-page-aside">
                <div className="product-page-aside-sticky">
                  <SideContent />
                </div>
              </aside>

              <main className="product-page-content">
                <ShareAnIdea />
              </main>
            </div>
          </ContentLayout>
        }
      />
    </div>
  );
}

createRoot(document.getElementById('app')!).render(<App />);
