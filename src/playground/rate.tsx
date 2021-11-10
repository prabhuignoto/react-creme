import React from "react";
import { Rate } from "../components/rate/rate";
import { SearchIcon } from "../icons";

function rate() {
  return (
    <>
      <div style={{ margin: "1rem 0" }}>
        <Rate onChange={(val) => alert(val)} />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <Rate size="md" />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <Rate size="lg" iconCount={3} focusable={false} />
      </div>
      <div style={{ margin: "1rem 0" }}>
        <Rate size="md" icon={<SearchIcon />} iconCount={7} />
      </div>
    </>
  );
}

export default rate;
