// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import ChatSideNav from '../chat-common/chat-side-nav';

// Base demo side navigation: renders the shared ChatSideNav with default props.
export default function BaseNavigation({ onNewChat }: { onNewChat?: () => void }) {
  return <ChatSideNav title="Generative AI chat" onNewChat={onNewChat} />;
}
