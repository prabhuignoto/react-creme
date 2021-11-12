import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ width: "250px" }}>
        <Slider
          start={14}
          end={19}
          // onChange={(val) => console.log(val)}
          position="top"
          knobShape="square"
          knobSize={15}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ width: "350px" }}>
        <Slider
          start={52}
          end={62}
          // onChange={(val) => console.log(val)}
          knobSize={16}
          position="bottom"
          sliderValue={60}
        />
      </div>
    </div>
  );
}

export default slider;
