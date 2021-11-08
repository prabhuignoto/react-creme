import React, { CSSProperties } from "react";
import { Input } from "../components";
import { ChevronRightIcon } from "../icons";

const wrap: CSSProperties = {
  margin: "0.5rem 0",
};

function inputs() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "200px", ...wrap }}>
        <Input enableClear>
          <ChevronRightIcon />
        </Input>
      </div>
      <div style={{ width: "200px", ...wrap }}>
        <Input enableClear></Input>
      </div>
      <div style={{ width: "200px", ...wrap }}>
        <Input enableClear state="error"></Input>
      </div>
    </div>
  );
}

export default inputs;
