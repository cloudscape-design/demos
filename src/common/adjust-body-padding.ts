// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Note: This file is not necessary for AWS Consoles
export function adjustBodyPadding() {
  const { height: footerHeight } = document.querySelector('#f')!.getBoundingClientRect();
  (document.querySelector('#b') as HTMLElement).style.paddingBottom = `${footerHeight}px`;
}

window.addEventListener('DOMContentLoaded', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
