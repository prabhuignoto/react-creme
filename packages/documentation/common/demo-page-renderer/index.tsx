/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useLayoutEffect, useMemo } from 'react';
import { Section } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import useMedia from '../useMedia';
import DemoPageFeatures from './demo-page-features';
import { DemoPageHeader } from './demo-page-header';
import styles from './demo-page-renderer.module.scss';
import { DemoPageTabs } from './demo-page-tabs';

export interface DemoPageRendererProps {
  callbacks?: any[];
  demoWidget: React.ReactNode;
  description?: string | React.ReactNode;
  editId?: string;
  features?: string[];
  pageIcon?: React.ReactNode;
  properties: any[];
  sourceId?: string;
  stackBlitzCodes?: string[];
  tabTitles: string[];
  title?: string;
  typeDefStrings?: string[];
}

const DemoPageRenderer: React.FunctionComponent<DemoPageRendererProps> =
  React.memo(
    ({
      demoWidget,
      tabTitles,
      properties,
      callbacks,
      title,
      description,
      stackBlitzCodes,
      pageIcon,
      sourceId,
      editId,
      features = [],
    }: DemoPageRendererProps) => {
      const media = useMedia();

      const [width, setWidth] = React.useState(null);

      useLayoutEffect(() => {
        if (!media) {
          return;
        }

        if (media.isExtraLargeScreen) {
          setWidth([200, 450, 200]);
        } else if (media.isBigScreen) {
          setWidth([200, 300, 150]);
        } else if (media.isDesktop) {
          setWidth([150, 250, 150]);
        } else if (media.isTablet) {
          setWidth([120, 200, 120]);
        } else if (media.isMobile) {
          setWidth([120, 120, 120]);
        }
      }, [media]);

      const columns: DataGridColumn[] = useMemo(() => {
        if (!width || !media) {
          return [];
        }

        if (media.isMobile) {
          return [
            {
              formatter: val => (val ? `<em>${val}</em>` : ''),
              name: 'name',
              sortable: true,
              type: 'string',
            },
            { name: 'description', type: 'string' },
          ];
        } else if (media.isBigScreen || media.isExtraLargeScreen) {
          return [
            {
              formatter: val => (val ? `<em>${val}</em>` : ''),
              name: 'name',
              sortable: true,
              type: 'string',
              width: width[0],
            },
            { name: 'description', type: 'string', width: width[1] },
            {
              formatter: val => (val ? `<em>${val}</em>` : ''),
              name: 'default',
              type: 'string',
              width: width[2],
            },
            { name: 'optional', type: 'string' },
            { name: 'type', type: 'string' },
          ];
        } else {
          return [
            {
              formatter: val => (val ? `<em>${val}</em>` : ''),
              name: 'name',
              sortable: true,
              type: 'string',
              width: 150,
            },
            { name: 'description', type: 'string' },
            {
              formatter: val => (val ? `<em>${val}</em>` : ''),
              name: 'default',
              type: 'string',
              width: 150,
            },
          ];
        }
      }, [media, width]);

      return (
        width && (
          <div className={styles.wrapper}>
            {title && (
              <DemoPageHeader
                title={title}
                description={description}
                pageIcon={pageIcon}
                sourceId={sourceId}
                editId={editId}
                stackBlitzCodes={stackBlitzCodes}
              />
            )}
            {features.length ? (
              <Section noPadding height={50}>
                <DemoPageFeatures features={features} />
              </Section>
            ) : null}
            <DemoPageTabs
              tabTitles={tabTitles}
              media={media}
              callbacks={callbacks}
              demoWidget={demoWidget}
              columns={columns}
              stackBlitzCodes={stackBlitzCodes}
              properties={properties}
            />
          </div>
        )
      );
    }
  );

DemoPageRenderer.displayName = 'DemoPageRenderer';

export default DemoPageRenderer;
