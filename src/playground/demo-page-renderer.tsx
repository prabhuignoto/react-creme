import React from "react";
import { DataGrid } from "../components/data-grid/data-grid";
import { Tabs } from "../components/tabs/tabs";

interface DemoPageRendererProps {
  demoWidget: React.ReactNode;
  tabTitles: string[];
  data: any[];
}

const DemoPageRenderer: React.FunctionComponent<DemoPageRendererProps> = ({
  demoWidget,
  tabTitles,
  data,
}) => {
  return (
    <div className="rc-demo-page">
      <Tabs labels={tabTitles}>
        <div className="rc-demo-widgets-wrapper">{demoWidget}</div>
        <div className="rc-demo-prop-section">
          <DataGrid
            layoutStyle="comfortable"
            border
            columns={[
              { name: "name", type: "string", sortable: true },
              { name: "description", type: "string", width: 300 },
              { name: "default", type: "string" },
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
