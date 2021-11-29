import React, { CSSProperties, useEffect } from "react";
import { Radio } from "../../components";
import useMedia from "../useMedia";

const style: CSSProperties = {
  minWidth: "50px",
  margin: "1rem 0",
};

function widgets() {
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
        <div
          style={{ ...style, width: `${width}px` }}
          className="rc-demo-widget"
        >
          <Radio label="check" />
        </div>
        <div
          style={{ ...style, width: `${width}px` }}
          className="rc-demo-widget"
        >
          <Radio label="check1" size="md" disabled />
        </div>
        <div
          style={{ ...style, width: `${width}px` }}
          className="rc-demo-widget"
        >
          <Radio label="check2" size="lg" />
        </div>
      </div>
    )
  );
}

export default widgets;
