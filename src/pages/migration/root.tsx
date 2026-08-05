// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useId, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Flashbar from '@cloudscape-design/components/flashbar';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import Modal from '@cloudscape-design/components/modal';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Textarea from '@cloudscape-design/components/textarea';

import { Navigation, navItems } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { BehaviorsTable } from '../details/components/behaviors-table';
import { Breadcrumbs } from '../details/components/breadcrumbs';
import { EmptyTable } from '../details/components/empty-table';
import { OriginsTable } from '../details/components/origins-table';
import { PageHeader } from '../details/components/page-header';
import { SettingsDetails } from '../details/components/settings-details';
import { TAGS_COLUMN_DEFINITIONS } from '../details/details-config';

import '../../styles/base.scss';

const DistSettings = () => (
  <Container header={<Header variant="h2">Distribution settings</Header>}>
    <SettingsDetails isInProgress={false} />
  </Container>
);

interface MigrationBannerProps {
  onClick: () => void;
}

const MigrationBanner = (props: MigrationBannerProps) => {
  const id = useId();
  const [flashbarItems, setFlashbarItems] = useState([
    {
      header: 'Introducing the new CloudFront console experience',
      content: (
        <>
          We've redesigned the CloudFront console to make it easier to use. Continue to use the new console and{' '}
          <Link color="inverted" href="#" onFollow={props.onClick}>
            let us know what you think
          </Link>
          . Or you can{' '}
          <Link color="inverted" href="#" onFollow={event => event.preventDefault()}>
            use the old console
          </Link>
          .
        </>
      ),
      statusIconAriaLabel: 'info',
      dismissLabel: 'Dismiss message',
      dismissible: true,
      onDismiss: () => setFlashbarItems([]),
      id,
    },
  ]);

  return <Flashbar items={flashbarItems} />;
};

interface FeedbackModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const FeedbackModal = (props: FeedbackModalProps) => {
  const feedbackTypeOptions = [
    {
      label: 'General feedback',
      id: 'general',
    },
    {
      label: 'Feature request',
      id: 'feature',
    },
    {
      label: 'Service issue',
      id: 'service',
    },
    {
      label: 'Account issue',
      id: 'account',
    },
    {
      label: 'Contact support',
      id: 'support',
    },
    {
      label: 'Billing inquiry',
      id: 'billing',
    },
  ];

  const feedbackSatisfactionOptions = [
    {
      value: 'neutral',
      label: 'Neutral',
    },
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  const [satisfied, setSatisfied] = useState('neutral');
  const [selectedOption, setSelectedOption] = useState<SelectProps.Option>(feedbackTypeOptions[0]);
  const [message, setMessage] = useState('');
  return (
    <Modal
      visible={props.visible}
      header="Feedback for CloudFront Console"
      closeAriaLabel="Close modal"
      footer={
        <Box variant="span" float="right">
          <SpaceBetween size="s" direction="horizontal">
            <Button onClick={props.onDismiss} variant="link">
              Cancel
            </Button>
            <Button onClick={props.onDismiss} variant="primary">
              Submit feedback
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={props.onDismiss}
    >
      <SpaceBetween size="l">
        <Box variant="p">Thank you for taking the time to provide feedback.</Box>
        <FormField label="Type" description="Choose the type of feedback you are submitting.">
          <Select
            options={feedbackTypeOptions}
            selectedOption={selectedOption}
            onChange={e => setSelectedOption(e.detail.selectedOption)}
            selectedAriaLabel="Selected"
          />
        </FormField>
        <FormField label="Enter your message below.">
          <Textarea value={message} onChange={event => setMessage(event.detail.value)} />
        </FormField>
        <FormField label="Are you satisfied with your experience?">
          <RadioGroup
            value={satisfied}
            onChange={event => setSatisfied(event.detail.value)}
            items={feedbackSatisfactionOptions}
          />
        </FormField>
      </SpaceBetween>
    </Modal>
  );
};

export function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <CustomAppLayout
      content={
        <SpaceBetween size="m">
          <PageHeader
            buttons={[
              { text: 'Edit', itemType: 'action', id: 'edit' },
              { text: 'Delete', itemType: 'action', id: 'delete' },
            ]}
          />
          <SpaceBetween size="l">
            <DistSettings />
            <EmptyTable title="Tag" columnDefinitions={TAGS_COLUMN_DEFINITIONS} />
            <OriginsTable />
            <BehaviorsTable />
            <FeedbackModal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} />
          </SpaceBetween>
        </SpaceBetween>
      }
      breadcrumbs={<Breadcrumbs />}
      navigation={
        <Navigation
          items={navItems?.concat([
            { type: 'divider' },
            {
              type: 'link',
              text: 'Use the old console',
              href: '#/old-console',
            },
          ])}
          activeHref="#/distributions"
          onFollowHandler={event => event.preventDefault()}
        />
      }
      toolsHide={true}
      contentType="default"
      notifications={<MigrationBanner onClick={() => setIsModalVisible(true)} />}
    />
  );
}
