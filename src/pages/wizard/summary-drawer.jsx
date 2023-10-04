// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as React from 'react';
import { HelpPanel } from '@cloudscape-design/components';
import { Box, ColumnLayout, ExpandableSection, Header, SpaceBetween } from '@cloudscape-design/components';
import { getEngineLabel, getEngineLicense } from './stepComponents/step1';

const SummaryDrawer = ({ info: { engine, details, advanced }, activeStepIndex }) => {
  return (
    <HelpPanel header={<h2>Summary</h2>}>
      {' '}
      <Box margin={{ bottom: 'l' }}>
        <SpaceBetween size="xxl">
          <SpaceBetween size="xs" className="step-1-review">
            <Header variant="h3">Step 1: Engine type</Header>
            <ExpandableSection headerText="Engine options">
              <ColumnLayout columns={2} variant="text-grid">
                <div>
                  <Box variant="awsui-key-label">Engine</Box>
                  <div>{getEngineLabel(engine.engineOption)}</div>
                </div>

                <div>
                  <Box variant="awsui-key-label">License model</Box>
                  <div>{getEngineLicense(engine.engineOption)}</div>
                </div>

                {engine.engineOption === 'aurora' ? (
                  <div>
                    <Box variant="awsui-key-label">Edition</Box>
                    <div>{engine.edition}</div>
                  </div>
                ) : (
                  <div>
                    <Box variant="awsui-key-label">Use case</Box>
                    <div>{engine.usecase}</div>
                  </div>
                )}

                {engine.engineOption !== 'aurora' ? (
                  <div>
                    <Box variant="awsui-key-label">Version</Box>
                    <div>{engine.version.label}</div>
                  </div>
                ) : null}
              </ColumnLayout>
            </ExpandableSection>
          </SpaceBetween>

          {activeStepIndex > 0 && (
            <SpaceBetween size="xs" className="step-2-review">
              <Header variant="h3" headingTagOverride="h3">
                Step 2: Instance details
              </Header>
              <ExpandableSection headerText="Instance options">
                <SpaceBetween size="l">
                  <ColumnLayout columns={2} variant="text-grid">
                    <div>
                      <Box variant="awsui-key-label">Class</Box>
                      <div>{details.instanceClass.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Storage type</Box>
                      <div>{details.storageType}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Allocated storage</Box>
                      <div>{details.storage} GiB</div>
                    </div>
                    <div>
                      <Box variant="awsui-key-label">Time zone</Box>
                      <div>{details.timeZone.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Availability zone</Box>
                      <div>{details.availabilityZone.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Database port</Box>
                      <div>{details.port}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">IAM DB authentication</Box>
                      <div>{details.iamAuth}</div>
                    </div>
                  </ColumnLayout>
                </SpaceBetween>
              </ExpandableSection>
              <ExpandableSection headerText="Names and password">
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">DB instance identifier</Box>
                    <div>{details.identifier || 'example-instance-identifier'}</div>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Primary username</Box>
                    <div>{details.username || 'example-username'}</div>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Primary password</Box>
                    <div>example-password</div>
                  </div>
                </ColumnLayout>
              </ExpandableSection>
            </SpaceBetween>
          )}

          {activeStepIndex > 1 && (
            <SpaceBetween size="xs" className="step-3-review">
              <Header variant="h3" headingTagOverride="h3">
                Step 3: Settings
              </Header>
              <ExpandableSection headerText="Network and security">
                <SpaceBetween size="l">
                  <ColumnLayout columns={2} variant="text-grid">
                    <div>
                      <Box variant="awsui-key-label">Virtual Private Cloud (VPC)</Box>
                      <div>{advanced.vpc.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Subnet group</Box>
                      <div>{advanced.subnet.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">VPC security groups</Box>
                      <div>{advanced.securityGroups.label}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Public accessibility</Box>
                      <div>{advanced.accessibility}</div>
                    </div>

                    <div>
                      <Box variant="awsui-key-label">Encryption</Box>
                      <div>{advanced.encryption}</div>
                    </div>
                  </ColumnLayout>
                </SpaceBetween>
              </ExpandableSection>
              <ExpandableSection headerText="Maintenance and monitoring">
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">Auto minor version upgrades</Box>
                    <div>{advanced.upgrades}</div>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Backup retention period</Box>
                    <div>{advanced.backup.label}</div>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Enhanced monitoring</Box>
                    <div>{advanced.monitoring}</div>
                  </div>
                </ColumnLayout>
                <ColumnLayout columns={2} variant="text-grid">
                  <div>
                    <Box variant="awsui-key-label">Failover priority</Box>
                    <div>{advanced.failover.label}</div>
                  </div>

                  <div>
                    <Box variant="awsui-key-label">Backtrack</Box>
                    <div>{advanced.backtrack}</div>
                  </div>
                </ColumnLayout>
              </ExpandableSection>
            </SpaceBetween>
          )}
        </SpaceBetween>
      </Box>
    </HelpPanel>
  );
};

export default SummaryDrawer;
