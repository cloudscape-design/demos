// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import {
  Box,
  Container,
  Header,
  FormField,
  RadioGroup,
  SpaceBetween,
  Select,
  Tiles,
} from '@cloudscape-design/components';
import { ENGINES, ENGINE_VERSIONS, ENGINE_EDITIONS, ENGINE_USECASES, ENGINE_DETAILS, LICENSES } from '../steps-config';
import { getFieldOnChange } from '../utils';

export const getEngineLabel = engineOption => ENGINES.find(({ value }) => value === engineOption).label;

export const getEngineLicense = engineOption => LICENSES[engineOption];

const RadioOption = ({ engine, onChange }) => {
  const { edition, engineOption, usecase } = engine;
  const onEditionChange = getFieldOnChange('radio', 'edition', onChange);
  const onUseCaseChange = getFieldOnChange('radio', 'usecase', onChange);

  return ENGINE_EDITIONS[engineOption] ? (
    <FormField label="Edition">
      <RadioGroup value={edition} onChange={onEditionChange} items={ENGINE_EDITIONS[engineOption]} />
    </FormField>
  ) : (
    <FormField label="Use case" stretch={true}>
      <RadioGroup value={usecase} onChange={onUseCaseChange} items={ENGINE_USECASES} />
    </FormField>
  );
};

const Version = ({ engine, onChange }) => {
  const { engineOption, version } = engine;
  const onVersionChange = getFieldOnChange('select', 'version', onChange);
  return (
    <FormField label="Version">
      <Select
        onChange={onVersionChange}
        selectedAriaLabel="Selected"
        selectedOption={version}
        options={ENGINE_VERSIONS[engineOption]}
      />
    </FormField>
  );
};

const Engine = ({ info: { engine }, onChange }) => {
  const { engineOption } = engine;
  const onEngineOptionChange = getFieldOnChange('tile', 'engineOption', onChange);
  const childProps = { engine, onChange };
  return (
    <Box margin={{ bottom: 'l' }}>
      <Container header={<Header variant="h2">Engine options</Header>}>
        <SpaceBetween size="s">
          <Tiles ariaLabel="Engine options" items={ENGINES} value={engineOption} onChange={onEngineOptionChange} />
          <SpaceBetween size="l">
            {ENGINE_DETAILS[engineOption]}
            <div className="custom-screenshot-hide">
              <Box variant="awsui-key-label">License model</Box>
              <div>{getEngineLicense(engineOption)}</div>
            </div>
            <RadioOption {...childProps} />
            {ENGINE_VERSIONS[engineOption] && <Version {...childProps} />}
          </SpaceBetween>
        </SpaceBetween>
      </Container>
    </Box>
  );
};

export default Engine;
