import { faBook, faCode, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, Suspense, useMemo, useCallback } from 'react';
import { DemoPageRendererProps } from '.';
import { Tabs } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import { SandpackInteractive } from '../code-viewer/sandpack-interactive';
import { StaticPlayground } from '../static-playground';
import { getStackBlitzUrl } from './utils/url-builder';
import { demoWidgetToSandpackFiles, customCodeToSandpackFiles, getSandpackDependencies } from './utils/sandpack-converter';
import { useDemoActions, useThemeMode, useViewport } from './demo-context';
import { MediaState } from '../useMedia';
import { PropertyTable } from './components/property-table';
import { DemoContainer } from './components/demo-container';
import WidgetsWrapper from './widgets-wrapper';
import styles from './demo-page-renderer.module.scss';

export type DemoPageTabsProps = Pick<
  DemoPageRendererProps,
  'tabTitles' | 'properties' | 'callbacks' | 'stackBlitzCodes' | 'demoWidget' | 'title' | 'playgroundCode'
> & {
  columns: DataGridColumn[];
  media: MediaState | null;
  showStackBlitzEmbed: boolean;
};

/**
 * DemoPageTabs - Tabbed interface for component demos
 *
 * Tab structure:
 * - Tab 1 (Demo): Always present - shows the component demo
 * - Tab 2: Properties (if properties exist) OR Playground (if no properties but stackBlitzCodes exist)
 * - Tab 3 (Playground): Only if both properties AND stackBlitzCodes exist
 */

const DemoPageTabs: FunctionComponent<DemoPageTabsProps> = ({
  tabTitles,
  callbacks,
  stackBlitzCodes,
  media,
  demoWidget,
  columns,
  properties,
  showStackBlitzEmbed = true,
  title,
  playgroundCode,
}) => {
  const actions = useDemoActions();
  const themeMode = useThemeMode();
  const viewportSize = useViewport();

  const hasProperties = useMemo(() => {
    return properties && properties.length > 0;
  }, [properties]);

  // Wrapper handlers to match DemoContainer's expected signatures
  const handleThemeChange = useCallback((theme: 'light' | 'dark') => {
    actions.toggleTheme();
  }, [actions]);

  const handleViewportChange = useCallback((size: ViewportSize) => {
    actions.setViewportSize(size);
  }, [actions]);

  const hasStackBlitz = useMemo(() => {
    return showStackBlitzEmbed && stackBlitzCodes && stackBlitzCodes.length > 0;
  }, [showStackBlitzEmbed, stackBlitzCodes]);

  const Demo = demoWidget;

  // Generate tab icons dynamically based on what's being shown
  const tabIcons = useMemo(() => {
    const icons = [<FontAwesomeIcon icon={faBook} key="book-open" />];

    if (hasProperties) {
      icons.push(<FontAwesomeIcon icon={faSlidersH} key="sliders" />);
    }

    if (hasStackBlitz) {
      icons.push(<FontAwesomeIcon icon={faCode} key="code" />);
    }

    return icons;
  }, [hasProperties, hasStackBlitz]);

  // Render playground - show comprehensive code examples users can copy
  const renderPlayground = () => {
    if (!hasStackBlitz) return null;

    // If custom playground code is provided, show it in a static playground
    if (playgroundCode) {
      return (
        <div className={styles['rc-demo-stack-blitz-collection']}>
          <StaticPlayground
            code={playgroundCode}
            language="tsx"
            title={`${title || 'Component'} - Complete Example`}
            description="A comprehensive example demonstrating all features. Copy and run in your project with npm install react-creme."
          />
        </div>
      );
    }

    // Fallback: show placeholder for components without custom examples
    return (
      <div className={styles['rc-demo-stack-blitz-collection']}>
        <StaticPlayground
          code="// No example available yet.\n// Check the Examples tab for component demos."
          language="tsx"
          title={`${title || 'Component'} - Example`}
          description="Comprehensive example coming soon. Use the Examples tab to see component demos."
        />
      </div>
    );
  };

  return (
    <Tabs labels={tabTitles} icons={tabIcons} focusable={false} size="sm">
      {/* Tab 1: Demo - Always shown with enhanced controls */}
      <div className={styles.widgets_container}>
        <Suspense fallback={<span>Loading Widgets...</span>}>
          <DemoContainer
            controls={{
              theme: true,
              viewport: true,
              reset: true,
              fullscreen: true,
            }}
            defaultViewport={viewportSize}
            defaultTheme={themeMode}
            onViewportChange={handleViewportChange}
            onThemeChange={handleThemeChange}
            onReset={actions.resetDemo}
          >
            {Demo}
          </DemoContainer>
        </Suspense>
      </div>

      {/* Tab 2: Properties (if exist) OR Playground (if no properties) */}
      {hasProperties ? (
        <div className="rc-demo-prop-section">
          <Suspense fallback={<div></div>}>
            <PropertyTable properties={properties} callbacks={callbacks} columns={columns} />
          </Suspense>
        </div>
      ) : (
        renderPlayground()
      )}

      {/* Tab 3: Playground (only if properties also exist) */}
      {/* {hasProperties && renderPlayground()} */}
    </Tabs>
  );
};

DemoPageTabs.displayName = 'DemoPageTabs';

export { DemoPageTabs };
