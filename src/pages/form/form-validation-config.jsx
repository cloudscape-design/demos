// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import uniq from 'lodash/uniq';

const validateEmpty = value => value?.length > 0;
const validateURL = value => {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
};
const validateDNS = value => {
  const DNS_NAME = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  let url = value;

  // strip valid url prefixes
  url = url.replace('http://', '');
  url = url.replace('https://', '');
  url = url.replace('www.', '');

  return DNS_NAME.test(url);
};

const validateCNAMEs = value => {
  if (!value) {
    return true;
  }

  const CNAMEs = value.split(',');
  return CNAMEs?.length < 4;
};
const validateFileSize = file => file.size <= 500;

const validateS3Bucket = value => {
  return !value.includes('NO-PERMISSIONS');
};

const specialCharacterRegex = new RegExp(/[^A-Za-z0-9-.]/gm);
const validateSpecialChar = value => {
  const isValid = !specialCharacterRegex.test(value);

  return isValid;
};
const getSpecialCharacters = value => {
  const specialCharacters = value.match(specialCharacterRegex);
  return uniq(specialCharacters);
};

const validationConfig = {
  cloudFrontRootObject: [
    { validate: validateEmpty, errorText: 'Root object is required.' },
    { validate: validateURL, errorText: 'Enter a valid root object.' },
    { validate: validateDNS, errorText: 'Enter a valid root object.' },
  ],
  alternativeDomainNames: [{ validate: validateCNAMEs, errorText: 'Too many CNAMEs.' }],
  certificateExpiryDate: [{ validate: validateEmpty, errorText: 'Certificate expiry date is required.' }],
  certificateExpiryTime: [{ validate: validateEmpty, errorText: 'Certificate expiry time is required.' }],
  s3BucketSelectedOption: [
    { validate: selectedOption => validateEmpty(selectedOption?.value), errorText: 'S3 bucket is required.' },
    {
      validate: selectedOption => validateS3Bucket(selectedOption?.label),
      errorText: "CloudFront isn't allowed to write logs to this bucket.",
    },
  ],
  functions: [{ validate: validateEmpty, errorText: 'File is required.' }],
  functionFile: [{ validate: validateFileSize, errorText: 'File size must be smaller than 0.5 KB.' }],
  originId: [
    { validate: validateEmpty, errorText: 'Origin ID is required.' },
    {
      validate: validateSpecialChar,
      errorText: value => `The name has characters that aren’t valid: ${[...getSpecialCharacters(value)]}`,
    },
  ],
  customHeaders: [{ validate: validateEmpty, errorText: value => `Custom header ${value} is required.` }],
  tags: [{ validate: validateEmpty, errorText: 'Tag key is required.' }],
};

export default function validateField(attribute, value, attemptedToSubmit, customValue) {
  const validations = validationConfig[attribute];

  for (const validation of validations) {
    const { validate, errorText } = validation;

    const isValid = validate(value, attemptedToSubmit);
    if (!isValid) {
      return {
        errorText: typeof errorText === 'function' ? errorText(customValue) : errorText,
      };
    }
  }

  return { errorText: null };
}
