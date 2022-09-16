// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export const getFieldOnChange =
  (fieldType, fieldKey, onChangeFn) =>
  ({ detail: { selectedOption, value } }) =>
    onChangeFn({
      [fieldKey]: fieldType === 'select' ? selectedOption : value,
    });
