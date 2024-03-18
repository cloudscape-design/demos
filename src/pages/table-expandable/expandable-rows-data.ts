// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { padStart, sumBy, uniq } from 'lodash';
import { Instance, InstanceDetail, InstanceType, InstanceState } from './common';

let seed = 1;
export default function pseudoRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateId() {
  const id = Math.ceil(pseudoRandom() * Math.pow(16, 8)).toString(16);
  return padStart(id, 8, '0');
}

function generateInstanceSize() {
  const types = [
    't1.micro',
    't2.nano',
    't2.small',
    't2.xlarge',
    't2.2xlarge',
    'm3.medium',
    'm3.large',
    'm3.xlarge',
    'm3.2xlarge',
    'm4.large',
    'm4.xlarge',
    'm4.2xlarge',
    'm4.4xlarge',
    'm4.10xlarge',
    'm4.16xlarge',
    'cr1.8xlarge',
    'r5.large',
    'r5.xlarge',
    'r5.2xlarge',
    'r5.metal',
    'r5d.xlarge',
    'r5d.2xlarge',
    'r5d.4xlarge',
    'r5d.8xlarge',
    'r5d.12xlarge',
    'r5d.16xlarge',
    'r5d.24xlarge',
    'r5d.metal',
    'i3.large',
    'i3.xlarge',
    'i3.2xlarge',
    'i3.16xlarge',
    'c3.large',
    'c3.xlarge',
    'c4.2xlarge',
    'c5.large',
    'c5.4xlarge ',
    'g2.2xlarge',
    'p2.xlarge',
    'm5.large',
    'm5.xlarge',
    'm5.2xlarge',
    'u-6tb1.metal',
  ];
  return types[Math.floor(pseudoRandom() * types.length)];
}

export const allInstances: Instance[] = [];
for (let i = 0; i < 35; i++) {
  allInstances.push(...generateLevelItems(1, []));
}

function generateLevelItems(level: number, path: string[], parent: null | InstanceDetail = null): Instance[] {
  const type = generateInstanceType(level);
  const state = generateState(parent);
  const instanceDetail = {
    type,
    name: `${type}-${generateId()}`,
    role: generateRole(type, level),
    engine: parent?.engine ?? generateEngine(type),
    state,
    size: generateSize(type),
    region: generateRegion(type),
  };
  const nextPath = [instanceDetail.name, ...path];
  const children = generateChildren(type, level, nextPath, instanceDetail);
  const selectsPerSecond = getSelectsPerSecond(type, children);
  const stateGrouped = getGroupedState(type, instanceDetail.state, children);
  const sizeGrouped = getGroupedSize(type, instanceDetail.size, children);
  const regionGrouped = getGroupedRegion(type, instanceDetail.region, children);
  return [
    {
      ...instanceDetail,
      selectsPerSecond,
      stateGrouped,
      sizeGrouped,
      regionGrouped,
      parentName: parent?.name ?? null,
      path: nextPath,
      children: children.length,
      level,
    },
    ...children,
  ];
}

function generateInstanceType(level: number): InstanceType {
  const rand = pseudoRandom();
  if (level === 1) {
    return rand < 0.2 ? 'global' : rand < 0.8 ? 'cluster' : 'instance';
  }
  if (level === 2) {
    return rand < 0.6 ? 'cluster' : 'instance';
  }
  if (level === 3) {
    return rand < 0.3 ? 'cluster' : 'instance';
  }
  return 'instance';
}

function generateChildren(instanceType: InstanceType, level: number, path: string[], parent: InstanceDetail) {
  if (instanceType === 'instance') {
    return [];
  }
  const count = level === 1 ? 1 + Math.floor(pseudoRandom() * 5) : Math.floor(pseudoRandom() * 5);
  const children: Instance[] = [];
  for (let i = 0; i < count; i++) {
    children.push(...generateLevelItems(level + 1, path, parent));
  }
  return children;
}

function generateRole(instanceType: InstanceType, level: number) {
  if (instanceType === 'global') {
    return 'Global';
  }
  if (instanceType === 'cluster') {
    return 'Cluster';
  }
  if (instanceType === 'instance' && level === 1) {
    return 'Instance';
  }
  const instanceRoles = ['Reader', 'Writer', 'Replica', 'Replica', 'Replica', 'Replica'];
  return instanceRoles[Math.floor(pseudoRandom() * instanceRoles.length)];
}

function generateState(parent: null | InstanceDetail) {
  if (parent?.state === 'STOPPED' || parent?.state === 'TERMINATED') {
    return pseudoRandom() < 0.9 ? 'STOPPED' : 'TERMINATED';
  }
  const states = [
    'RUNNING',
    'RUNNING',
    'RUNNING',
    'RUNNING',
    'RUNNING',
    'RUNNING',
    'STOPPED',
    'STOPPED',
    'TERMINATED',
  ] as const;
  return states[Math.floor(pseudoRandom() * states.length)];
}

function getSelectsPerSecond(instanceType: InstanceType, children: Instance[]): null | number {
  if (instanceType === 'global') {
    return null;
  }
  return instanceType === 'instance'
    ? Math.floor(pseudoRandom() * 500)
    : sumBy(children, instance => instance.selectsPerSecond ?? 0);
}

function getGroupedState(instanceType: InstanceType, state: InstanceState, children: Instance[]) {
  const grouped = { RUNNING: 0, STOPPED: 0, TERMINATED: 0 };
  if (instanceType === 'instance') {
    grouped[state] += 1;
  } else {
    for (const instance of children) {
      grouped.RUNNING += instance.stateGrouped.RUNNING;
      grouped.STOPPED += instance.stateGrouped.STOPPED;
      grouped.TERMINATED += instance.stateGrouped.TERMINATED;
    }
  }
  return grouped;
}

function getGroupedSize(instanceType: InstanceType, size: null | string, children: Instance[]) {
  if (instanceType === 'global') {
    return '';
  }
  if (instanceType === 'instance') {
    return size ?? '';
  }
  return `${children.filter(instance => instance.type === 'instance').length} instances`;
}

function generateEngine(instanceType: InstanceType) {
  if (instanceType === 'global') {
    return 'Aurora MySQL';
  }
  const engines = ['MariaDB', 'MySQL', 'Aurora MySQL', 'Microsoft SQL Server', 'PostgreSQL', 'Oracle'];
  return engines[Math.floor(pseudoRandom() * engines.length)];
}

function generateSize(instanceType: InstanceType) {
  return instanceType === 'instance' ? generateInstanceSize() : null;
}

function generateRegion(instanceType: InstanceType) {
  if (instanceType === 'global') {
    return null;
  }
  const regions = [
    'us-east-1',
    'us-east-1a',
    'us-east-1b',
    'us-east-2',
    'us-east-2a',
    'us-east-2b',
    'us-west-1',
    'us-west-1a',
    'us-west-1b',
    'us-west-2',
    'us-west-2a',
    'us-west-2b',
  ];
  return regions[Math.floor(pseudoRandom() * regions.length)];
}

function getGroupedRegion(instanceType: InstanceType, region: null | string, children: Instance[]) {
  if (instanceType === 'global') {
    const allRegions = uniq(children.map(instance => instance.region).filter(Boolean));
    return `${allRegions.length} regions`;
  }
  return region ?? '';
}

function generateTerminationReason(state: InstanceState): null | string {
  if (state === 'TERMINATED') {
    return `Terminated automatically (CM-${generateId().slice(0, 5).toUpperCase()})`;
  }
  return null;
}
