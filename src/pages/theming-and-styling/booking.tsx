// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import {
  Box,
  BreadcrumbGroup,
  Button,
  DateInput,
  FormField,
  Icon,
  Link,
  Select,
} from '@cloudscape-design/components-core';

export default function Booking() {
  const [checkIn, setCheckIn] = React.useState('2025/10/20');
  const [checkOut, setCheckOut] = React.useState('2025/10/24');

  return (
    <div className="booking-content">
      <BreadcrumbGroup
        ariaLabel="Breadcrumbs"
        items={[
          { text: 'Home', href: '#' },
          { text: 'Hotels', href: '#' },
          { text: 'Germany', href: '#' },
          { text: 'Berlin', href: '#' },
          { text: 'Hotel Adlon Kempinksi', href: '#' },
        ]}
      />

      <Box margin={{ top: 'xxxl' }} variant="h1">
        Hotel Adlon Kempinski
      </Box>

      <p className="pitch">
        Get the celebrity treatment with world-class service.
        <br />
        The quintessence of luxury lodging, the Adlon is a legendary 5-star hotel situated in Berlin's Mitte, beside the
        Brandenburg Gate.
      </p>

      <div className="address-and-reviews">
        <div className="icon">
          <Icon name="location-pin" size="medium" />
        </div>

        <span className="content">Unter den Linden 77, Mitte, 10117 Berlin, Germany</span>

        <div className="icon">
          <Icon
            name="settings"
            size="normal"
            svg={
              <svg viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="filled no-stroke"
                  d="M14.97 6.76L13.99 1.84C13.84 0.94 13.06 0 12 0H4C2.95 0 2.16 0.93 2.02 1.8L1.03 6.75C0.4 7.3 0 8.1 0 8.99V13.99H2V14.49C2 14.77 2.22 14.99 2.5 14.99H3.5C3.78 14.99 4 14.77 4 14.49V13.99H12V14.49C12 14.77 12.22 14.99 12.5 14.99H13.5C13.78 14.99 14 14.77 14 14.49V13.99H16V8.99C16 8.09 15.6 7.3 14.97 6.75V6.76ZM4.08 2H11.92C11.92 2 12 2.12 12.02 2.2L12.78 6H3.22L3.99 2.16C3.99 2.11 4.04 2.04 4.08 2ZM14 12H2V9C2 8.45 2.45 8 3 8H13C13.55 8 14 8.45 14 9V12ZM6 10C6 10.55 5.55 11 5 11C4.45 11 4 10.55 4 10C4 9.45 4.45 9 5 9C5.55 9 6 9.45 6 10ZM12 10C12 10.55 11.55 11 11 11C10.45 11 10 10.55 10 10C10 9.45 10.45 9 11 9C11.55 9 12 9.45 12 10Z"
                />
              </svg>
            }
          />
        </div>

        <span className="content">Parking available at the hotel</span>

        <div className="icon">
          <Icon name="star-filled" />
        </div>

        <div className="reviews">
          <span className="content">4.8/5</span>

          <Link href="#" variant="primary">
            <span style={{ fontSize: '18px' }}>2,567 reviews</span>
          </Link>
        </div>
      </div>

      <div className="reservation">
        <Box variant="h2">Make a reservation</Box>

        <div className="fields">
          <FormField label="Check in date">
            <DateInput onChange={({ detail }) => setCheckIn(detail.value)} value={checkIn} placeholder="YYYY/MM/DD" />
          </FormField>

          <FormField label="Check out date">
            <DateInput onChange={({ detail }) => setCheckOut(detail.value)} value={checkOut} placeholder="YYYY/MM/DD" />
          </FormField>

          <FormField label="Guests">
            <Select
              selectedOption={{ label: '2 Adults', value: '2' }}
              options={[
                { label: '1 Adult', value: '1' },
                { label: '2 Adults', value: '2' },
                { label: '3 Adults', value: '3' },
                { label: '4 Adults', value: '4' },
              ]}
            />
          </FormField>

          <div style={{ gridColumn: '1 / span 3' }}>
            <FormField label="Room">
              <Select
                selectedOption={{ label: 'Emperor Suite Deluxe with views', value: '2' }}
                options={[
                  { label: 'Emperor Suite Deluxe', value: '1' },
                  { label: 'Emperor Suite Deluxe with views', value: '2' },
                ]}
              />
            </FormField>
          </div>
        </div>

        <div className="availability">
          <span className="price">
            $420/<span>night*</span>
          </span>

          <Button
            variant="primary"
            style={{
              root: {
                paddingBlock: '8px',
                paddingInline: '44px',
              },
            }}
          >
            Check availability
          </Button>
        </div>
      </div>
    </div>
  );
}
