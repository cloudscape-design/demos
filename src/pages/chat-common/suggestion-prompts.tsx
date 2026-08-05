// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useContext } from 'react';

import SupportPromptGroup, { SupportPromptGroupProps } from '@cloudscape-design/chat-components/support-prompt-group';
import Button from '@cloudscape-design/components/button';
import { ButtonProps } from '@cloudscape-design/components/button';

export interface SuggestionPromptItem {
  id: string;
  text: string;
}

// Optional context allowing a parent (e.g. custom-chat page) to provide a default button style for all nested SuggestionPrompts without explicit prop threading through scripted responses.
export const SuggestionButtonStyleContext = createContext<ButtonProps.Style | undefined>(undefined);

// Follow-up suggestions beneath a reply: stock SupportPromptGroup by default; Style-API Buttons when `buttonStyle` is provided (or set via context).
export default function SuggestionPrompts({
  items,
  onSelect,
  buttonStyle,
}: {
  items: readonly SuggestionPromptItem[];
  onSelect: (text: string) => void;
  buttonStyle?: ButtonProps.Style;
}) {
  const contextStyle = useContext(SuggestionButtonStyleContext);
  const resolvedStyle = buttonStyle ?? contextStyle;

  if (!resolvedStyle) {
    return (
      <SupportPromptGroup
        ariaLabel="Suggested follow-ups"
        alignment="horizontal"
        items={items as SupportPromptGroupProps.Item[]}
        onItemClick={({ detail }: { detail: SupportPromptGroupProps.ItemClickDetail }) => {
          const item = items.find(i => i.id === detail.id);
          if (item) {
            onSelect(item.text);
          }
        }}
      />
    );
  }

  return (
    <div role="group" aria-label="Suggested follow-ups" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map(item => (
        <Button key={item.id} variant="normal" style={resolvedStyle} onClick={() => onSelect(item.text)}>
          {item.text}
        </Button>
      ))}
    </div>
  );
}
