import React from "react";
import { List } from "../components";

function list() {
  return (
    <div>
      <List
        allowMultipleSelection
        options={[
          { name: "india", value: "india" },
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
