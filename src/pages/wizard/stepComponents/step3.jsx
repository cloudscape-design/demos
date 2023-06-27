// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Box,
  Container,
  Header,
  ExpandableSection,
  FormField,
  RadioGroup,
  SpaceBetween,
  Select,
} from '@cloudscape-design/components';
import { InfoLink } from '../../commons/common-components';
import {
  VPC_OPTIONS,
  SUBNET_OPTIONS,
  SECURITY_GROUPS,
  FAILOVER_PRIORITIES,
  BACKUP_PERIODS,
  TOOLS_CONTENT,
} from '../steps-config';
import { getFieldOnChange } from '../utils';

const { advanced: advancedToolsContent } = TOOLS_CONTENT;

const NetworkAndSecurity = ({
  vpc,
  subnet,
  securityGroups,
  accessibility,
  encryption,
  onChange,
  setHelpPanelContent,
}) => {
  const onVPCChange = getFieldOnChange('select', 'vpc', onChange);
  const onSubnetChange = getFieldOnChange('select', 'subnet', onChange);
  const onSecurityGroupChange = getFieldOnChange('select', 'securityGroups', onChange);
  const onAccessibilityChange = getFieldOnChange('radio', 'accessibility', onChange);
  const onEncryptionChange = getFieldOnChange('radio', 'encryption', onChange);

  return (
    <Container header={<Header variant="h2">Network and security</Header>}>
      <SpaceBetween size="l">
        <FormField
          label="Virtual Private Cloud (VPC)"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.vpc)} />}
          description="VPC defines the virtual networking environment for this DB instance."
        >
          <Select onChange={onVPCChange} selectedAriaLabel="Selected" selectedOption={vpc} options={VPC_OPTIONS} />
        </FormField>
        <FormField
          label="Subnet group"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.subnet)} />}
          description="Subnet group that defines which subnets and IP ranges the DB instance can use in the VPC you selected."
        >
          <Select
            onChange={onSubnetChange}
            selectedAriaLabel="Selected"
            selectedOption={subnet}
            options={SUBNET_OPTIONS}
          />
        </FormField>
        <FormField
          label="VPC security groups"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.securityGroups)} />}
          description="Security groups have rules authorizing connections from all the EC2 instances and devices that need to access the DB instance."
        >
          <Select
            selectedAriaLabel="Selected"
            onChange={onSecurityGroupChange}
            selectedOption={securityGroups}
            options={SECURITY_GROUPS}
          />
        </FormField>
        <FormField
          label="Public accessibility"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.accessibility)} />}
          stretch={true}
        >
          <RadioGroup
            onChange={onAccessibilityChange}
            items={[
              {
                value: 'on',
                label: 'Turn on public connection',
                description:
                  'EC2 instances and devices outside of the VPC hosting the DB instance will connect to the DB instances. You must also select one or more VPC security groups that specify which EC2 instances and devices can connect to the DB instance.',
              },
              {
                value: 'off',
                label: 'Turn off public connection',
                description:
                  'DB instance will not have a public IP address assigned. No EC2 instance or devices outside of the VPC will be able to connect.',
              },
            ]}
            value={accessibility}
          />
        </FormField>
        <FormField
          label="Encryption"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.encryption)} />}
          stretch={true}
        >
          <RadioGroup
            onChange={onEncryptionChange}
            items={[
              {
                value: 'on',
                label: 'Turn on encryption',
                description:
                  'Encrypts the given instance. Primary key ids and aliases appear in the list after they have been created using the Key Management Service (KMS) console.',
              },
              { value: 'off', label: 'Turn off encryption' },
            ]}
            value={encryption}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};

const MaintenanceAndMonitoring = ({
  failover,
  backtrack,
  upgrades,
  backup,
  monitoring,
  onChange,
  setHelpPanelContent,
}) => {
  const onFailoverChange = getFieldOnChange('select', 'failover', onChange);
  const onBacktrackChange = getFieldOnChange('radio', 'backtrack', onChange);
  const onUpgradesChange = getFieldOnChange('radio', 'upgrades', onChange);
  const onBackupChange = getFieldOnChange('select', 'backup', onChange);
  const onMonitoringChange = getFieldOnChange('radio', 'monitoring', onChange);

  return (
    <Container
      header={<Header variant="h2">Maintenance and monitoring</Header>}
      footer={
        <ExpandableSection headerText="Additional settings" variant="footer">
          <SpaceBetween size="l">
            <FormField
              label="Failover priority"
              info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.failover)} />}
            >
              <Select
                options={FAILOVER_PRIORITIES}
                onChange={onFailoverChange}
                selectedAriaLabel="Selected"
                selectedOption={failover}
              />
            </FormField>

            <FormField
              label="Backtrack"
              info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.backtrack)} />}
              stretch={true}
            >
              <RadioGroup
                items={[
                  {
                    value: 'on',
                    label: 'Turn on backtrack',
                    description:
                      'Backtrack lets you quickly move an Aurora database to a prior point in time without needing to restore data from a backup.',
                  },
                  { value: 'off', label: 'Turn off backtrack' },
                ]}
                value={backtrack}
                onChange={onBacktrackChange}
              />
            </FormField>
          </SpaceBetween>
        </ExpandableSection>
      }
    >
      <SpaceBetween size="l">
        <FormField label="Automatic minor version upgrades" stretch={true}>
          <RadioGroup
            items={[
              {
                value: 'on',
                label: 'Turn on auto minor version upgrade',
                description:
                  'Activates automatic upgrades to new minor versions as they are released. The automatic upgrades occur during the maintenance window for the DB instance.',
              },
              { value: 'off', label: 'Turn off auto minor version upgrade' },
            ]}
            value={upgrades}
            onChange={onUpgradesChange}
          />
        </FormField>

        <FormField label="Backup retention period">
          <Select
            options={BACKUP_PERIODS}
            onChange={onBackupChange}
            selectedAriaLabel="Selected"
            selectedOption={backup}
          />
        </FormField>
        <FormField
          label="Enhanced monitoring"
          info={<InfoLink onFollow={() => setHelpPanelContent(advancedToolsContent.monitoring)} />}
          stretch={true}
        >
          <RadioGroup
            onChange={onMonitoringChange}
            items={[
              {
                value: 'on',
                label: 'Turn on enhanced monitoring',
                description:
                  'Enhanced monitoring metrics are useful when you want to see how different processes or threads use the CPU.',
              },
              { value: 'off', label: 'Turn off enhanced monitoring' },
            ]}
            value={monitoring}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  );
};

const Advanced = ({ info: { advanced }, setHelpPanelContent, onChange }) => {
  const childProps = { ...advanced, setHelpPanelContent, onChange };
  return (
    <Box margin={{ bottom: 'l' }}>
      <SpaceBetween size="l">
        <NetworkAndSecurity {...childProps} />
        <MaintenanceAndMonitoring {...childProps} />
      </SpaceBetween>
    </Box>
  );
};

export default Advanced;
