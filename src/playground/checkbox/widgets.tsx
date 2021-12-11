import React, { CSSProperties, useLayoutEffect, useMemo } from "react";
import { CheckBox, Section } from "../../components";
import useMedia from "../common/useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  const style = useMemo(() => {
    return {
      width: `${width}px`,
      margin: "1rem 0",
    } as CSSProperties;
  }, [width]);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(250);
    } else if (media.isMobile) {
      setWidth(250);
    } else if (media.isBigScreen) {
      setWidth(250);
    } else if (media.isDesktop) {
      setWidth(250);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <div className="rc-demo-widget" style={style}>
            <CheckBox
              label="select"
              onChange={(ele) => console.log(ele)}
              focusIcon
            />
          </div>
        </Section>
        <Section title="Large size">
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
        </Section>
        <Section>
          <div className="rc-demo-widget" style={style}>
            <CheckBox
              label="select the value its too lg"
              onChange={(ele) => console.log(ele)}
              size="md"
              border={false}
            />
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
