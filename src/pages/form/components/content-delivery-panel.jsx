// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Container, FormField, Header, Tiles } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';

export default function ContentDeliveryPanel({ loadHelpPanelContent }) {
  const [deliveryMethod, setDeliveryMethod] = useState('web');

  return (
    <Container className="custom-screenshot-hide" header={<Header variant="h2">Distribution content delivery</Header>}>
      <FormField
        label="Delivery method"
        info={<InfoLink id="delivery-method-info-link" onFollow={() => loadHelpPanelContent(1)} />}
        stretch={true}
      >
        <Tiles
          items={[
            {
              value: 'web',
              label: 'Web',
              description: 'Deliver all types of content (including streaming). This is the most common choice.',
            },
            {
              value: 'rtmp',
              label: 'RTMP',
              description:
                'Deliver streaming content using Adobe Media Server and the Adobe Real-Time Messaging Protocol (RTMP).',
            },
          ]}
          value={deliveryMethod}
          onChange={e => setDeliveryMethod(e.detail.value)}
        />
      </FormField>
    </Container>
  );
}
