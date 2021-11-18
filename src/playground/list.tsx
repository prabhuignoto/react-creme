import React from "react";
import { List } from "../components";

function list() {
  return (
    <div style={{ minHeight: "400px", width: "450px", margin: "0 auto" }}>
      <br />
      <List
        enableSearch
        maxHeight={400}
        virtualized
        onSelection={(val) => console.log(val)}
        options={Array.from({ length: 500 }, (_, i) => ({
          name: `Item ${i}`,
          value: `Item ${i}`,
        }))}
      />
      <br />
      <List
        onSelection={(val) => console.log(val)}
        allowMultiSelection
        options={[
          {
            name: "india is a huge country with a enormous land and rivers india is a huge country with a enormous land and rivers",
            value: "india",
          },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk" },
          { name: "France", value: "france" },
          { name: "germany", value: "germany", disabled: true },
        ]}
      />
    </div>
  );
}

export default list;
