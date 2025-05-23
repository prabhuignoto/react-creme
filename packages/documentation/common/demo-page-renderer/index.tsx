/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FunctionComponent,
  memo,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Section } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import useMedia from '../useMedia';
import DemoPageFeatures from './demo-page-features';
import { DemoPageHeader } from './demo-page-header';
import styles from './demo-page-renderer.module.scss';
import { DemoPageTabs } from './demo-page-tabs';

export interface DemoPageRendererProps {
  callbacks?: any[];
  demoWidget: any;
  description?: string | React.ReactNode;
  editId?: string;
  features?: string[];
  pageIcon?: React.ReactNode;
  properties: any[];
  sourceId?: string;
  tabTitles: string[];
  title?: string;
  typeDefStrings?: string[];
}

const DemoPageRenderer: FunctionComponent<DemoPageRendererProps> = memo(
  ({
    demoWidget,
    tabTitles = [],
    properties,
    callbacks,
    title,
    description,
    pageIcon,
    sourceId,
    editId,
    features = [],
  }: DemoPageRendererProps) => {
    const media = useMedia();

    const [width, setWidth] = useState<number[]>([]);
    const [tabs, setTabs] = useState<string[]>(tabTitles);

    useLayoutEffect(() => {
      if (!media) {
        return;
      }

      if (media.isExtraLargeScreen) {
        setWidth([200, 450, 200]);
      } else if (media.isBigScreen) {
        setWidth([150, 300]);
      } else if (media.isDesktop) {
        setWidth([150, 250, 150]);
      } else if (media.isTablet) {
        setTabs(tabTitles.slice(0, tabTitles.length - 1));
        setWidth([120, 200, 120]);
      } else if (media.isMobile) {
        setTabs(tabTitles.slice(0, tabTitles.length - 1));
        setWidth([120, 120, 120]);
      }
    }, [media]);

    const columns: DataGridColumn[] = useMemo(() => {
      if (width.length < 1 || !media) {
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
      } else if (media.isExtraLargeScreen) {
        return [
          {
            formatter: val => (val ? `<em>${val}</em>` : ''),
            name: 'name',
            searchable: true,
            sortable: true,
            type: 'string',
            width: width[0],
          },
          {
            name: 'description',
            searchable: true,
            type: 'string',
            width: width[1],
          },
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
            searchable: true,
            sortable: true,
            type: 'string',
            width: 150,
          },
          { name: 'description', searchable: true, type: 'string' },
          {
            formatter: val => (val ? `<em>${val}</em>` : ''),
            name: 'default',
            type: 'string',
            width: 150,
          },
        ];
      }
    }, [media, width.length]);

    return width.length ? (
      <article className={styles.wrapper}>
        {title && (
          <DemoPageHeader
            title={title}
            description={description}
            pageIcon={pageIcon}
            sourceId={sourceId}
            editId={editId}
          />
        )}
        {features.length ? (
          <Section noPadding height={50} border={false}>
            <DemoPageFeatures features={features} />
          </Section>
        ) : null}
        <DemoPageTabs
          tabTitles={tabs}
          media={media}
          callbacks={callbacks}
          demoWidget={demoWidget}
          columns={columns}
          properties={properties}
        />
      </article>
    ) : null;
  }
);

DemoPageRenderer.displayName = 'DemoPageRenderer';

export default DemoPageRenderer;
