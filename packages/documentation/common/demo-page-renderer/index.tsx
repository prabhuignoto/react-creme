/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faBook,
  faCode,
  faEdit,
  faExternalLink,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Suspense, useLayoutEffect, useMemo } from 'react';
import { BookOpen, Code } from 'react-feather';
import { CSSTransition } from 'react-transition-group';
import { Link, PageHeader, Section, Tabs } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import StackBlitz from '../stackblitz';
import useMedia from '../useMedia';
import './demo-page-renderer.scss';

const DataGrid = React.lazy(() =>
  import('../../../lib/components/data-grid/data-grid').then(
    ({ DataGrid }) => ({
      default: DataGrid,
    })
  )
);

const Icons = [
  <FontAwesomeIcon icon={faBook} key="book-open" />,
  <FontAwesomeIcon icon={faSlidersH} key="sliders" />,
  <FontAwesomeIcon icon={faCode} key="code" />,
];

const IconsWithoutProperties = [
  <BookOpen size={18} key="book-open" />,
  <Code size={18} key="code" />,
];

interface DemoPageRendererProps {
  callbacks?: any[];
  demoWidget: React.ReactNode;
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
              <PageHeader title={title} icon={pageIcon} size="md">
                <div>{description}</div>
                <div className="rc-demo-page-links-container">
                  {sourceId && (
                    <Link
                      target="_blank"
                      accent="button"
                      icon={<FontAwesomeIcon icon={faCode} />}
                      href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/lib/components/${sourceId}`}
                    >
                      View Source
                    </Link>
                  )}
                  {editId && (
                    <Link
                      target="_blank"
                      accent="button"
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      href={`https://github.com/prabhuignoto/react-creme/tree/master/packages/documentation/components/${editId}/index.tsx`}
                    >
                      Edit this Page
                    </Link>
                  )}
                  {stackBlitzCodes?.length && (
                    <Link
                      target="_blank"
                      accent="button"
                      icon={<FontAwesomeIcon icon={faExternalLink} />}
                      href={`https://stackblitz.com/edit/${stackBlitzCodes[0]}`}
                    >
                      Open in StackBlitz
                    </Link>
                  )}
                </div>
              </PageHeader>
            )}
            <Tabs
              labels={tabTitles}
              icons={canShowProperties ? Icons : IconsWithoutProperties}
              focusable={false}
              size="sm"
            >
              <div className="rc-demo-widgets-wrapper">
                <Suspense fallback={<span>Loading Widgets...</span>}>
                  <CSSTransition
                    key={tabTitles.join('')}
                    classNames="widget-fade"
                    timeout={300}
                  >
                    {Demo}
                  </CSSTransition>
                </Suspense>
              </div>
              {canShowProperties ? (
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
              ) : (
                <div className="rc-demo-stack-blitz-collection">
                  {stackBlitzCodes &&
                    stackBlitzCodes.map(code => (
                      <div className="rc-demo-stack-blitz" key={code}>
                        <StackBlitz id={code} />
                      </div>
                    ))}
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
    }
  );

DemoPageRenderer.displayName = 'DemoPageRenderer';

export default DemoPageRenderer;
