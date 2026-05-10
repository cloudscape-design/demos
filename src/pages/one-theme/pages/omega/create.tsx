// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import Container from '@cloudscape-design/components/container';
import ExpandableSection from '@cloudscape-design/components/expandable-section';
import FileUpload from '@cloudscape-design/components/file-upload';
import Form from '@cloudscape-design/components/form';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import RadioGroup from '@cloudscape-design/components/radio-group';
import SegmentedControl from '@cloudscape-design/components/segmented-control';
import type { SelectProps } from '@cloudscape-design/components/select';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Textarea from '@cloudscape-design/components/textarea';

const FRAMEWORK_OPTIONS: SelectProps.Option[] = [
  { label: 'Other', value: 'other' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Next.js', value: 'next' },
];

// Read-only Inputs still need an onChange handler.
const noop = () => undefined;

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [projectName, setProjectName] = useState('');
  const [build, setBuild] = useState(true);
  const [rootDir] = useState('./');
  const [framework, setFramework] = useState<SelectProps.Option>(FRAMEWORK_OPTIONS[0]);
  const [installCmd, setInstallCmd] = useState('npm install');
  const [buildCmd, setBuildCmd] = useState('npm run build');
  const [outputDir, setOutputDir] = useState('dist');
  const [envMode, setEnvMode] = useState('upload');
  const [envFiles, setEnvFiles] = useState<File[]>([]);
  const [envBulk, setEnvBulk] = useState('');
  const [rolePermission, setRolePermission] = useState('create');

  const onFileSelect = (selected: File[]) => {
    setFiles(selected);
    if (selected[0] && !projectName) {
      const base = selected[0].name.replace(/\.zip$/i, '');
      setProjectName(`${base}-7e5d`);
    }
  };

  if (files.length === 0) {
    return (
      <SpaceBetween size="l">
        <Header variant="h1" description="Upload a .zip of your project to get started.">
          Create project
        </Header>
        <Container>
          <FormField label="Upload project" description="Upload a .zip file containing your project.">
            <FileUpload
              value={files}
              onChange={({ detail }) => onFileSelect([...detail.value])}
              accept=".zip"
              i18nStrings={{
                uploadButtonText: () => 'Choose .zip file',
                dropzoneText: () => 'Drop .zip file to upload',
                removeFileAriaLabel: i => `Remove file ${i + 1}`,
                errorIconAriaLabel: 'Error',
              }}
              constraintText="Accepts a single .zip file."
            />
          </FormField>
        </Container>
      </SpaceBetween>
    );
  }

  return (
    <Form
      header={
        <Header variant="h1" description="Configure project name and optional settings.">
          Configure your project
        </Header>
      }
      actions={
        <SpaceBetween direction="horizontal" size="xs">
          <Button variant="link" onClick={() => navigate('/omega')}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate('/omega')}>
            Deploy
          </Button>
        </SpaceBetween>
      }
    >
      <SpaceBetween size="l">
        <Container>
          <FileUpload
            value={files}
            onChange={({ detail }) => onFileSelect([...detail.value])}
            accept=".zip"
            i18nStrings={{
              uploadButtonText: () => 'Choose .zip file',
              dropzoneText: () => 'Drop .zip file to upload',
              removeFileAriaLabel: i => `Remove file ${i + 1}`,
              errorIconAriaLabel: 'Error',
            }}
          />
        </Container>

        <Container>
          <SpaceBetween size="l">
            <FormField label="Project name">
              <Input value={projectName} onChange={({ detail }) => setProjectName(detail.value)} />
            </FormField>

            <Checkbox
              checked={build}
              onChange={({ detail }) => setBuild(detail.checked)}
              description="My zip contains source code that needs to be built"
            >
              Build
            </Checkbox>

            {build && (
              <>
                <FormField label="Root directory">
                  <SpaceBetween direction="horizontal" size="xs">
                    <Input value={rootDir} readOnly={true} onChange={noop} />
                    <Button>Edit</Button>
                  </SpaceBetween>
                </FormField>
                <FormField label="Framework">
                  <Select
                    selectedOption={framework}
                    onChange={({ detail }) => setFramework(detail.selectedOption)}
                    options={FRAMEWORK_OPTIONS}
                  />
                </FormField>
              </>
            )}
          </SpaceBetween>
        </Container>

        <Container header={<Header variant="h2">Optional settings</Header>}>
          <SpaceBetween size="l">
            <ExpandableSection headerText="Customize build settings" defaultExpanded={true}>
              <SpaceBetween size="l">
                <FormField label="Install command">
                  <Input value={installCmd} onChange={({ detail }) => setInstallCmd(detail.value)} />
                </FormField>
                <FormField label="Build command">
                  <Input value={buildCmd} onChange={({ detail }) => setBuildCmd(detail.value)} />
                </FormField>
                <FormField label="Output directory">
                  <Input value={outputDir} onChange={({ detail }) => setOutputDir(detail.value)} />
                </FormField>
              </SpaceBetween>
            </ExpandableSection>
            <ExpandableSection headerText="Add environment variables">
              <FormField
                label="Environment variables"
                description="Add environment variables via file upload or bulk paste. Variables marked as secret will have unreadable values after saving."
              >
                <SpaceBetween size="s">
                  <SegmentedControl
                    selectedId={envMode}
                    onChange={({ detail }) => setEnvMode(detail.selectedId)}
                    options={[
                      { id: 'upload', text: 'Upload .env' },
                      { id: 'bulk', text: 'Bulk input' },
                    ]}
                  />
                  {envMode === 'upload' ? (
                    <FileUpload
                      value={envFiles}
                      onChange={({ detail }) => setEnvFiles([...detail.value])}
                      accept=".env"
                      i18nStrings={{
                        uploadButtonText: () => 'Drag-and-drop or click to upload a .env file',
                        dropzoneText: () => 'Drop .env file to upload',
                        removeFileAriaLabel: i => `Remove file ${i + 1}`,
                        errorIconAriaLabel: 'Error',
                      }}
                    />
                  ) : (
                    <Textarea
                      value={envBulk}
                      onChange={({ detail }) => setEnvBulk(detail.value)}
                      placeholder={'KEY=value\nANOTHER_KEY=another_value'}
                      rows={8}
                    />
                  )}
                </SpaceBetween>
              </FormField>
            </ExpandableSection>
            <ExpandableSection headerText="Configure advanced settings">
              <FormField label="Permissions" description="Grants access to AWS resources during build and runtime">
                <RadioGroup
                  value={rolePermission}
                  onChange={({ detail }) => setRolePermission(detail.value)}
                  items={[
                    { value: 'create', label: 'Create a new role' },
                    { value: 'existing', label: 'Use an existing role' },
                  ]}
                />
              </FormField>
            </ExpandableSection>
          </SpaceBetween>
        </Container>
      </SpaceBetween>
    </Form>
  );
}
