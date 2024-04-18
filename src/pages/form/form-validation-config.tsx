// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import uniq from 'lodash/uniq';
import { SelectProps } from '@cloudscape-design/components';

type FormDataAttributes =
  | 'cloudFrontRootObject'
  | 'alternativeDomainNames'
  | 's3BucketSelectedOption'
  | 'certificateExpiryDate'
  | 'certificateExpiryTime'
  | 'httpVersion'
  | 'ipv6isOn'
  | 'functions'
  | 'originId'
  | 'customHeaders';

const validateEmpty = (value: string | undefined | null | File[]) => Boolean(value && value.length > 0);
const validateURL = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
};
const validateDNS = (value: string) => {
  const DNS_NAME = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  let url = value;

  // strip valid url prefixes
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.replace('www.', '');

  return DNS_NAME.test(url);
};

const validateCNAMEs = (value: string) => {
  if (!value) {
    return true;
  }

  const CNAMEs = value.split(',');
  return CNAMEs?.length < 4;
};
const validateFileSize = (file: File) => file.size <= 500;

const validateS3Bucket = (value: string) => {
  return !value.includes('NO-ACCESS');
};

const specialCharacterRegex = new RegExp(/[^A-Za-z0-9-.]/gm);
const validateSpecialChar = (value: string) => {
  const isValid = !specialCharacterRegex.test(value);

  return isValid;
};
const getSpecialCharacters = (value: string) => {
  const specialCharacters = value.match(specialCharacterRegex);
  return uniq(specialCharacters);
};

type ValidationFunction = (value: any) => boolean;
type ErrorTextFunction = (value: string) => string;

const validationConfig: Record<
  string,
  Array<{ validate: ValidationFunction; errorText: string | ErrorTextFunction }>
> = {
  cloudFrontRootObject: [
    { validate: validateEmpty, errorText: 'Root object is required.' },
    { validate: validateURL, errorText: 'Enter a valid root object.' },
    { validate: validateDNS, errorText: 'Enter a valid root object.' },
  ],
  alternativeDomainNames: [{ validate: validateCNAMEs, errorText: 'Too many CNAMEs.' }],
  certificateExpiryDate: [{ validate: validateEmpty, errorText: 'Certificate expiry date is required.' }],
  certificateExpiryTime: [{ validate: validateEmpty, errorText: 'Certificate expiry time is required.' }],
  s3BucketSelectedOption: [
    {
      validate: (selectedOption: SelectProps.Option) => validateEmpty(selectedOption?.value),
      errorText: 'S3 bucket is required.',
    },
    {
      validate: (selectedOption: SelectProps.Option) => validateS3Bucket(selectedOption?.label || ''),
      errorText:
        "CloudFront isn't allowed to write logs to this bucket. You must enable access control lists (ACL) for the bucket.",
    },
  ],
  functions: [{ validate: validateEmpty, errorText: 'File is required.' }],
  functionFile: [{ validate: validateFileSize, errorText: 'File size must be smaller than 0.5 KB.' }],
  originId: [
    { validate: validateEmpty, errorText: 'Origin ID is required.' },
    {
      validate: validateSpecialChar,
      errorText: (value: string) =>
        `The name has characters that aren’t valid: ${getSpecialCharacters(value).join(', ')}`,
    },
  ],
  customHeaders: [{ validate: validateEmpty, errorText: (value: string) => `Custom header ${value} is required.` }],
  tags: [{ validate: validateEmpty, errorText: 'Tag key is required.' }],
};

export default function validateField(attribute: FormDataAttributes, value: any, customValue: string) {
  const validations = validationConfig[attribute];

  for (const validation of validations) {
    const { validate, errorText } = validation;

    const isValid = validate(value);
    if (!isValid) {
      return {
        errorText: typeof errorText === 'function' ? errorText(customValue) : errorText,
      };
    }
  }

  return { errorText: null };
}
