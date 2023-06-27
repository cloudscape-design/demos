// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Container, Header, Input, FormField, SpaceBetween, Multiselect } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import useContentOrigins from '../../commons/use-content-origins';
import HeadersEditor from './headers-editor';

export default function OriginPanel({ loadHelpPanelContent, readOnlyWithErrors = false }) {
  const [contentOriginsState, contentOriginsHandlers] = useContentOrigins();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [contentPath, setContentPath] = useState('');
  const [originId, setOriginId] = useState('');

  const getErrorText = errorMessage => {
    return readOnlyWithErrors ? errorMessage : undefined;
  };

  return (
    <Container
      id="origin-panel"
      className="custom-screenshot-hide"
      header={<Header variant="h2">Origin settings</Header>}
    >
      <SpaceBetween size="l">
        <FormField
          label="Content origin"
          info={<InfoLink id="content-origin-info-link" onFollow={() => loadHelpPanelContent(5)} />}
          description="The Amazon S3 bucket or web server that you want CloudFront to get your web content from."
          errorText={getErrorText('You must specify a content origin.')}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Multiselect
            {...contentOriginsHandlers}
            options={contentOriginsState.options}
            selectedOptions={selectedOptions}
            selectedAriaLabel="Selected"
            onChange={event => !readOnlyWithErrors && setSelectedOptions(event.detail.selectedOptions)}
            statusType={contentOriginsState.status}
            deselectAriaLabel={option => `Remove option ${option.label} from selection`}
            placeholder="Choose an S3 bucket or web server"
            loadingText="Loading origins"
            errorText="Error fetching origins."
            recoveryText="Retry"
            finishedText={
              contentOriginsState.filteringText
                ? `End of "${contentOriginsState.filteringText}" results`
                : 'End of all results'
            }
            empty={contentOriginsState.filteringText ? "We can't find a match" : 'No origins'}
            filteringType="manual"
            filteringAriaLabel="Filter origins"
            filteringClearAriaLabel="Clear"
            ariaRequired={true}
          />
        </FormField>
        <FormField
          label="Path to content"
          info={<InfoLink id="path-info-link" onFollow={() => loadHelpPanelContent(6)} />}
          description="The directory in your Amazon S3 bucket or your custom origin."
          errorText={getErrorText('You must specify a path to content.')}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Input
            placeholder="/images"
            ariaRequired={true}
            value={contentPath}
            onChange={event => !readOnlyWithErrors && setContentPath(event.detail.value)}
          />
        </FormField>
        <FormField
          label="Origin ID"
          info={<InfoLink id="origin-id-info-link" onFollow={() => loadHelpPanelContent(7)} />}
          description="This value lets you distinguish multiple origins in the same distribution from one another."
          errorText={getErrorText('You must specify a origin ID.')}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Input
            ariaRequired={true}
            value={originId}
            onChange={event => !readOnlyWithErrors && setOriginId(event.detail.value)}
          />
        </FormField>
        <div>
          <Header
            variant="h3"
            info={<InfoLink id="custom-headers-info-link" onFollow={() => loadHelpPanelContent(8)} />}
          >
            Custom headers
          </Header>
          <HeadersEditor readOnlyWithErrors={readOnlyWithErrors} />
        </div>
      </SpaceBetween>
    </Container>
  );
}
