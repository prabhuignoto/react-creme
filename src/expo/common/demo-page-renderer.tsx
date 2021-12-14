import React, { useLayoutEffect } from "react";
import { DataGrid, PageHeader, Tabs } from "../../components";
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

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth([200, 400, 350]);
    } else if (media.isBigScreen) {
      setWidth([200, 250, 150]);
    } else if (media.isDesktop) {
      setWidth([150, 200, 150]);
    } else if (media.isTablet) {
      setWidth([120, 200, 120]);
    } else if (media.isMobile) {
      setWidth([150, 150, 100]);
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
              layoutStyle={"comfortable"}
              border
              columns={[
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
