import React from "react";
import { Skeleton } from "../components";

function skeleton() {
  return (
    <div>
      <Skeleton rows={6} rowHeight={12} blink={true} />
    </div>
  );
}

export default skeleton;
