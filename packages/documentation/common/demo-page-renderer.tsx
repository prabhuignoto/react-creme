import React, {
  LazyExoticComponent,
  Suspense,
  useLayoutEffect,
  useMemo,
} from "react";
import { BookOpen, Code, Sliders } from "react-feather";
import { CSSTransition } from "react-transition-group";
import { PageHeader, Section, Tabs } from "../../lib/components";
import { DataGridColumn } from "../../lib/components/data-grid/data-grid-model";
import "./demo-page-renderer.scss";
import StackBlitz from "./stackblitz";
import useMedia from "./useMedia";

const DataGrid = React.lazy(() =>
  import("../../lib/components/data-grid/data-grid").then(({ DataGrid }) => ({
    default: DataGrid,
  }))
);

const Icons = [
  <BookOpen size={18} key="book-open" />,
  <Sliders size={18} key="settings" />,
  <Code size={18} key="code" />,
];

interface DemoPageRendererProps {
  demoWidget: LazyExoticComponent<React.FC>;
  tabTitles: string[];
  properties: any[];
  callbacks?: any[];
  title?: string;
  description?: string;
  stackBlitzCodes?: string[];
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

      const columns: DataGridColumn[] = useMemo(() => {
        if (!width || !media) {
          return [];
        }

        if (media.isMobile) {
          return [
            {
              name: "name",
              type: "string",
              sortable: true,
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
            },
            { name: "description", type: "string" },
          ];
        } else if (media.isBigScreen || media.isExtraLargeScreen) {
          return [
            {
              name: "name",
              type: "string",
              sortable: true,
              width: width[0],
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
            },
            { name: "description", type: "string", width: width[1] },
            {
              name: "default",
              type: "string",
              width: width[2],
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
            },
            { name: "optional", type: "string" },
            { name: "type", type: "string" },
          ];
        } else {
          return [
            {
              name: "name",
              type: "string",
              sortable: true,
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
              width: 150,
            },
            { name: "description", type: "string" },
            {
              name: "default",
              type: "string",
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
              width: 150,
            },
          ];
        }
      }, [media, width]);

      return (
        width && (
          <div className="rc-demo-page">
            {title && (
              <PageHeader title={title} size="md">
                {description}
              </PageHeader>
            )}
            <Tabs labels={tabTitles} icons={Icons}>
              <div className="rc-demo-widgets-wrapper">
                <Suspense fallback={<span>Loading Widgets...</span>}>
                  <CSSTransition
                    key={tabTitles.join("")}
                    classNames="widget-fade"
                    timeout={300}
                  >
                    <Demo />
                  </CSSTransition>
                </Suspense>
              </div>
              <div className="rc-demo-prop-section">
                <Suspense fallback={<div></div>}>
                  {properties && (
                    <Section title="Properties">
                      <DataGrid
                        layoutStyle={"comfortable"}
                        columns={columns}
                        data={properties}
                        border
                        rowHeight={68}
                      />
                    </Section>
                  )}
                  {callbacks && (
                    <Section title="Callbacks">
                      <DataGrid
                        layoutStyle={"comfortable"}
                        columns={columns}
                        data={callbacks}
                        border
                        rowHeight={68}
                      />
                    </Section>
                  )}
                </Suspense>
              </div>
              <div className="rc-demo-stackblitz-collection">
                {stackBlitzCodes &&
                  stackBlitzCodes.map((code) => (
                    <div className="rc-demo-stackblitz" key={code}>
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

DemoPageRenderer.displayName = "DemoPageRenderer";

export default DemoPageRenderer;
