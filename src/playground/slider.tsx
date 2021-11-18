import React from "react";
import { Slider } from "../components";

function slider() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <div style={{ width: "250px" }}>
        <Slider
          start={4}
          end={19}
          // onChange={(val) => console.log(val)}
          position="top"
          knobShape="square"
          knobSize={15}
          sliderValue={8}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div style={{ width: "350px" }}>
        {/* <Slider
          start={5}
          end={67}
          // onChange={(val) => console.log(val)}
          knobSize={16}
          position="bottom"
        /> */}
      </div>
    </div>
  );
}

export default slider;
