// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Container,
  Checkbox,
  ExpandableSection,
  Header,
  Input,
  RadioGroup,
  FormField,
  SpaceBetween,
  Select,
  Textarea,
  TimeInput,
  DatePicker,
  FileUpload,
} from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import useContentOrigins from '../../commons/use-content-origins';
import { SSL_CERTIFICATE_OPTIONS, SUPPORTED_HTTP_VERSIONS_OPTIONS } from '../form-config';
import validateField from '../form-validation-config';

function DistributionsFooter({ state, onChange }) {
  return (
    <ExpandableSection headerText="Additional settings" variant="footer">
      <SpaceBetween size="l">
        <FormField
          label="Supported HTTP versions"
          description="Choose the version of the HTTP protocol that you want CloudFront to accept for viewer requests."
          stretch={true}
        >
          <RadioGroup
            items={SUPPORTED_HTTP_VERSIONS_OPTIONS}
            ariaRequired={true}
            value={state.httpVersion}
            onChange={({ detail: { value } }) => onChange('httpVersion', value)}
          />
        </FormField>
        <FormField label="IPv6">
          <Checkbox checked={state.ipv6isOn} onChange={({ detail: { checked } }) => onChange('ipv6isOn', checked)}>
            Turn on
          </Checkbox>
        </FormField>
      </SpaceBetween>
    </ExpandableSection>
  );
}

const isS3PermissionError = (attribute, errorText) =>
  attribute === 's3BucketSelectedOption' &&
  errorText ===
    "CloudFront isn't allowed to write logs to this bucket. You must enable access control lists (ACL) for the bucket.";

export default function DistributionPanel({
  loadHelpPanelContent,
  validation = false,
  data,
  errors = {},
  setData,
  setErrors,
  refs = {},
}) {
  const [contentOriginsState, contentOriginsHandlers] = useContentOrigins();

  const onChange = (attribute, value) => {
    setData({ [attribute]: value });

    // Validates when there is an error message in the field
    if (validation && errors[attribute]?.length > 0) {
      const { errorText } = validateField(attribute, value);

      // S3 bucket selection acts as server side validation
      // so the error message is set only upon form submission and
      // error message is resetted when a bucket is selected
      if (isS3PermissionError(attribute, errorText)) {
        setErrors({ [attribute]: '' });
      } else {
        setErrors({ [attribute]: errorText });
      }
    }
  };

  const onFunctionsChange = functions => {
    setData({ functions });

    if (validation) {
      const { errorText: functionsError } = validateField('functions', functions);
      const functionsFileErrors = functions.map(file => validateField('functionFile', file).errorText);
      // Setting to empty array so that on submit, valid files are not focused
      const areErrorsEmpty = functionsFileErrors.every(fileError => !fileError || fileError.length === 0);

      setErrors({
        functions: functionsError,
        functionFiles: areErrorsEmpty ? [] : functionsFileErrors,
      });
    }
  };

  const onBlur = attribute => {
    if (!validation) {
      return;
    }

    const value = data[attribute];
    const { errorText } = validateField(attribute, value);

    if (isS3PermissionError(attribute, errorText)) {
      return;
    }

    setErrors({ [attribute]: errorText });
  };

  return (
    <Container
      id="distribution-panel"
      header={<Header variant="h2">Distribution settings</Header>}
      footer={<DistributionsFooter state={data} onChange={onChange} />}
    >
      <SpaceBetween size="l">
        <FormField
          label="SSL/TLS certificate"
          info={<InfoLink id="certificate-method-info-link" onFollow={() => loadHelpPanelContent(2)} />}
          stretch={true}
        >
          <RadioGroup
            items={SSL_CERTIFICATE_OPTIONS}
            value={data.sslCertificate}
            onChange={({ detail: { value } }) => onChange('sslCertificate', value)}
          />
        </FormField>
        <FormField
          label="Root object"
          info={<InfoLink id="root-object-info-link" onFollow={() => loadHelpPanelContent(3)} />}
          description="Enter the URL of the object that you want CloudFront to return when a viewer request points to your root URL."
          constraintText="Enter a  valid root object. Example: https://example.com"
          errorText={errors.cloudFrontRootObject}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Input
            value={data.cloudFrontRootObject}
            ariaRequired={true}
            placeholder="https://example.com"
            onChange={({ detail: { value } }) => onChange('cloudFrontRootObject', value)}
            onBlur={() => onBlur('cloudFrontRootObject')}
            ref={refs.cloudFrontRootObject}
            data-testid="root-input"
          />
        </FormField>
        <FormField
          label={
            <>
              Alternative domain names (CNAMEs)<i> - optional</i>
            </>
          }
          info={<InfoLink id="cnames-info-link" onFollow={() => loadHelpPanelContent(4)} />}
          description="List any custom domain names that you use in addition to the CloudFront domain name for the URLs for your files."
          constraintText="Specify up to 3 CNAMEs separated with commas."
          stretch={true}
          errorText={errors.alternativeDomainNames}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Textarea
            placeholder={'www.one.example.com, www.two.example.com'}
            value={data.alternativeDomainNames}
            onChange={({ detail: { value } }) => onChange('alternativeDomainNames', value)}
            onBlur={() => onBlur('alternativeDomainNames')}
            ref={refs.alternativeDomainNames}
          />
        </FormField>
        <FormField
          label="S3 bucket for logs"
          description="The Amazon S3 bucket that you want CloudFront to store your access logs in."
          errorText={errors.s3BucketSelectedOption}
          i18nStrings={{ errorIconAriaLabel: 'Error' }}
        >
          <Select
            {...contentOriginsHandlers}
            options={contentOriginsState.options}
            selectedAriaLabel="Selected"
            statusType={contentOriginsState.status}
            placeholder="Choose an S3 bucket"
            loadingText="Loading buckets"
            errorText="Error fetching buckets."
            recoveryText="Retry"
            finishedText={
              contentOriginsState.filteringText
                ? `End of "${contentOriginsState.filteringText}" results`
                : 'End of all results'
            }
            empty={contentOriginsState.filteringText ? "We can't find a match" : 'No origins'}
            filteringType="manual"
            filteringAriaLabel="Filter buckets"
            filteringClearAriaLabel="Clear"
            ariaRequired={true}
            selectedOption={data.s3BucketSelectedOption}
            onChange={({ detail: { selectedOption } }) => onChange('s3BucketSelectedOption', selectedOption)}
            onBlur={() => onBlur('s3BucketSelectedOption')}
            ref={refs.s3BucketSelectedOption}
          />
        </FormField>

        <FormField stretch={true} label={<span id="certificate-expiry-label">Certificate expiry</span>}>
          <SpaceBetween size="s" direction="horizontal">
            <FormField
              stretch={true}
              description="Specify the date when the certificate should expire."
              className="date-time-container"
              errorText={errors.certificateExpiryDate}
              constraintText={'Use YYYY/MM/DD format.'}
              i18nStrings={{ errorIconAriaLabel: 'Error' }}
            >
              <DatePicker
                ariaLabelledby="certificate-expiry-label"
                placeholder="YYYY/MM/DD"
                previousMonthAriaLabel="Previous month"
                nextMonthAriaLabel="Next month"
                todayAriaLabel="Today"
                value={data.certificateExpiryDate}
                ariaRequired={true}
                onChange={({ detail: { value } }) => onChange('certificateExpiryDate', value)}
                openCalendarAriaLabel={selectedDate =>
                  'Choose certificate expiry date' + (selectedDate ? `, selected date is ${selectedDate}` : '')
                }
                onBlur={() => onBlur('certificateExpiryDate')}
                ref={refs.certificateExpiryDate}
              />
            </FormField>
            <FormField
              stretch={true}
              description="Specify the time when the certificate should expire"
              constraintText="Use 24-hour format."
              className="date-time-container"
              errorText={errors.certificateExpiryTime}
              i18nStrings={{ errorIconAriaLabel: 'Error' }}
            >
              <TimeInput
                ariaLabelledby="certificate-expiry-label"
                use24Hour={true}
                placeholder="hh:mm:ss"
                ariaRequired={true}
                value={data.certificateExpiryTime}
                onChange={({ detail: { value } }) => onChange('certificateExpiryTime', value)}
                onBlur={() => onBlur('certificateExpiryTime')}
                ref={refs.certificateExpiryTime}
              />
            </FormField>
          </SpaceBetween>
        </FormField>

        <FormField
          label="Functions"
          description="Upload Cloudfront function and test objects."
          info={<InfoLink onFollow={() => loadHelpPanelContent(12)} />}
        >
          <FileUpload
            multiple={true}
            showFileSize={true}
            showFileLastModified={true}
            accept="text/javascript, application/json"
            value={data.functions}
            tokenLimit={3}
            onChange={({ detail: { value } }) => onFunctionsChange(value)}
            errorText={errors.functions}
            fileErrors={errors.functionFiles}
            ariaRequired={true}
            constraintText="Upload function code as *.js file and optional test objects as *.json files."
            i18nStrings={{
              uploadButtonText: multiple => (multiple ? 'Choose files' : 'Choose file'),
              dropzoneText: multiple => (multiple ? 'Drop files to upload' : 'Drop file to upload'),
              removeFileAriaLabel: fileIndex => `Remove file ${fileIndex + 1}`,
              limitShowFewer: 'Show fewer files',
              limitShowMore: 'Show more files',
              errorIconAriaLabel: 'Error',
            }}
            ref={refs.functions}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
}
