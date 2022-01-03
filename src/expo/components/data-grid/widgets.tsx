import React, { useLayoutEffect } from "react";
import { BlockQuote, DataGrid, Section } from "../../../components";
import { DataGridColumn } from "../../../components/data-grid/data-grid-model";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

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
  const [columns, setColumns] = React.useState<DataGridColumn[]>([
    { name: "name", type: "string" },
    { name: "age", type: "number" },
    { name: "dept", type: "string" },
    { name: "marks", type: "number" },
  ]);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(1250);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(500);
      setColumns([
        { name: "name", type: "string" },
        { name: "marks", type: "number" },
        { name: "dept", type: "string" },
      ]);
    } else if (media.isTablet) {
      setWidth(650);
      setColumns([
        { name: "name", type: "string", width: 200 },
        { name: "dept", type: "string", width: 200 },
        { name: "marks", type: "number" },
      ]);
    } else if (media.isMobile) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Comfortable View">
          <BlockQuote>
            In Comfortable mode, the display density is set to high and is
            preferable for better readability.
          </BlockQuote>
          <DemoWidget>
            <div className="rc-demo-widget" style={{ width: `${width}px` }}>
              <DataGrid
                layoutStyle="comfortable"
                border
                gridWidth={width}
                columns={columns}
                data={data}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Compact View">
          <BlockQuote>
            In Compact mode, the display density is set to low and is preferred
            for smaller viewport and when you want to cramp in more rows in the
            grid.
          </BlockQuote>
          <DemoWidget>
            <div className="rc-demo-widget" style={{ width: `${width}px` }}>
              <DataGrid
                layoutStyle="compact"
                fixedHeight
                border
                columns={columns}
                data={data}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Sortable">
          <BlockQuote>
            Individual columns can be configured to be sortable.
          </BlockQuote>
          <DemoWidget>
            <div className="rc-demo-widget" style={{ width: `${width}px` }}>
              <DataGrid
                layoutStyle="comfortable"
                border
                columns={columns}
                data={data}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Table outlook">
          <BlockQuote>
            Use the <code>zebra</code> property to alternate the background
            color of the rows.
          </BlockQuote>
          <DemoWidget>
            <div className="rc-demo-widget" style={{ width: `${width}px` }}>
              <DataGrid
                layoutStyle="comfortable"
                zebra
                columns={columns}
                data={data}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
