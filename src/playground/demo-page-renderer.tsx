import React, { useLayoutEffect } from "react";
import { DataGrid } from "../components/data-grid/data-grid";
import { PageHeader } from "../components/page-header/page-header";
import { Tabs } from "../components/tabs/tabs";
import useMedia from "./useMedia";

interface DemoPageRendererProps {
  demoWidget: React.ReactNode;
  tabTitles: string[];
  data: any[];
  title?: string;
  description?: string;
}

const DemoPageRenderer: React.FunctionComponent<DemoPageRendererProps> = ({
  demoWidget,
  tabTitles,
  data,
  title,
  description,
}) => {
  const media = useMedia();

  const [width, setWidth] = React.useState(null);

  const [tableStyle, setTableStyle] = React.useState<"compact" | "comfortable">(
    "compact"
  );

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth([150, 180]);
      setTableStyle("compact");
    } else if (media.isMobile) {
      setWidth([150, 150]);
      setTableStyle("compact");
    } else if (media.isDesktop) {
      setWidth([200, 400, 200]);
      setTableStyle("comfortable");
    } else if (media.isBigScreen) {
      setWidth([200, 400, 300]);
      setTableStyle("comfortable");
    }
  }, [media]);

  return (
    width && (
      <div className="rc-demo-page">
        {title && <PageHeader title={title}>{description}</PageHeader>}
        <Tabs labels={tabTitles}>
          <div className="rc-demo-widgets-wrapper">{demoWidget}</div>
          <div className="rc-demo-prop-section">
            <DataGrid
              layoutStyle={tableStyle}
              border
              fixedHeight={tableStyle === "compact"}
              columns={[
                {
                  name: "name",
                  type: "string",
                  sortable: true,
                  width: width[0],
                },
                { name: "description", type: "string", width: width[1] },
                { name: "default", type: "string", width: width[2] },
                { name: "optional", type: "string" },
                { name: "type", type: "string" },
              ]}
              data={data}
            />
          </div>
        </Tabs>
      </div>
    )
  );
};

export default DemoPageRenderer;
