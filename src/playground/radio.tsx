import React, { CSSProperties } from "react";
import { Radio } from "../components";

const style: CSSProperties = {
  minWidth: "50px",
  margin: "1rem 0",
  // ...wrap,
};

function radio() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={style}>
        <Radio label="check" />
      </div>
      <div style={style}>
        <Radio label="check1" size="md" disabled />
      </div>
      <div style={style}>
        <Radio label="check2" size="lg" />
      </div>
    </div>
  );
}

export default radio;
