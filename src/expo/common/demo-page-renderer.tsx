import React, { useLayoutEffect, useMemo } from "react";
import { DataGrid, PageHeader, Tabs } from "../../components";
import { DataGridColumn } from "../../components/data-grid/data-grid-model";
import useMedia from "./useMedia";

interface DemoPageRendererProps {
  demoWidget: React.ReactNode;
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

      const [width, setWidth] = React.useState(null);

      useLayoutEffect(() => {
        if (!media) {
          return;
        }

        if (media.isExtraLargeScreen) {
          setWidth([200, 450, 200]);
        } else if (media.isBigScreen) {
          setWidth([180, 250, 150]);
        } else if (media.isDesktop) {
          setWidth([150, 200, 150]);
        } else if (media.isTablet) {
          setWidth([120, 200, 120]);
        } else if (media.isMobile) {
          setWidth([120, 120, 120]);
        }
      }, [media]);

      const columns: DataGridColumn[] = useMemo(() => {
        if (!width) {
          return [];
        }

        if (media && media.isMobile) {
          return [
            {
              name: "name",
              type: "string",
              sortable: true,
              formatter: (val) => (val ? `<em>${val}</em>` : ""),
            },
            { name: "description", type: "string" },
          ];
        } else {
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
        }
      }, [media, width]);

      return (
        width && (
          <div className="rc-demo-page">
            {title && <PageHeader title={title}>{description}</PageHeader>}
            <Tabs labels={tabTitles}>
              <div className="rc-demo-widgets-wrapper">{demoWidget}</div>
              <div className="rc-demo-prop-section">
                <DataGrid
                  layoutStyle={"comfortable"}
                  border
                  columns={columns}
                  data={data}
                />
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
