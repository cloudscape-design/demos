// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface EC2Instance {
  id: string;
  type: InstanceType;
  architecture: InstanceArchitecture;
  alarmState: AlarmStateType;
  publicDns: string;
  monitoring: string;
  state: InstanceState;
  platformDetails: InstancePlatform;
  terminalProtection: string;
  launchTime: string;
  volume: number;
  securityGroups: Array<string>;
  loadBalancers: Array<string>;
  availabilityZone: string;
  numOfvCpu: number;
  isEBSOptimized: boolean;
  inboundRules: Array<InboundRule>;
  rootDeviceType: string;
  averageLatency: number;
}

export type AlarmStateType = 'ALARM' | 'NORMAL';
export type InstanceType = 'm5.large' | 'm5.xlarge' | 'm5.4xlarge';
export type InstanceState = 'Running' | 'Pending' | 'Shutting down' | 'Stopping' | 'Stopped' | 'Terminated';
export type InstanceArchitecture = 'arm64' | 'i386' | 'x86_64' | 'arm64_mac';
export type InstancePlatform = 'Linux' | 'Windows';
export type InboundRule = {
  type: string;
  protocol: string;
  portRange: string;
  source: string;
  description: string;
};
export type RootDeviceType = 'ebs' | 'instance-store';
