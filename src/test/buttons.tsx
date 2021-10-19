import React, { CSSProperties } from "react";
import { Button } from "../components";

const style: CSSProperties = {
  width: "100px",
  margin: "1rem 0",
};

function buttons() {
  return (
    <div>
      <div style={style}>
        <Button label="save as new" disabled onClick={() => alert("test")} />
      </div>
      <div style={style}>
        <Button
          label="save as new"
          type="primary"
          onClick={() => alert("test")}
        />
      </div>
      <div style={style}>
        <Button
          label="save as new"
          type="danger"
          onClick={() => alert("test")}
        />
      </div>
      <div style={style}>
        <Button label="save as new" onClick={() => alert("test")} />
      </div>
    </div>
  );
}

export default buttons;
