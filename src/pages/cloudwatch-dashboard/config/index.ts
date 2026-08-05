// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Widget } from '@amzn/cloudwatchdashboards-inside';

export const config = {
  displayMode: 'static',
  heightUnit: 40,
  widgetMarginX: 20,
  widgetMarginY: 20,
  style: 'polarisCard',
  internal: {
    accountId: '856054278548',
    stage: 'prod',
  },
};

export const definition: {
  widgets: Widget[];
} = {
  widgets: [
    {
      type: 'metric',
      x: 0,
      y: 0,
      width: 12,
      height: 6,
      properties: {
        metrics: [
          [
            {
              expression: "SEARCH('{AWS/EC2,InstanceId} MetricName=\"CPUUtilization\"', 'Average', 300)",
              id: 'e1',
              label: '',
            },
          ],
        ],
        view: 'timeSeries',
        region: 'us-west-2',
        period: 300,
        stat: 'Average',
        title: 'CPU utilization of instances',
        stacked: true,
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 6,
      width: 12,
      height: 6,
      properties: {
        metrics: [
          [
            {
              expression: "SEARCH('{AWS/EC2,InstanceId} MetricName=\"CPUUtilization\"', 'Sum', 300)",
              id: 'e1',
              label: '',
            },
          ],
        ],
        view: 'timeSeries',
        region: 'us-west-2',
        period: 300,
        stat: 'Average',
        title: 'Incoming network traffic of instances',
        stacked: false,
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 0,
      width: 12,
      height: 6,
      properties: {
        metrics: [['AWS/EC2', 'CPUUtilization', { stat: 'Minimum' }], ['...'], ['...', { stat: 'Maximum' }]],
        view: 'timeSeries',
        region: 'us-east-1',
        title: 'Overall CPU Utilization',
        period: 300,
        stat: 'Average',
        stacked: true,
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 6,
      width: 12,
      height: 6,
      properties: {
        metrics: [
          [
            {
              expression: "SEARCH('{AWS/EC2,InstanceId} MetricName=\"NetworkOut\"', 'Sum', 300)",
              id: 'e1',
              label: '',
            },
          ],
        ],
        view: 'timeSeries',
        region: 'us-west-2',
        period: 300,
        stat: 'Average',
        title: 'Outgoing network traffic of instances',
        stacked: false,
      },
    },
    {
      type: 'log',
      x: 0,
      y: 18,
      width: 24,
      height: 9,
      properties: {
        query: "SOURCE '/aws/lambda/DynamoUpdater' | fields @message, @requestId, @timestamp",
        region: 'us-east-1',
        title: 'Lambda logs',
      },
    },
    {
      type: 'metric',
      x: 0,
      y: 12,
      width: 12,
      height: 6,
      properties: {
        title: 'Estimated charges alarm',
        annotations: {
          alarms: ['arn:aws:cloudwatch:us-east-1:856054278548:alarm:costs'],
        },
        view: 'timeSeries',
        metrics: [],
        region: 'us-east-1',
      },
    },
    {
      type: 'metric',
      x: 12,
      y: 12,
      width: 12,
      height: 6,
      properties: {
        view: 'singleValue',
        metrics: [
          ['TestMetrics', 'StackMetric16'],
          ['.', 'StackMetric2'],
          ['.', 'StackMetric24'],
        ],
        region: 'us-east-1',
      },
    },
  ],
};

export const headerText = 'CloudWatch dashboard';
