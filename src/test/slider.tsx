import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div>
      <Slider start={1} end={180} onChange={(val) => console.log(val)} />
    </div>
  );
}

export default slider;
