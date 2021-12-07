import React from "react";
import { DataGrid } from "../components/data-grid/data-grid";
import { PageHeader } from "../components/page-header/page-header";
import { Tabs } from "../components/tabs/tabs";

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
  return (
    <div className="rc-demo-page">
      {title && <PageHeader title={title}>{description}</PageHeader>}
      <Tabs labels={tabTitles}>
        <div className="rc-demo-widgets-wrapper">{demoWidget}</div>
        <div className="rc-demo-prop-section">
          <DataGrid
            layoutStyle={"comfortable"}
            border
            columns={[
              { name: "name", type: "string", sortable: true, width: 150 },
              { name: "description", type: "string", width: 250 },
              { name: "default", type: "string", width: 150 },
              { name: "optional", type: "string" },
              { name: "type", type: "string" },
            ]}
            data={data}
          />
        </div>
      </Tabs>
    </div>
  );
};

export default DemoPageRenderer;
