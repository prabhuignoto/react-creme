/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  LazyExoticComponent,
  Suspense,
  useLayoutEffect,
  useMemo,
} from 'react';
import { BookOpen, Code, Edit, Sliders } from 'react-feather';
import { CSSTransition } from 'react-transition-group';
import { Link, PageHeader, Section, Tabs } from '../../lib/components';
import { DataGridColumn } from '../../lib/components/data-grid/data-grid-model';
import './demo-page-renderer.scss';
import StackBlitz from './stackblitz';
import useMedia from './useMedia';

const DataGrid = React.lazy(() =>
  import('../../lib/components/data-grid/data-grid').then(({ DataGrid }) => ({
    default: DataGrid,
  }))
);

const Icons = [
  <BookOpen size={18} key="book-open" />,
  <Sliders size={18} key="settings" />,
  <Code size={18} key="code" />,
];

const IconsWithoutProperties = [
  <BookOpen size={18} key="book-open" />,
  <Code size={18} key="code" />,
];

interface DemoPageRendererProps {
  callbacks?: any[];
  demoWidget: LazyExoticComponent<React.FC>;
  description?: string | React.ReactNode;
  editId?: string;
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
    }: DemoPageRendererProps) => {
      const media = useMedia();

      const Demo = demoWidget;

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

      const canShowProperties = useMemo(() => {
        return properties && properties.length;
      }, [properties.length]);

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
          <div className="rc-demo-page">
            {title && (
              <PageHeader title={title} size="lg" icon={pageIcon}>
                <p>{description}</p>
                <div className="rc-demo-page-links-container">
                  {sourceId && (
                    <Link
                      target="_blank"
                      accent="button"
                      icon={<Code />}
                      href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/${sourceId}`}
                    >
                      View Source
                    </Link>
                  )}
                  {editId && (
                    <Link
                      target="_blank"
                      accent="button"
                      icon={<Edit />}
                      href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/documentation/components/${editId}/index.tsx`}
                    >
                      Edit this Page
                    </Link>
                  )}
                </div>
              </PageHeader>
            )}
            <Tabs
              labels={tabTitles}
              icons={canShowProperties ? Icons : IconsWithoutProperties}
              focusable={false}
            >
              <div className="rc-demo-widgets-wrapper">
                <Suspense fallback={<span>Loading Widgets...</span>}>
                  <CSSTransition
                    key={tabTitles.join('')}
                    classNames="widget-fade"
                    timeout={300}
                  >
                    <Demo />
                  </CSSTransition>
                </Suspense>
              </div>
              {canShowProperties && (
                <div className="rc-demo-prop-section">
                  <Suspense fallback={<div></div>}>
                    <Section title="Properties">
                      <DataGrid
                        layoutStyle={'comfortable'}
                        columns={columns}
                        data={properties}
                        border
                        rowHeight={68}
                      />
                    </Section>
                    {callbacks && (
                      <Section title="Callbacks">
                        <DataGrid
                          layoutStyle={'comfortable'}
                          columns={columns}
                          data={callbacks}
                          border
                          rowHeight={68}
                        />
                      </Section>
                    )}
                  </Suspense>
                </div>
              )}
              <div className="rc-demo-stack-blitz-collection">
                {stackBlitzCodes &&
                  stackBlitzCodes.map(code => (
                    <div className="rc-demo-stack-blitz" key={code}>
                      <StackBlitz id={code} />
                    </div>
                  ))}
              </div>
            </Tabs>
          </div>
        )
      );
    },
    (prev, next) => {
      return (
        prev.title === next.title &&
        prev.description === next.description &&
        prev.demoWidget === next.demoWidget
      );
    }
  );

DemoPageRenderer.displayName = 'DemoPageRenderer';

export default DemoPageRenderer;
