import React from "react";
import { Tags } from "../components";

function tags() {
  return (
    <div style={{ width: "500px" }}>
      <Tags
        items={[
          { name: "prabhu", disabled: true },
          { name: "ramya" },
          { name: "tester", disabled: true },
        ]}
        maxTags={15}
        restrictToValues={["one", "two"]}
        onSelected={(val) => console.log(val)}
      />
    </div>
  );
}

export default tags;
