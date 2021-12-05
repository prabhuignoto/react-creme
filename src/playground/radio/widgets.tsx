import React, { CSSProperties, useEffect } from "react";
import { Radio, Section } from "../../components";
import useMedia from "../useMedia";

const style: CSSProperties = {
  minWidth: "50px",
};

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(200);
    } else if (media.isMobile) {
      setWidth(200);
    } else if (media.isBigScreen) {
      setWidth(200);
    } else if (media.isDesktop) {
      setWidth(200);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <div
            style={{ ...style, width: `${width}px` }}
            className="rc-demo-widget"
          >
            <Radio label="Radio option one" />
          </div>
        </Section>
        <Section title="Checkbox disabled">
          <div
            style={{ ...style, width: `${width}px` }}
            className="rc-demo-widget"
          >
            <Radio label="Radio option two" size="md" disabled />
          </div>
        </Section>
        <Section title="Custom Size">
          <div
            style={{ ...style, width: `${width}px` }}
            className="rc-demo-widget"
          >
            <Radio label="Radio option three" size="lg" />
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
