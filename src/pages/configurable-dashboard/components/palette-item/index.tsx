// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import Header from '@cloudscape-design/components/header';
import BoardItem from '@cloudscape-design/board-components/board-item';
import Box from '@cloudscape-design/components/box';
import { EmptyState } from '../../../dashboard/components/empty-state';
import { boardItemI18nStrings } from '../../i18n-strings';
import * as icons from '../../../dashboard/icons';
import styles from './styles.module.scss';

type IconName = keyof typeof icons;

interface PaletteItemProps {
  title: string;
  iconName: IconName;
  description: string;
  showPreview: boolean;
}

function PaletteIcon({ iconName }: { iconName: IconName }) {
  const icon = icons[iconName];
  const altText = `${iconName} icon`;

  return (
    <>
      <img className="awsui-util-hide-in-dark-mode" src={icon.light} alt={altText} />
      <img className="awsui-util-show-in-dark-mode" src={icon.dark} alt={altText} />
    </>
  );
}

export function PaletteItem({ title, iconName, description, showPreview }: PaletteItemProps) {
  return (
    <BoardItem header={<Header headingTagOverride="h3">{title}</Header>} i18nStrings={boardItemI18nStrings}>
      {showPreview ? (
        <EmptyState
          title={title}
          description={description}
          icon={<PaletteIcon iconName={iconName} />}
          verticalCenter={true}
        />
      ) : (
        <div className={styles.layout}>
          <div>
            <PaletteIcon iconName={iconName} />
          </div>
          <Box variant="p">{description}</Box>
        </div>
      )}
    </BoardItem>
  );
}
