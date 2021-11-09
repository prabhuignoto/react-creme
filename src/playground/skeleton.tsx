import React from "react";
import { Skeleton } from "../components";

function skeleton() {
  return (
    <>
      <div>
        <Skeleton rows={6} rowHeight={10} blocks={2} blink showCircle animate />
      </div>
      <br></br>
      <br></br>
      <div>
        <Skeleton rows={6} rowHeight={10} blocks={1} blink showCircle />
      </div>
    </>
  );
}

export default skeleton;
