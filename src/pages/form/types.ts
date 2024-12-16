// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Ref, RefObject } from 'react';

import {
  AttributeEditorProps,
  CodeEditorProps,
  DatePickerProps,
  FileUploadProps,
  InputProps,
  SelectProps,
  TagEditorProps,
  TextareaProps,
} from '@cloudscape-design/components';
import { OptionDefinition } from '@cloudscape-design/components/internal/components/option/interfaces';

export interface CustomHeader {
  key: string;
  keyError?: string;
  keyWarning?: string;
  value: string;
  valueError?: string;
  valueWarning?: string;
}

export interface FormDataAttributesValues {
  sslCertificate: string;
  cloudFrontRootObject: string;
  alternativeDomainNames: string;
  s3BucketSelectedOption: OptionDefinition | null;
  certificateExpiryDate: string;
  certificateExpiryTime: string;
  httpVersion: string;
  ipv6isOn: boolean;
  functions: File[];
  originId: string;
  customHeaders: CustomHeader[];
  codeEditor: string;
  functionFiles: File[];
  tags: string;
  functionFile: File | undefined;
}

// Errors associated with each field
export interface FormDataAttributesErrors {
  sslCertificate: string;
  cloudFrontRootObject: string;
  alternativeDomainNames: string;
  s3BucketSelectedOption: string;
  certificateExpiryDate: string;
  certificateExpiryTime: string;
  httpVersion: string;
  ipv6isOn: string;
  functions: string;
  customHeaders: string;
  functionFiles: string[];
  tags: string;
  originId: string;
  codeEditor: string;
  functionFile: string;
}

// Keys of the data attributes
export type FormDataAttributesKeys = keyof FormDataAttributesValues;

export interface FormRefs {
  cloudFrontRootObject: RefObject<InputProps.Ref>;
  alternativeDomainNames: RefObject<TextareaProps.Ref>;
  s3BucketSelectedOption: RefObject<SelectProps.Ref>;
  certificateExpiryDate: RefObject<DatePickerProps.Ref>;
  certificateExpiryTime: Ref<HTMLInputElement>;
  functions: RefObject<FileUploadProps.Ref>;
  originId: Ref<HTMLInputElement>;
  customHeaders: RefObject<AttributeEditorProps.Ref>;
  codeEditor: RefObject<CodeEditorProps.Ref>;
  tags: RefObject<TagEditorProps.Ref>;
}
