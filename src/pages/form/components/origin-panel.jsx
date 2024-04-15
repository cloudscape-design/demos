// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useEffect } from 'react';
import { Container, Header, Input, FormField, SpaceBetween, Multiselect } from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import useContentOrigins from '../../commons/use-content-origins';
import HeadersEditor from './headers-editor';
import validateField from '../form-validation-config';

export default function OriginPanel({
  loadHelpPanelContent,
  validation = false,
  attemptedToSubmit = false,
  data,
  setData,
  refs,
}) {
  const [contentOriginsState, contentOriginsHandlers] = useContentOrigins();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [contentPath, setContentPath] = useState('');

  const { originId, originIdError } = data;

  useEffect(() => {
    if (validation && attemptedToSubmit) {
      validateOriginId();
    }
  }, [attemptedToSubmit]);

  const validateOriginId = (value = originId) => {
    const { errorText } = validateField('originId', value, attemptedToSubmit, value);

    setData({ ...data, originIdError: errorText });
  };

  const onChangeOriginId = ({ detail: { value } }) => {
    setData({ ...data, originId: value });

    if (validation && originIdError?.length > 0) {
      validateOriginId(value);
    }
  };

  const onBlurOriginId = () => {
    if (!validation) {
      return;
    }

    validateOriginId(originId);
  };

  return (
    <Container
      id="origin-panel"
      className="custom-screenshot-hide"
      header={<Header variant="h2">Origin settings</Header>}
    >
      <SpaceBetween size="l">
        <FormField
          label={
            <>
              Content origin<i> - optional</i>
            </>
          }
          info={<InfoLink id="content-origin-info-link" onFollow={() => loadHelpPanelContent(5)} />}
          description="The Amazon S3 bucket or web server that you want CloudFront to get your web content from."
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Multiselect
            {...contentOriginsHandlers}
            options={contentOriginsState.options.filter(option => !option.label.includes('NO-PERMISSIONS'))}
            selectedOptions={selectedOptions}
            selectedAriaLabel="Selected"
            onChange={event => setSelectedOptions(event.detail.selectedOptions)}
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
          />
        </FormField>
        <FormField
          label={
            <>
              Path to content<i> - optional</i>
            </>
          }
          info={<InfoLink id="path-info-link" onFollow={() => loadHelpPanelContent(6)} />}
          description="The directory in your Amazon S3 bucket or your custom origin."
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Input placeholder="/images" value={contentPath} onChange={event => setContentPath(event.detail.value)} />
        </FormField>
        <FormField
          label="Origin ID"
          info={<InfoLink id="origin-id-info-link" onFollow={() => loadHelpPanelContent(7)} />}
          description="This value lets you distinguish multiple origins in the same distribution from one another."
          constraintText="Valid characters are a-z, A-Z, 0-9, hypens (-), and periods (.)."
          errorText={originIdError}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Input
            ariaRequired={true}
            value={originId}
            onChange={onChangeOriginId}
            onBlur={onBlurOriginId}
            ref={refs?.originIdRef}
          />
        </FormField>

        <SpaceBetween size="xs">
          <Header
            variant="h3"
            info={<InfoLink id="custom-headers-info-link" onFollow={() => loadHelpPanelContent(8)} />}
          >
            Custom headers
          </Header>
          <HeadersEditor validation={validation} attemptedToSubmit={attemptedToSubmit} refs={refs} />
        </SpaceBetween>
      </SpaceBetween>
    </Container>
  );
}
