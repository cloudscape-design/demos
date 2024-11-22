// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { format, subDays } from 'date-fns';
import { EC2Instance } from '../pages/commons/interfaces';

const getElement = (array: any[], loopedIndex: number) => array[loopedIndex % array.length];

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const instances: EC2Instance[] = Array.from({ length: 50 }).map((item, i) => ({
  id: `XLOWCQQFJJHM8${i}`,
  type: getElement(['m5.large', 'm5.xlarge', 'm5.4xlarge'], i),
  architecture: getElement(['arm64', 'i386', 'x86_64', 'arm64_mac'], i),
  alarmState: (i % 4 === 0 ? 'ALARM' : 'Normal') as 'ALARM' | 'Normal',
  publicDns: `231.50.3.${i}`,
  monitoring: i % 3 === 0 ? 'Default' : '',
  state: getElement(['Running', 'Pending', 'Stopping', 'Stopped', 'Shutting down', 'Terminated'], i),
  platformDetails: getElement(['Linux', 'Windows'], i),
  terminalProtection: 'on',
  launchedAt: format(subDays(new Date(), getRandomInt(12)), 'yyyy-MM-dd'),
  volume: getElement([1, 2, 3, 4, 5], i),
  securityGroups: getElement([['groupA', 'groupB'], ['groupC', 'groupD', 'groupE'], ['groupF']], i),
  loadBalancers: getElement(
    [['lb-1'], ['lb-1', 'lb-2', 'lb-4'], ['lb-3', 'lb-4', 'lb-5'], ['lb-6', 'lb-7', 'lb-8', 'lb-9']],
    i
  ),
  availabilityZone: getElement(['AZ 1', 'AZ 2'], i),
  numOfvCpu: getElement([3, 5, 9], i),
  rootDeviceType: i % 3 === 0 ? 'ebs' : 'instance-store',
  EBSOptimized: i % 5 !== 0 ? 'Yes' : 'No',
  averageLatency: getRandomInt(800),
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

export default instances;
