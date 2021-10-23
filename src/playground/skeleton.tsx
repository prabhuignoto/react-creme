import React from "react";
import { Skeleton } from "../components";

function skeleton() {
  return (
    <div>
      <Skeleton rows={6} rowHeight={10} blocks={3} blink />
    </div>
  );
}

export default skeleton;
