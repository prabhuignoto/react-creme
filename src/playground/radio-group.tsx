import React, { CSSProperties } from "react";
import { RadioGroup } from "../components";

const style: CSSProperties = {
  minWidth: "50px",
  margin: "1rem 0",
  // ...wrap,
};

function radioGroup() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={style}>
        <RadioGroup
          items={[
            { label: "prabhu", disabled: true },
            { label: "tester" },
            { label: "prabhu", disabled: false },
            { label: "tester" },
          ]}
          onSelected={(val) => console.log(val)}
        />
      </div>
    </div>
  );
}

export default radioGroup;
