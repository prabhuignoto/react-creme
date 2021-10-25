import React, { CSSProperties } from "react";
import { Button } from "../components";
import { SearchIcon } from "../icons";

const style: CSSProperties = {
  width: "100px",
  margin: "2rem 0",
};

function buttons() {
  return (
    <div>
      <div style={style}>
        <Button label="I am disabled" disabled onClick={() => alert("test")} />
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
          size="lg"
          onClick={() => alert("test")}
        />
      </div>
      <div style={style}>
        <Button label="save" onClick={() => alert("test")} />
      </div>
      <div style={style}>
        <Button label="Edit" onClick={() => alert("test")} size="sm">
          <SearchIcon />
        </Button>
      </div>
    </div>
  );
}

export default buttons;
