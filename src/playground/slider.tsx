import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ width: "250px" }}>
        <Slider
          start={1}
          end={9}
          onChange={(val) => console.log(val)}
          position="top"
          knobShape="square"
          knobSize={24}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ width: "450px" }}>
        <Slider
          start={14}
          end={90}
          onChange={(val) => console.log(val)}
          knobSize={22}
        />
      </div>
    </div>
  );
}

export default slider;
