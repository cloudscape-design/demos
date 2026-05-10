// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export = classes;
}

declare module '*.svg' {
  import type { ComponentType, SVGProps } from 'react';
  const icon: string;
  export default icon;
  export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.jpg' {
  const url: string;
  export default url;
}
