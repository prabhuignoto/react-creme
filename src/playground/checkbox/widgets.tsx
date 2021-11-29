import React, { CSSProperties, useEffect, useMemo } from "react";
import { CheckBox } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  const style = useMemo(() => {
    return {
      width: `${width}px`,
      margin: "1rem 0",
    } as CSSProperties;
  }, [width]);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(350);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div className="rc-demo-widget" style={style}>
          <CheckBox
            label="select"
            onChange={(ele) => console.log(ele)}
            focusIcon
          />
        </div>
        <div className="rc-demo-widget" style={style}>
          <CheckBox
            label="select the value its too lg"
            onChange={(ele) => console.log(ele)}
            size="md"
            border={false}
          />
        </div>
        <div className="rc-demo-widget" style={style}>
          <CheckBox
            label="select"
            onChange={(ele) => console.log(ele)}
            isChecked
            size="lg"
            border={false}
            focusIcon
          />
        </div>
      </div>
    )
  );
}

export default widgets;
