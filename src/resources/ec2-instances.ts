// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const getElement = (array: any[], loopedIndex: number) => array[loopedIndex % array.length];

export default Array.from({ length: 50 }).map((item, i) => ({
  id: `XLOWCQQFJJHM8${i}`,
  type: getElement(['m5.large', 'm5.xlarge', 'm5.4xlarge'], i),
  architecture: getElement(['arm64', 'i386', 'x86_64', 'arm64_mac'], i),
  inAlarm: i % 4 === 0,
  publicDns: `231.50.3.${i}`,
  monitoring: i % 3 === 0 ? 'Default' : '',
  state: getElement(['Running', 'Pending', 'Stopping', 'Stopped', 'Shutting down', 'Terminated'], i),
  platformDetails: getElement(['Linux', 'Windows'], i),
  terminalProtection: 'on',
  launchTime: `2024-05-12 16:53:${i.toString().padStart(2, '0')} GMT+0200 CEST`,
  volume: getElement([1, 2, 3, 4, 5], i),
  securityGroups: getElement([['groupA', 'groupB'], ['groupC', 'groupD', 'groupE'], ['groupF']], i),
  loadBalancers: getElement(
    [
      ['lb-1', 'lb-2'],
      ['lb-3', 'lb-4', 'lb-5'],
      ['lb-6', 'lb-7', 'lb-8', 'lb-9'],
    ],
    i
  ),
  availabilityZone: getElement(['AZ 1', 'AZ 2'], i),
  numOfvCpu: getElement([3, 5, 9], i),
  rootDeviceType: i % 3 === 0 ? 'ebs' : 'instance-store',
  isEBSOptimized: i % 5 !== 0,
  inboundRules: [
    {
      type: 'All traffic',
      protocol: 'All',
      portRange: 'All',
      source: `sg-abcdefg${i} (default)`,
      description: '-',
    },
    {
      type: 'Custom TCP',
      protocol: 'TCP',
      portRange: '8182',
      source: `sg-dfs${i} (default)`,
      description: '-',
    },
  ],
}));
