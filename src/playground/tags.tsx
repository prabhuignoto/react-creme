import React from "react";
import { Tags } from "../components";

function tags() {
  return (
    <>
      <div style={{ width: "500px" }}>
        <Tags
          items={[
            { name: "prabhu", disabled: false },
            { name: "blue" },
            { name: "red" },
            { name: "orange" },
            { name: "tester", disabled: false },
          ]}
          maxTags={15}
          restrictToValues={["one", "two"]}
          onSelected={(val) => console.log(val)}
          readonly
        />
      </div>
      <br></br>
      <br></br>
      <div style={{ width: "500px" }}>
        <Tags
          items={[
            { name: "prabhu", disabled: false },
            { name: "blue" },
            { name: "red" },
            { name: "orange" },
            { name: "tester", disabled: false },
          ]}
          maxTags={15}
          onSelected={(val) => console.log(val)}
        />
      </div>
    </>
  );
}

export default tags;
