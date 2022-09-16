// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { amazonS3Data } from './mock-data';

amazonS3Data.map(bucket => {
  bucket.__objects = [...bucket.__folders, ...bucket.__objects];
});

const randomDelay = (min = 500) => ~~(Math.random() * 500) + min;

const findItem = (items, name, itemsType) => {
  const item = items.filter(item => item.Name === name || item.Key === name)[0];
  if (!item) {
    throw `"${name}" ${itemsType.substr(0, itemsType.length - 1)} doesn't exist`;
  }
  return item;
};

const getItemsType = item => {
  return Object.keys(item)
    .filter(key => key === '__objects' || key === '__versions')[0]
    .replace('__', '');
};

export const getItems = (resourceType, bucket, path) => {
  const entities = [];
  if (bucket) {
    entities.push(bucket);
  }
  if (path && path.length > 0) {
    entities.push(...path.split('/'));
  }

  let items = amazonS3Data;
  let itemsType = 'buckets';
  let item;

  for (const entity of entities) {
    try {
      item = findItem(items, entity, itemsType);
    } catch (e) {
      throw new Error(`Resource "s3://${bucket}/${path}" cannot be found: ${e}`);
    }
    itemsType = getItemsType(item);
    if (item.__error) {
      const error = new Error(item.__error.content);
      error.type = item.__error.type;
      error.header = item.__error.header;
      throw error;
    }
    items = item['__' + itemsType];
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(items);
    }, randomDelay());
  });
};

export const requestAsyncAttribute = (item, name) => {
  return new Promise(resolve => {
    setTimeout(() => {
      item[name] = item['__' + name.toLowerCase()];
      resolve();
    }, randomDelay(1000));
  });
};
