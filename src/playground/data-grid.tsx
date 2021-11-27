import React, { useEffect, useMemo } from "react";
import { DataGrid } from "../components";
import "./data-grid.scss";
import useMedia from "./useMedia";

const DataGridDemo: React.FunctionComponent = () => {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    console.log("polo");
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(1200);
    } else if (media.isDesktop) {
      setWidth(850);
    }
  }, [media]);

  const DataGridMemo = useMemo(
    () => (
      <DataGrid
        layoutStyle="comfortable"
        border
        columns={[
          { name: "name", type: "string", sortable: true },
          { name: "age", type: "number", sortable: false },
          { name: "dept", type: "string" },
          { name: "marks", type: "number" },
        ]}
        data={[
          {
            name: "John is the biggest name of the country",
            age: 30,
            dept: "physics",
            marks: 100,
          },
          {
            name: "Jane",
            age: 25,
            dept: "chemistry is the toughest job in the world",
            marks: 200,
          },
          {
            name: "Lewis hamilton won the grand prix in the year 2010",
            age: 25,
            dept: "chemistry",
            marks: 400,
          },
          { name: "Johnny", age: 25, dept: "chemistry", marks: 900 },
          { name: "Clive", age: 25, dept: "chemistry", marks: 180 },
        ]}
      />
    ),
    []
  );

  return <div className={"rc-play-grid"}>{width > 0 && DataGridMemo}</div>;
};

export default DataGridDemo;
