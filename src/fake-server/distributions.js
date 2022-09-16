// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import fetchJson from './utils/fetch-json';

let items = [];
let filteringProperties = [];

function createComparator(options) {
  const qualifier = options.sortingDescending ? -1 : 1;
  const field = options.sortingColumn;
  return (a, b) => (a[field] > b[field] ? qualifier : -qualifier);
}

const getComparatorForOperator = operator => (a, b) => {
  switch (operator) {
    case '=':
      // eslint-disable-next-line eqeqeq
      return a == b;
    case '!=':
      // eslint-disable-next-line eqeqeq
      return a != b;
    case ':':
      return (a + '').toLowerCase().indexOf((b + '').toLowerCase()) > -1;
    case '!:':
      return (a + '').toLowerCase().indexOf((b + '').toLowerCase()) === -1;
  }
  return false;
};

function filterItemsByProperty(options) {
  const operationFn = operation => {
    switch (operation) {
      case 'or':
        return (value1, value2) => value1 || value2;
      case 'and':
      default:
        return (value1, value2) => value1 && value2;
    }
  };

  const match = (propertyKey, searchText, item, compareFn) => {
    // specific tag
    if (propertyKey.startsWith('tag-indicator__')) {
      const tagKey = propertyKey.split('__')[1];

      if (item.tags[tagKey]) {
        return item.tags[tagKey].some(tag => compareFn(tag, searchText));
      }

      return false;
    }

    // a property
    return compareFn(item[propertyKey], searchText);
  };

  const filteringFunction = function (item, tokens, operation) {
    const opFn = operationFn(operation);
    return tokens.reduce((include, token) => {
      const comparator = getComparatorForOperator(token.operator);
      const searchableProps = token.propertyKey ? [token.propertyKey] : Object.keys(item);

      return searchableProps.some(propertyKey => {
        const matched = match(propertyKey, token.value, item, comparator);
        return opFn(include, matched);
      });
    }, operation === 'and');
  };

  return items.filter(item => filteringFunction(item, options.filteringTokens, options.filteringOperation));
}

function filterItemsByText({ filteringText, filteringOptions }) {
  return items.filter(item => {
    for (const prop in item) {
      if (typeof item[prop] !== 'string') {
        // we search only in string properties;
        continue;
      }

      const matchesText = item[prop] && item[prop].toLowerCase().indexOf(filteringText.toLowerCase()) !== -1;
      let matchesProp = false;

      if (filteringOptions) {
        matchesProp =
          Object.prototype.hasOwnProperty.call(item, prop) &&
          prop.toLowerCase().indexOf(filteringText.toLowerCase()) !== -1;
      }

      if (matchesText || matchesProp) {
        return true;
      }
    }
    return false;
  });
}

function filterItems(options) {
  return options.filteringTokens ? filterItemsByProperty(options) : filterItemsByText(options);
}

function prepareResponse(options) {
  const output = { filteringProperties };
  const shouldFilter =
    (options.filteringText && !options.filteringTokens) || (options.filteringTokens && options.filteringTokens.length);

  output.items = shouldFilter ? filterItems(options) : items.slice();

  if (filteringProperties) {
    const filteringOptions = [];
    const filteredPropertyKeys = options.filteringPropertyKey
      ? [options.filteringPropertyKey]
      : filteringProperties.map(property => property.key);
    // an object used as a set to ensure uniqueness of the generated filtering options
    const addedFilteringOptions = {};
    const addFilteringOption = (propertyKey, value) => {
      const id = propertyKey + '#' + value;
      if (!addedFilteringOptions[id]) {
        filteringOptions.push({ propertyKey, value });
      }
      addedFilteringOptions[id] = true;
    };
    items.forEach(item => {
      filteredPropertyKeys.forEach(propertyKey => {
        if (propertyKey.startsWith('tag-indicator__')) {
          const tagKey = propertyKey.split('__')[1];
          if (item.tags[tagKey]) {
            item.tags[tagKey].forEach(tagValue => {
              addFilteringOption(propertyKey, tagValue);
            });
          }
        } else {
          addFilteringOption(propertyKey, item[propertyKey]);
        }
      });
    });

    output.filteringOptions = filteringOptions;
  } else {
    output.filteringOptions = [];
  }

  if (options.sortingColumn) {
    output.items.sort(createComparator(options));
  }

  if (options.pageSize && options.currentPageIndex) {
    const pageSize = options.pageSize;
    const currentItems = output.items;
    let currentPageIndex = options.currentPageIndex;
    if ((currentPageIndex - 1) * pageSize >= currentItems.length) {
      currentPageIndex = 1;
    }

    output.pagesCount = Math.ceil(currentItems.length / pageSize);
    output.currentPageIndex = currentPageIndex;
    output.items = currentItems.slice((currentPageIndex - 1) * pageSize, currentPageIndex * pageSize);
  } else {
    output.pagesCount = 1;
    output.currentPageIndex = 1;
  }

  return output;
}

export function fetchDistributions(options = {}, callback) {
  if (items.length === 0) {
    fetchJson('../resources/distributions.json').then(response => {
      items = response;
      if (options.filteringOptions) {
        fetchDistributionFilteringOptions(options, callback);
      } else {
        setTimeout(() => callback(prepareResponse(options)), 500);
      }
    });
  } else {
    setTimeout(() => callback(prepareResponse(options)), 500);
  }
}

export function fetchDistributionFilteringOptions(options, callback) {
  fetchJson('../resources/distributionsFilteringProperties.json').then(response => {
    filteringProperties = response;
    setTimeout(() => callback(prepareResponse(options)), 500);
  });
}
