import React, { useEffect } from "react";
import { DataGrid, Section } from "../../components";
import useMedia from "../useMedia";

const data = [
  {
    name: "John",
    age: 30,
    dept: "physics",
    marks: 100,
  },
  {
    name: "Jane",
    age: 25,
    dept: "chemistry is the toughest job in the world",
    marks: 80,
  },
  {
    name: "Lewis hamilton",
    age: 25,
    dept: "chemistry",
    marks: 78,
  },
  { name: "Prabhu", age: 35, dept: "Physics", marks: 100 },
  { name: "Clive", age: 25, dept: "Biology", marks: 95 },
];

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(1200);
    } else if (media.isDesktop) {
      setWidth(850);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Comfortable View">
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <DataGrid
              layoutStyle="comfortable"
              border
              columns={[
                { name: "name", type: "string" },
                { name: "age", type: "number" },
                { name: "dept", type: "string" },
                { name: "marks", type: "number" },
              ]}
              data={data}
            />
          </div>
        </Section>
        <Section title="Compact View">
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <DataGrid
              layoutStyle="compact"
              border
              columns={[
                { name: "name", type: "string" },
                { name: "age", type: "number" },
                { name: "dept", type: "string" },
                { name: "marks", type: "number" },
              ]}
              data={data}
            />
          </div>
        </Section>
        <Section title="Sortable">
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <DataGrid
              layoutStyle="comfortable"
              border
              columns={[
                { name: "name", type: "string", sortable: true },
                { name: "age", type: "number" },
                { name: "dept", type: "string" },
                { name: "marks", type: "number" },
              ]}
              data={data}
            />
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
