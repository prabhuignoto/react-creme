/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FunctionComponent,
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import deepEqual from 'fast-deep-equal';
import { Section } from '../../../lib/components';
import useMedia from '../useMedia';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import DemoPageFeatures from './demo-page-features';
import { DemoPageHeader } from './demo-page-header';
import { DemoContextProvider, useCodePanelState, useDemoActions } from './demo-context';
import { FloatingCodePanel } from './components/floating-code-panel';
import { QuickActionsToolbar } from './components/quick-actions-toolbar';
import { useDemoShortcuts } from './hooks/use-demo-shortcuts';
import { extractCodeFromElement, wrapWithImport } from './utils/code-extractor';
import { getStackBlitzUrl } from './utils/url-builder';
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
  stackBlitzCodes?: string[];
  tabTitles: string[];
  title?: string;
  typeDefStrings?: string[];
  playgroundCode?: string;
}

/**
 * Inner component that has access to DemoContext
 */
const DemoPageContent: FunctionComponent<DemoPageRendererProps & {
  tabs: string[];
  showStackBlitzEmbed: boolean;
  columns: any;
  media: any;
}> = ({
  title,
  description,
  pageIcon,
  sourceId,
  editId,
  stackBlitzCodes,
  features,
  tabs,
  media,
  callbacks,
  demoWidget,
  columns,
  properties,
  showStackBlitzEmbed,
  playgroundCode,
}) => {
  const codePanel = useCodePanelState();
  const actions = useDemoActions();

  // Extract code from demo widget for display in code panel
  const demoCode = useMemo(() => {
    try {
      const code = extractCodeFromElement(demoWidget);
      const componentName = title || 'Component';
      return wrapWithImport(code, componentName);
    } catch (error) {
      console.error('Failed to extract code from demo:', error);
      return '// Code extraction failed';
    }
  }, [demoWidget, title]);

  const codeSnippet = useMemo(() => ({
    code: demoCode,
    fileName: `${title || 'demo'}.tsx`,
    language: 'tsx' as const,
  }), [demoCode, title]);

  // Quick action handlers
  const handleCopyCode = () => {
    navigator.clipboard.writeText(demoCode);
    console.log('Code copied to clipboard');
  };

  const handleToggleCodePanel = () => {
    actions.toggleCodePanel();
  };

  const handleOpenStackBlitz = () => {
    if (stackBlitzCodes && stackBlitzCodes.length > 0) {
      const url = getStackBlitzUrl(stackBlitzCodes[0]);
      window.open(url, '_blank');
    }
  };

  const handleReset = () => {
    console.log('Demo reset requested');
    window.location.reload();
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  // Wire up keyboard shortcuts
  useDemoShortcuts({
    handlers: {
      onCopyCode: handleCopyCode,
      onFullscreen: handleFullscreen,
      onOpenStackBlitz: handleOpenStackBlitz,
      onReset: handleReset,
      onToggleCode: handleToggleCodePanel,
    },
  });

  return (
    <>
      <article className={styles.wrapper}>
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
        {features && features.length > 0 && (
          <Section noPadding height={50} border={false}>
            <DemoPageFeatures features={features} />
          </Section>
        )}

        {/* Quick Actions Toolbar - Hidden (using individual section accordions instead) */}
        {/* <QuickActionsToolbar
          onCopyCode={handleCopyCode}
          onToggleCode={handleToggleCodePanel}
          onOpenStackBlitz={stackBlitzCodes?.length ? handleOpenStackBlitz : undefined}
          onReset={handleReset}
          onFullscreen={handleFullscreen}
          showShortcuts={true}
        /> */}

        <DemoPageTabs
          tabTitles={tabs}
          media={media}
          callbacks={callbacks}
          demoWidget={demoWidget}
          columns={columns}
          stackBlitzCodes={stackBlitzCodes}
          properties={properties}
          showStackBlitzEmbed={showStackBlitzEmbed}
          title={title}
          playgroundCode={playgroundCode}
        />
      </article>

      {/* Floating Code Panel - Hidden (using individual section accordions instead) */}
      {/* {codePanel.isOpen && (
        <FloatingCodePanel
          snippet={codeSnippet}
          isOpen={codePanel.isOpen}
          width={codePanel.width}
          minWidth={codePanel.minWidth}
          maxWidth={codePanel.maxWidth}
          onClose={actions.toggleCodePanel}
          onResize={actions.setCodePanelWidth}
        />
      )} */}
    </>
  );
};

const DemoPageRenderer: FunctionComponent<DemoPageRendererProps> = memo(
  ({
    demoWidget,
    tabTitles = [],
    properties,
    callbacks,
    title,
    description,
    stackBlitzCodes,
    pageIcon,
    sourceId,
    editId,
    features = [],
    playgroundCode,
  }: DemoPageRendererProps) => {
    const media = useMedia();

    // Stabilize tabTitles reference to prevent infinite loops when navigating
    // Only recreate reference when the array content actually changes
    const tabTitlesRef = useRef(tabTitles);
    const stableTabTitles = useMemo(() => {
      if (!deepEqual(tabTitlesRef.current, tabTitles)) {
        tabTitlesRef.current = tabTitles;
      }
      return tabTitlesRef.current;
    }, [tabTitles]);

    // Determine responsive configuration based on media state
    const [tabs, setTabs] = useState<string[]>(stableTabTitles);
    const [showStackBlitzEmbed, setShowStackBlitzEmbed] = useState(true);

    // Synchronously update tabs and embed visibility based on media
    useLayoutEffect(() => {
      if (!media) return;

      const isMobileOrTablet = media.isMobile || media.isTablet;
      setTabs(isMobileOrTablet ? stableTabTitles.slice(0, -1) : stableTabTitles);
      setShowStackBlitzEmbed(!isMobileOrTablet);
    }, [media, stableTabTitles]);

    // Use custom hook for responsive columns with proper memoization
    const customWidths = useMemo(() => {
      if (!media) return undefined;

      if (media.isExtraLargeScreen) {
        return { default: 200, description: 450, name: 200 };
      } else if (media.isBigScreen) {
        return { default: 150, description: 300, name: 150 };
      } else if (media.isTablet) {
        return { default: 120, description: 200, name: 120 };
      } else if (media.isMobile) {
        return { default: 120, description: 120, name: 120 };
      }
      return { default: 150, description: 250, name: 150 };
    }, [media]);

    const columns = useResponsiveColumns(media, customWidths);

    // Determine initial viewport based on media state
    const initialViewport = useMemo(() => {
      if (!media) return 'desktop';
      if (media.isMobile) return 'mobile';
      if (media.isTablet) return 'tablet';
      return 'desktop';
    }, [media]);

    // Always render content (no conditional null return) to prevent layout shift
    return (
      <DemoContextProvider
        defaultVariant=""
        defaultViewport={initialViewport}
        defaultTheme="auto"
        initialCodePanel={{
          defaultTab: 'code',
          isOpen: false,
          maxWidth: 1000,
          minWidth: 300,
          width: 600,
        }}
      >
        <DemoPageContent
          demoWidget={demoWidget}
          tabTitles={tabTitles}
          properties={properties}
          callbacks={callbacks}
          title={title}
          description={description}
          stackBlitzCodes={stackBlitzCodes}
          pageIcon={pageIcon}
          sourceId={sourceId}
          editId={editId}
          features={features}
          tabs={tabs}
          showStackBlitzEmbed={showStackBlitzEmbed}
          columns={columns}
          media={media}
          playgroundCode={playgroundCode}
        />
      </DemoContextProvider>
    );
  },
  (prev, next) => {
    // More efficient memo comparison - only re-render if these specific props change
    return (
      prev.title === next.title &&
      prev.demoWidget === next.demoWidget &&
      prev.properties === next.properties &&
      prev.callbacks === next.callbacks &&
      prev.features?.length === next.features?.length
    );
  }
);

DemoPageRenderer.displayName = 'DemoPageRenderer';

export default DemoPageRenderer;
