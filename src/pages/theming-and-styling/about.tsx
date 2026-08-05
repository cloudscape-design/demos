// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import { Badge, Box, Icon } from '@cloudscape-design/components-core';
import { Tabs } from '@cloudscape-design/components-core';

import { colors } from './theme';

function AboutBadge({ children }: { children: React.ReactNode }) {
  const color = `light-dark(${colors.yellow900}, ${colors.yellow700})`;
  return (
    <Badge
      style={{
        root: {
          background: `light-dark(#F5F3EF, #191100)`,
          color,
          borderColor: color,
          borderRadius: '80px',
          borderWidth: '1px',
          paddingBlock: '6px',
          paddingInline: '18px',
        },
      }}
    >
      <span style={{ fontSize: '16px' }}>{children}</span>
    </Badge>
  );
}

function Content() {
  return (
    <div className="about-layout">
      <div className="amenities">
        <Box variant="h2">Amenities</Box>

        <div className="badges">
          <AboutBadge>Fitness Room</AboutBadge>
          <AboutBadge>Indoor Pool</AboutBadge>
          <AboutBadge>Spa</AboutBadge>
          <AboutBadge>2 restaurants</AboutBadge>
          <AboutBadge>Room Service</AboutBadge>
          <AboutBadge>Bar & Lounge</AboutBadge>
          <AboutBadge>Shopping arcade</AboutBadge>
          <AboutBadge>Parking</AboutBadge>
          <AboutBadge>Conference Facilities</AboutBadge>
          <AboutBadge>Laundry service</AboutBadge>
          <AboutBadge>Afternoon Tea with Caviar</AboutBadge>
        </div>
      </div>

      <div className="description">
        <Box variant="h2" margin={{ bottom: 'm' }}>
          Description
        </Box>

        <Box fontSize="heading-xs" fontWeight="normal" color="text-body-secondary" margin={{ bottom: 'xl' }}>
          The quintessence of luxury lodging, the Adlon is a legendary 5-star hotel situated in Berlin's Mitte, beside
          the Brandenburg Gate. State-of-the-art facilities include a double Michelin-star restaurant and a shopping
          arcade.
        </Box>

        <Box fontSize="heading-xs" fontWeight="normal" color="text-body-secondary" margin={{ bottom: 'xl' }}>
          With such a central location, the Hotel Adlon Kempinski allows direct access to some of Berlin's main
          landmarks. The Holocaust Memorial, Checkpoint Charlie and Pariser Platz are all within a 10-minute walk.
        </Box>

        <Box fontSize="heading-xs" fontWeight="normal" color="text-body-secondary" margin={{ bottom: 'xl' }}>
          Rooms have a sophisticated allure thanks to antique furnishings with extravagant twists and marble bathrooms.
          They are equipped with WiFi, a modern media system and some offer views of the Brandenburg Gate.
        </Box>

        <Box fontSize="heading-xs" fontWeight="normal" color="text-body-secondary" margin={{ bottom: 'xl' }}>
          Sports and relaxation facilities include a gym and a spa with a wide range of treatments.
        </Box>
      </div>

      <div className="advertisement">
        <h3>WanderWoo Winter Days</h3>

        <p>
          Save 15% on your stay
          <br /> from Dec 1st, 2025 to March 15th, 2025
        </p>

        <p>
          Code: WOOPWOOP25 <Icon name="copy" />
        </p>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <Tabs
      tabs={[
        {
          label: 'About',
          id: 'about',
          content: <Content />,
        },
        {
          label: 'Rooms and suites',
          id: 'rooms',
          content: <Content />,
        },
        {
          label: 'Policies',
          id: 'policies',
          content: <Content />,
        },
        {
          label: 'Reviews',
          id: 'reviews',
          content: <Content />,
        },
      ]}
    />
  );
}

export default function About() {
  return (
    <div className="about-container">
      <Categories />
    </div>
  );
}
