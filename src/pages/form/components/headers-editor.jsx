// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import { Autosuggest, AttributeEditor } from '@cloudscape-design/components';

export default function HeadersEditor({ readOnlyWithErrors = false }) {
  const [items, setItems] = useState([{}]);
  const definitions = [
    {
      label: 'Custom header name',
      control: (item, index) => {
        return (
          <Autosuggest
            placeholder="Enter name"
            clearAriaLabel="Clear"
            empty="No names found"
            onChange={getOnChangeHandler('key', item, index)}
            value={item.key || ''}
            options={[{ value: 'Header-Name-1' }, { value: 'Header-Name-2' }, { value: 'Header-Name-3' }]}
            enteredTextLabel={value => `Use: "${value}"`}
          />
        );
      },
    },
    {
      label: 'Custom header value',
      control: (item, index) => {
        return (
          <Autosuggest
            placeholder="Enter value"
            clearAriaLabel="Clear"
            empty="No values found"
            value={item.value || ''}
            onChange={getOnChangeHandler('value', item, index)}
            options={[{ value: 'Value-1' }, { value: 'Value-2' }, { value: 'Value-3' }]}
            enteredTextLabel={value => `Use: "${value}"`}
          />
        );
      },
    },
  ];

  const onAddHeaderButtonClickHandler = () => {
    !readOnlyWithErrors && setItems([...items, {}]);
  };

  const onRemoveHeaderButtonClickHandler = ({ detail: { itemIndex } }) => {
    if (readOnlyWithErrors) {
      return;
    }

    const itemsCopy = items.slice();
    itemsCopy.splice(itemIndex, 1);
    setItems(itemsCopy);
  };

  const getOnChangeHandler = (key, item, index) => {
    if (readOnlyWithErrors) {
      return () => {
        /*noop*/
      };
    }

    return ({ detail }) => {
      const itemsCopy = items.slice();
      const updatedItem = Object.assign({}, item);
      updatedItem[key] = detail.value;
      itemsCopy.splice(index, 1, updatedItem);
      setItems(itemsCopy);
    };
  };

  return (
    <AttributeEditor
      removeButtonText="Remove"
      addButtonText="Add new header"
      empty="No headers associated with the resource."
      definition={definitions}
      onAddButtonClick={onAddHeaderButtonClickHandler}
      onRemoveButtonClick={onRemoveHeaderButtonClickHandler}
      items={items}
    />
  );
}
