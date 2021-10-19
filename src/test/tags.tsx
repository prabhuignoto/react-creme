import React from "react";
import { Tags } from "../components";

function tags() {
  return (
    <div>
      <Tags
        items={[
          { name: "prabhu", disabled: true },
          { name: "ramya" },
          { name: "tester", disabled: true },
        ]}
        maxTags={5}
        restrictToValues={["one", "two"]}
        onSelected={(val) => console.log(val)}
      />
    </div>
  );
}

export default tags;
