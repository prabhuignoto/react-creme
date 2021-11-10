import React, { CSSProperties } from "react";
import { Switch } from "../components";

const wrap: CSSProperties = {
  margin: "0.5rem 0",
};

function switchComponent() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ width: "150px", ...wrap }}>
        <Switch label="Settings" labelOutside checked focusable={false} />
      </div>
      <div style={{ width: "100px", ...wrap }}>
        <Switch label="Settings" checked />
      </div>
      <div style={{ width: "200px", ...wrap }}>
        <Switch label="Are you authorized" size="md" />
      </div>
      <div style={{ width: "250px", ...wrap }}>
        <Switch label="Mookupodi" size="lg" labelOutside />
      </div>
      <div style={{ width: "100px", ...wrap }}>
        <Switch label="setting" disabled />
      </div>
    </div>
  );
}

export default switchComponent;
