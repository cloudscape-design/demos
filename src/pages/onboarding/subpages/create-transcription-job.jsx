// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState, useCallback } from 'react';
import {
  BreadcrumbGroup,
  Button,
  Container,
  ContentLayout,
  Form,
  FormField,
  Hotspot,
  Header,
  Input,
  Link,
  RadioGroup,
  Select,
  SpaceBetween,
  Tiles,
} from '@cloudscape-design/components';
import { CustomAppLayout } from '../layout';
import { useRouter } from '../router';
import { useStore } from '../store';

const availableS3Buckets = [
  { label: 'EXAMPLE-BUCKET0.s3.amazon.com', value: '0' },
  { label: 'EXAMPLE-BUCKET1.s3.amazon.com', value: '1' },
  { label: 'EXAMPLE-BUCKET2.s3.amazon.com', value: '2' },
  { label: 'EXAMPLE-BUCKET3.s3.amazon.com', value: '3' },
  { label: 'EXAMPLE-BUCKET4.s3.amazon.com', value: '4' },
  { label: 'EXAMPLE-BUCKET5.s3.amazon.com', value: '5' },
  { label: 'EXAMPLE-BUCKET6.s3.amazon.com', value: '6' },
];

export const CreateTranscriptionJobPage = () => {
  const {
    actions: { makeHelpPanelHandler },
  } = useStore();
  const { navigate } = useRouter();
  const [pendingJobCreation, setPendingJobCreation] = useState(false);
  const createJob = () => {
    setPendingJobCreation(true);
    setTimeout(() => navigate('transcription-job-list'), 1000);
  };

  const [jobName, setJobName] = useState('');
  const [modelType, setModelType] = useState('general');
  const [languageSetting, setLanguageSetting] = useState('specific-language');
  const [language, setLanguage] = useState({ value: 'English, US (en-US)' });
  const [outputSetting, setOutputSetting] = useState('service-managed');
  const [s3Bucket, setS3Bucket] = useState(null);

  const onJobNameChange = useCallback(event => setJobName(event.detail.value), []);
  const onModelTypeChange = useCallback(event => setModelType(event.detail.value), []);
  const onLanguageSettingChange = useCallback(event => setLanguageSetting(event.detail.value), []);
  const onLanguageChange = useCallback(event => setLanguage(event.detail.selectedOption), []);
  const onOutputSettingChange = useCallback(event => setOutputSetting(event.detail.value), []);
  const onS3BucketChange = useCallback(event => {
    setS3Bucket(event.detail.selectedOption);
  }, []);

  return (
    <CustomAppLayout
      initialHelpPanelPage="create-transcription-job"
      contentType="form"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Service', href: '#root' },
            { text: 'Transcription jobs', href: '#transcription-job-list' },
            { text: 'Create transcription job', href: '#create-transcription-job' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              info={
                <Link variant="info" onFollow={makeHelpPanelHandler('create-transcription-job')}>
                  Info
                </Link>
              }
            >
              Create transcription job
            </Header>
          }
        >
          <form onSubmit={event => event.preventDefault()}>
            <Form
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button variant="link" disabled={pendingJobCreation} href="#transcription-job-list">
                    Cancel
                  </Button>
                  <Hotspot hotspotId="create-job-button">
                    <Button variant="primary" loading={pendingJobCreation} onClick={createJob} ariaLabel="Create job">
                      Create job
                    </Button>
                  </Hotspot>
                </SpaceBetween>
              }
            >
              <SpaceBetween size="xl">
                <Container header={<Header>Job settings</Header>}>
                  <SpaceBetween size="l">
                    <FormField
                      label="Name"
                      constraintText="The name can be up to 200 characters long. Valid characters are a-z, A-Z, 0-9, . (period), _ (underscore) and - (hyphen)."
                      info={
                        <Link
                          variant="info"
                          onFollow={makeHelpPanelHandler('name')}
                          ariaLabel={'Information about transcription job name.'}
                        >
                          Info
                        </Link>
                      }
                    >
                      <Hotspot hotspotId="transcription-job-name">
                        <Input value={jobName} onChange={onJobNameChange} placeholder="MyTranscriptionJob" />
                      </Hotspot>
                    </FormField>
                    <FormField
                      label="Model type"
                      stretch={true}
                      info={
                        <Link variant="info" onFollow={makeHelpPanelHandler('model-type')}>
                          Info
                        </Link>
                      }
                    >
                      <Tiles
                        value={modelType}
                        onChange={onModelTypeChange}
                        items={[
                          {
                            value: 'general',
                            label: 'General model',
                            description:
                              'To use a model that is not specialized for a particular use case, choose this option. Configuration options vary between languages.',
                          },
                          {
                            value: 'custom',
                            label: 'Custom language model',
                            description:
                              'To use a model that you trained for your specific use case, choose this option. This model has fewer configuration options than the general model.',
                          },
                        ]}
                      />
                    </FormField>
                    <FormField
                      label="Language settings"
                      description="You can transcribe your audio file in a language that you specify or have Amazon Transcribe identify and transcribe it in the predominant language."
                      info={
                        <Link variant="info" onFollow={makeHelpPanelHandler('language-settings')}>
                          Info
                        </Link>
                      }
                      stretch={true}
                    >
                      <RadioGroup
                        value={languageSetting}
                        onChange={onLanguageSettingChange}
                        items={[
                          {
                            value: 'specific-language',
                            label: 'Specific language',
                            description:
                              'If you know the language spoken in your source audio, choose this option to get the most accurate results. The options available for additional processing vary between languages.',
                          },
                          {
                            value: 'automatic-language',
                            label: 'Automatic language identification',
                            description: (
                              <>
                                If you don't know the language spoken in your audio files, choose this option. You have
                                access to fewer options for additional processing than if you choose{' '}
                                <b>Specific language</b>.
                              </>
                            ),
                          },
                        ]}
                      />
                    </FormField>
                    <FormField label="Language" description="Choose the language of the input audio.">
                      <Hotspot hotspotId="language-selector">
                        <Select
                          selectedOption={language}
                          onChange={onLanguageChange}
                          disabled={languageSetting === 'automatic-language'}
                          options={[{ value: 'English, US (en-US)' }, { value: 'German (de-DE)' }]}
                        />
                      </Hotspot>
                    </FormField>
                  </SpaceBetween>
                </Container>
                <Container
                  header={
                    <Header
                      info={
                        <Link variant="info" onFollow={makeHelpPanelHandler('input-data')}>
                          Info
                        </Link>
                      }
                    >
                      Input data
                    </Header>
                  }
                >
                  <FormField
                    label="Input file location on S3"
                    description="Choose an input audio or video file in Amazon S3."
                    constraintText="Valid file formats: MP3, MP4, WAV, FLAC, AMR, OGG, and WebM."
                  >
                    <Hotspot hotspotId="input-file-selector">
                      <Select
                        placeholder="Choose an S3 bucket or web server"
                        empty="No origins available"
                        options={availableS3Buckets}
                        selectedOption={s3Bucket}
                        onChange={onS3BucketChange}
                      ></Select>
                    </Hotspot>
                  </FormField>
                </Container>
                <Container header={<Header>Output data</Header>}>
                  <FormField
                    stretch={true}
                    label={
                      <>
                        Choose output location{' '}
                        <Link
                          variant="info"
                          onFollow={makeHelpPanelHandler('choose-output-location')}
                          ariaLabel={'Information about output location.'}
                        >
                          Info
                        </Link>
                      </>
                    }
                  >
                    <RadioGroup
                      value={outputSetting}
                      onChange={onOutputSettingChange}
                      items={[
                        {
                          value: 'service-managed',
                          label: 'Service-managed S3 bucket',
                          description: 'The output will be removed after 90 days when the job expires.',
                        },
                        {
                          value: 'customer-managed',
                          label: 'Customer-specified S3 bucket',
                          description: 'The output will not be removed from the bucket even after the job expires.',
                        },
                      ]}
                    />
                  </FormField>
                </Container>
              </SpaceBetween>
            </Form>
          </form>
        </ContentLayout>
      }
    />
  );
};
