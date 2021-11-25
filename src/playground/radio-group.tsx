import React, { CSSProperties } from "react";
import { RadioGroup } from "../components";

const style: CSSProperties = {
  width: "200px",
  margin: "1rem 0",
};

function radioGroup() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={style}>
        <RadioGroup
          items={[
            { label: "prabhu", disabled: false },
            { label: "tester" },
            { label: "murthy", disabled: true },
            { label: "mayhem", checked: true },
          ]}
          onSelected={(val) => console.log(val)}
        />
      </div>
    </div>
  );
}

export default radioGroup;
