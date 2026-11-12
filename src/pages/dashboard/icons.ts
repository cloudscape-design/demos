// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import barChartDark from './assets/bar-chart-dark.svg';
import barChartLight from './assets/bar-chart-light.svg';
import lineChartDark from './assets/line-chart-dark.svg';
import lineChartLight from './assets/line-chart-light.svg';
import listDark from './assets/list-dark.svg';
import listLight from './assets/list-light.svg';
import mixedContentDark from './assets/mixed-content-dark.svg';
import mixedContentLight from './assets/mixed-content-light.svg';
import pieChartDark from './assets/pie-chart-dark.svg';
import pieChartLight from './assets/pie-chart-light.svg';
import tableDark from './assets/table-dark.svg';
import tableLight from './assets/table-light.svg';

const mixedContent = { light: mixedContentLight, dark: mixedContentDark };

const barChart = { light: barChartLight, dark: barChartDark };

const lineChart = { light: lineChartLight, dark: lineChartDark };

const list = { light: listLight, dark: listDark };

const pieChart = { light: pieChartLight, dark: pieChartDark };

const table = { light: tableLight, dark: tableDark };

export const icons = { mixedContent, barChart, lineChart, list, pieChart, table };
