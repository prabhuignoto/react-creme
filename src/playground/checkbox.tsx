import React, { CSSProperties } from "react";
import { CheckBox } from "../components";

const style: CSSProperties = {
  minWidth: "50px",
  margin: "1rem 0",
  // ...wrap,
};

function checkbox() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "300px" }}>
      <div style={style}>
        <CheckBox label="select" onChange={(ele) => console.log(ele)} />
      </div>
      <div>
        <CheckBox
          label="select the value its too lg"
          onChange={(ele) => console.log(ele)}
          size="md"
        />
      </div>
      <div style={style}>
        <CheckBox
          label="select"
          onChange={(ele) => console.log(ele)}
          isChecked
          size="lg"
          border={false}
        />
      </div>
    </div>
  );
}

export default checkbox;
