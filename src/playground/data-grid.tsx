import React from "react";
import { DataGrid } from "../components";

function dataGrid() {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        layoutStyle="comfortable"
        columns={[
          { name: "name", type: "string", sortable: true, width: 300 },
          { name: "age", type: "number", sortable: false },
          { name: "dept", type: "string", width: 400 },
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
    </div>
  );
}

export default dataGrid;
