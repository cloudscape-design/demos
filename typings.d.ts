// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
declare module '*.module.scss' {
  type CSSModuleClasses = { readonly [key: string]: string };
  const classes: CSSModuleClasses;
  export default classes;
}
