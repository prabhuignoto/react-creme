import React from "react";
import { Switch } from "../../components";

function widgets() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="rc-demo-widgets"
    >
      <div style={{ width: "150px" }} className="rc-demo-widget">
        <Switch label="Settings" labelOutside checked focusable={false} />
      </div>
      <div style={{ width: "100px" }} className="rc-demo-widget">
        <Switch label="Settings" checked />
      </div>
      <div style={{ width: "200px" }} className="rc-demo-widget">
        <Switch label="Are you authorized" size="md" />
      </div>
      <div style={{ width: "250px" }} className="rc-demo-widget">
        <Switch label="Mookupodi" size="lg" labelOutside />
      </div>
      <div style={{ width: "100px" }} className="rc-demo-widget">
        <Switch label="setting" disabled />
      </div>
    </div>
  );
}

export default widgets;
