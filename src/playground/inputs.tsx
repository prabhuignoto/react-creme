import React, { CSSProperties } from "react";
import { Input } from "../components";
import { ChevronRightIcon } from "../icons";

const wrap: CSSProperties = {
  margin: "0.5rem 0",
};

function inputs() {
  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
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
