import React from "react";
import { Tooltip } from "../components";

function tooltip() {
  return (
    <div>
      <Tooltip message="test tooltip" position="bottom left">
        <div style={{ width: "450px", height: "100px" }}>
          this is a content this ia some huge contentthis is a content this ia
          some huge content. this is a content this ia some huge content
        </div>
      </Tooltip>
    </div>
  );
}

export default tooltip;
