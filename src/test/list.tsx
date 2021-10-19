import React from "react";
import { List } from "../components";

function list() {
  return (
    <div style={{ minHeight: "400px", width: "350px" }}>
      <List
        allowMultipleSelection
        onSelection={(val) => console.log(val)}
        options={[
          {
            name: "india is a huge country with a enormous land and rivers india is a huge country with a enormous land and rivers",
            value: "india",
          },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk" },
          { name: "germany", value: "germany", disabled: true },
          { name: "pakistan", value: "pakistan" },
          { name: "srilanka", value: "srilanka" },
        ]}
      />
    </div>
  );
}

export default list;
