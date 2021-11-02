import React from "react";
import { List } from "../components";

function list() {
  return (
    <div style={{ minHeight: "400px", width: "450px" }}>
      <br />
      <List
        allowMultiSelection
        onSelection={(val) => console.log(val)}
        options={[
          {
            name: "This is a really long name to test if the dropdown can hold this without wrapping",
            value: "india",
          },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk" },
          { name: "France", value: "france" },
          { name: "germany", value: "germany", disabled: true },
        ]}
      />
      <br />
      <List
        onSelection={(val) => console.log(val)}
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
