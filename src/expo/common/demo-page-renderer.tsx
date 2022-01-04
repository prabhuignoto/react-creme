import React, {
  LazyExoticComponent,
  Suspense,
  useLayoutEffect,
  useMemo,
} from "react";
import { CSSTransition } from "react-transition-group";
import { PageHeader, Tabs } from "../../components";
import { DataGridColumn } from "../../components/data-grid/data-grid-model";
import useMedia from "./useMedia";

const DataGrid = React.lazy(() =>
  import("../../components/data-grid/data-grid").then(({ DataGrid }) => ({
    default: DataGrid,
  }))
);

interface DemoPageRendererProps {
  demoWidget: LazyExoticComponent<React.FC>;
  tabTitles: string[];
  data: any[];
  title?: string;
  description?: string;
}

const DemoPageRenderer: React.FunctionComponent<DemoPageRendererProps> =
  React.memo(
    ({
      demoWidget,
      tabTitles,
      data,
      title,
      description,
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
          setWidth([200, 400, 200]);
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
        } else if (
          media.isBigScreen ||
          media.isExtraLargeScreen ||
          media.isTablet
        ) {
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
            {title && <PageHeader title={title}>{description}</PageHeader>}
            <Tabs labels={tabTitles}>
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
                  <DataGrid
                    layoutStyle={"comfortable"}
                    columns={columns}
                    data={data}
                    border
                  />
                </Suspense>
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
