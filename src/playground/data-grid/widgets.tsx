import React, { useEffect } from "react";
import { BlockQuote, DataGrid, Section } from "../../components";
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
      setWidth(700);
    } else if (media.isMobile) {
      setWidth(450);
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
          <BlockQuote>
            In Comfortable mode, the display density is set to high and is
            preferred for better readability.
          </BlockQuote>
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
          <BlockQuote>
            In Compact mode, the display density is set to low and is preferred
            for smaller viewport and when you want to cramp in more rows in the
            grid.
          </BlockQuote>
          <div className="rc-demo-widget" style={{ width: `${width}px` }}>
            <DataGrid
              layoutStyle="compact"
              fixedHeight
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
          <BlockQuote>
            Individual columns can be configured to be sortable.
          </BlockQuote>
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
