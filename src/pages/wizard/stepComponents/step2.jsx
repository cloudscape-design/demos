// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Alert,
  Box,
  Container,
  Header,
  ColumnLayout,
  ExpandableSection,
  FormField,
  Input,
  RadioGroup,
  SpaceBetween,
  Select,
} from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import { CLASS_OPTIONS, TIME_ZONES, AVAILABILITY_ZONES, STORAGE_TYPES, TOOLS_CONTENT } from '../steps-config';
import { getFieldOnChange } from '../utils';

const { details: detailsToolsContent } = TOOLS_CONTENT;

const InstanceOptions = ({
  timeZone,
  availabilityZone,
  port,
  iamAuth,
  instanceClass,
  storageType,
  storage,
  onChange,
  setHelpPanelContent,
}) => {
  const onTimeZoneChange = getFieldOnChange('select', 'timeZone', onChange);
  const onAvailabilityZoneChange = getFieldOnChange('select', 'availabilityZone', onChange);
  const onPortChange = getFieldOnChange('input', 'port', onChange);
  const onIamAuthChange = getFieldOnChange('radio', 'iamAuth', onChange);
  const onInstanceClassChange = getFieldOnChange('select', 'instanceClass', onChange);
  const onStorageTypeChange = getFieldOnChange('radio', 'storageType', onChange);
  const onStorageChange = getFieldOnChange('input', 'storage', onChange);

  return (
    <Container
      header={<Header variant="h2">Instance options</Header>}
      footer={
        <ExpandableSection headerText="Additional options" variant="footer">
          <SpaceBetween size="l">
            <FormField
              label={
                <>
                  Time zone <i>- optional</i>
                </>
              }
            >
              <Select
                options={TIME_ZONES}
                onChange={onTimeZoneChange}
                selectedAriaLabel="Selected"
                selectedOption={timeZone}
              />
            </FormField>
            <FormField label="Availability zone">
              <Select
                options={AVAILABILITY_ZONES}
                onChange={onAvailabilityZoneChange}
                selectedAriaLabel="Selected"
                selectedOption={availabilityZone}
              />
            </FormField>
            <FormField
              label="Database port"
              description="TCP/IP port the DB instance will use for application connections."
            >
              <Input type="number" value={port} onChange={onPortChange} />
            </FormField>
            <FormField
              label="IAM DB authentication"
              info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.iamAuth)} />}
              stretch={true}
            >
              <RadioGroup
                items={[
                  {
                    value: 'on',
                    label: 'Turn on IAM DB authentication',
                    description: 'Manage your database user credentials through AWS IAM users and roles.',
                  },
                  {
                    value: 'off',
                    label: 'Turn off IAM DB authentication',
                  },
                ]}
                value={iamAuth}
                onChange={onIamAuthChange}
              />
            </FormField>
          </SpaceBetween>
        </ExpandableSection>
      }
    >
      <SpaceBetween size="l">
        <FormField
          label="Class"
          info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.instanceClass)} />}
          description="Instance class allocates the computational, network, and memory capacity required by planned workload of this DB instance."
        >
          <Select
            options={CLASS_OPTIONS}
            onChange={onInstanceClassChange}
            selectedAriaLabel="Selected"
            selectedOption={instanceClass}
          />
        </FormField>

        <FormField
          label="Storage type"
          info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.storageType)} />}
          stretch={true}
        >
          <RadioGroup onChange={onStorageTypeChange} items={STORAGE_TYPES} value={storageType} />
        </FormField>
        <FormField
          label="Allocated storage"
          description="Higher allocated storage may improve IOPS performance."
          constraintText="Min: 20, Max: 16384."
        >
          <div className="custom-input-small">
            <Input type="number" autocomplete={true} controlId="storage" value={storage} onChange={onStorageChange} />
          </div>
          <Box variant="span" padding={{ left: 's' }}>
            GiB
          </Box>
        </FormField>
        <Alert type="info" statusIconAriaLabel="Info">
          Provisioning less than 100 GiB of General Purpose (SSD) storage for high throughput workloads could result in
          higher latencies upon exhaustion of the initial General Purpose (SSD) IO credit balance.
        </Alert>
      </SpaceBetween>
    </Container>
  );
};

const NameAndPassword = ({ identifier, username, password, confirmPassword, onChange, setHelpPanelContent }) => {
  const onIdentifierChange = getFieldOnChange('input', 'identifier', onChange);
  const onUsernameChange = getFieldOnChange('input', 'username', onChange);
  const onPasswordChange = getFieldOnChange('input', 'password', onChange);
  const onConfirmPasswordChange = getFieldOnChange('input', 'confirmPassword', onChange);

  return (
    <Container header={<Header variant="h2">Names and password</Header>}>
      <SpaceBetween size="l">
        <FormField
          label="DB instance identifier"
          info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.identifier)} />}
          description="A name that is unique for all DB instances owned by your AWS account in the current region."
          constraintText="Case insensitive, but stored as all lower-case. Must contain from 1 to 63 alphanumeric characters or hyphens  (1 to 15 for SQL Server). First character must be a letter. Cannot end with a hyphen or contain two consecutive hyphens."
        >
          <Input placeholder="example-instance-identifier" value={identifier} onChange={onIdentifierChange} />
        </FormField>
        <FormField
          label="Primary user name"
          info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.username)} />}
          description="A string that defines the login ID for the primary user."
          constraintText="Must start with a letter. Must contain 1 to 64 alphanumeric characters."
        >
          <Input placeholder="example-username" value={username} onChange={onUsernameChange} />
        </FormField>
        <ColumnLayout columns={2}>
          <FormField
            label="Primary password"
            info={<InfoLink onFollow={() => setHelpPanelContent(detailsToolsContent.password)} />}
            constraintText="Must be at least eight characters long. Can be any printable ASCII character except “/”, ““”, or “@”."
          >
            <Input type="password" value={password} onChange={onPasswordChange} />
          </FormField>
          <FormField label="Confirm password">
            <Input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
          </FormField>
        </ColumnLayout>
      </SpaceBetween>
    </Container>
  );
};

const Details = ({ info: { details }, setHelpPanelContent, onChange }) => {
  const childProps = { ...details, setHelpPanelContent, onChange };
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <InstanceOptions {...childProps} />
        <NameAndPassword {...childProps} />
      </SpaceBetween>
    </Box>
  );
};
export default Details;
