import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ width: "250px" }}>
        <Slider
          start={4}
          end={50}
          onChange={(val) => console.log(val)}
          position="top"
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ width: "450px" }}>
        <Slider
          start={4}
          end={50}
          onChange={(val) => console.log(val)}
          position="bottom"
        />
      </div>
    </div>
  );
}

export default slider;
