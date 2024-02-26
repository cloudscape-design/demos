// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
declare module '*.module.scss' {
  type CSSModuleClasses = { readonly [key: string]: string };
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.svg' {
  const icon: string;
  export default icon;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}
