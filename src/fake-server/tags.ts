// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import tagsData from '../resources/tags.json';
import { TagsResource } from '../resources/types';
import fakeDelay from './utils/fake-delay';

// Mimic AWS SDK API method to return a similar shape to be used by the component
// @see https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/API_GetResources.html
export async function GetResources() {
  await fakeDelay();
  const { resourceTags }: TagsResource = tagsData;
  return {
    ResourceTagMappingList: [
      {
        Tags: resourceTags,
      },
    ],
  };
}

// @see https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/API_GetTagValues.html
export async function GetTagValues(key: keyof TagsResource['valueMap']) {
  if (!key) {
    return Promise.reject();
  }
  await fakeDelay();
  const { valueMap }: TagsResource = tagsData;
  return {
    TagValues: valueMap[key] || [],
  };
}

// @see https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/API_GetTagKeys.html
export async function GetTagKeys() {
  await fakeDelay();
  const { valueMap }: TagsResource = tagsData;
  return {
    TagKeys: Object.keys(valueMap),
  };
}
