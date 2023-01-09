import { faBook, faCode, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, Suspense, useMemo } from 'react';
import { BookOpen, Code } from 'react-feather';
// import { CSSTransition } from 'react-transition-group';
import { DemoPageRendererProps } from '.';
import { Section, Tabs } from '../../../lib/components';
import { DataGrid } from '../../../lib/components/data-grid/data-grid';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import StackBlitz from '../stackblitz';
import { MediaState } from '../useMedia';
import styles from './demo-page-renderer.module.scss';
import WidgetsWrapper from './widgets-wrapper';

export type DemoPageTabsProps = Pick<
  DemoPageRendererProps,
  'tabTitles' | 'properties' | 'callbacks' | 'stackBlitzCodes' | 'demoWidget'
> & {
  columns: DataGridColumn[];
  media: MediaState | null;
  showStackBlitzEmbed: boolean;
};

const Icons = [
  <FontAwesomeIcon icon={faBook} key="book-open" />,
  <FontAwesomeIcon icon={faSlidersH} key="sliders" />,
  <FontAwesomeIcon icon={faCode} key="code" />,
];

const IconsWithoutProperties = [
  <BookOpen size={18} key="book-open" />,
  <Code size={18} key="code" />,
];

const DemoPageTabs: FunctionComponent<DemoPageTabsProps> = ({
  tabTitles,
  callbacks,
  stackBlitzCodes,
  media,
  demoWidget,
  columns,
  properties,
  showStackBlitzEmbed = true,
}) => {
  const canShowProperties = useMemo(() => {
    return properties && properties.length;
  }, [properties.length]);

  const Demo = demoWidget;

  return (
    <Tabs
      labels={tabTitles}
      icons={
        canShowProperties
          ? showStackBlitzEmbed
            ? Icons
            : Icons.slice(0, tabTitles.length - 1)
          : IconsWithoutProperties
      }
      focusable={false}
      size="sm"
    >
      <div className={styles.widgets_container}>
        <Suspense fallback={<span>Loading Widgets...</span>}>
          {/* <CSSTransition
            key={tabTitles.join('')}
            classNames="widget-fade"
            timeout={500}
          > */}
            {media?.isMobile || media?.isTablet || media?.isDesktop ? (
              Demo
            ) : (
              <WidgetsWrapper>{Demo}</WidgetsWrapper>
            )}
          {/* </CSSTransition> */}
        </Suspense>
      </div>
      {canShowProperties ? (
        <div className={styles['rc-demo-prop-section']}>
          <Suspense fallback={<div></div>}>
            <Section title="Properties" size="md">
              <DataGrid
                layoutStyle={'comfortable'}
                columns={columns}
                data={properties}
                // border
                rowHeight={68}
                size="sm"
              />
            </Section>
            {callbacks && (
              <Section title="Callbacks" size="md">
                <DataGrid
                  layoutStyle={'comfortable'}
                  columns={columns}
                  data={callbacks}
                  // border
                  rowHeight={68}
                />
              </Section>
            )}
          </Suspense>
        </div>
      ) : (
        <div className={styles['rc-demo-stack-blitz-collection']}>
          {stackBlitzCodes &&
            stackBlitzCodes.map(code => (
              <div className={styles['rc-demo-stack-blitz']} key={code}>
                <StackBlitz id={code} />
              </div>
            ))}
        </div>
      )}
      {showStackBlitzEmbed ? (
        <div className={styles['rc-demo-stack-blitz-collection']}>
          {stackBlitzCodes &&
            stackBlitzCodes.map(code => (
              <div className={styles['rc-demo-stack-blitz']} key={code}>
                <StackBlitz id={code} />
              </div>
            ))}
        </div>
      ) : null}
    </Tabs>
  );
};

DemoPageTabs.displayName = 'DemoPageTabs';

export { DemoPageTabs };
