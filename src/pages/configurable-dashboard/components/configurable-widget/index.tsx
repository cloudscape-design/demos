// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';
import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
import BoardItem from '@cloudscape-design/board-components/board-item';
import { WidgetDataType } from '../../../dashboard/widgets/interfaces';
import { boardItemI18nStrings } from '../../i18n-strings';
import { RemoveDialog } from './remove-dialog';

interface BaseWidgetProps {
  config: WidgetDataType;
  onRemove: () => void;
  removeConfirmationText?: string;
  actions?: ReadonlyArray<{ text: string; onClick: () => void }>;
}

export function ConfigurableWidget({ config, onRemove, actions = [], removeConfirmationText }: BaseWidgetProps) {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  return (
    <>
      <BoardItem
        header={<config.header />}
        disableContentPaddings={config.disableContentPaddings}
        i18nStrings={boardItemI18nStrings}
        settings={
          <ButtonDropdown
            items={[
              ...actions.map(action => ({ id: action.text, text: action.text })),
              { id: 'remove', text: 'Remove' },
            ]}
            ariaLabel="Widget settings"
            variant="icon"
            onItemClick={event => {
              if (event.detail.id === 'remove') {
                if (removeConfirmationText) {
                  setShowRemoveDialog(true);
                } else {
                  onRemove();
                }
              } else {
                const actionMatch = actions.find(action => action.text === event.detail.id)!;
                actionMatch.onClick();
              }
            }}
          />
        }
        footer={config.footer && <config.footer />}
      >
        <config.content />
      </BoardItem>
      {showRemoveDialog && (
        <RemoveDialog
          title={removeConfirmationText!}
          onDismiss={() => setShowRemoveDialog(false)}
          onConfirm={() => {
            setShowRemoveDialog(false);
            onRemove();
          }}
        />
      )}
    </>
  );
}
