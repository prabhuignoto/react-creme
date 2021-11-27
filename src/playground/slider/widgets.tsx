import React, { useEffect } from "react";
import { Slider } from "../../components/slider/slider";
import useMedia from "../useMedia";

const Widgets = () => {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div style={{ width: `${width}px` }} className="rc-demo-widget">
          <Slider
            start={1}
            end={10}
            // onChange={(val) => console.log(val)}
            position="top"
            knobShape="square"
            knobSize={15}
            sliderValue={6}
          />
        </div>
        <div style={{ width: `${width}px` }} className="rc-demo-widget">
          {/* <Slider
          start={5}
          end={67}
          // onChange={(val) => console.log(val)}
          knobSize={16}
          position="bottom"
        /> */}
        </div>
      </div>
    )
  );
};

export { Widgets };
