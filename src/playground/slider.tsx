import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div style={{ width: "250px" }}>
      <Slider start={4} end={50} onChange={(val) => console.log(val)} />
    </div>
  );
}

export default slider;
