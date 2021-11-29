import React, { useEffect } from "react";
import { RadioGroup } from "../../components";
import useMedia from "../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(300);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <RadioGroup
              items={[
                { label: "prabhu", disabled: false },
                { label: "tester" },
                { label: "murthy", disabled: true },
                { label: "mayhem", checked: true },
              ]}
              onSelected={(val) => console.log(val)}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Widgets;
