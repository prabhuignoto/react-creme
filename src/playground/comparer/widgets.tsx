import React, { useEffect } from "react";
import { ImageComparer, Section } from "../../components";
import useMedia from "./../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>("90%");

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth("90%");
    } else if (media.isMobile) {
      setWidth("90%");
    } else if (media.isBigScreen) {
      setWidth(950);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Horizontal Comparison">
        <div
          style={{
            height: "502px",
            width: `${Number.isInteger(width) ? `${width}px` : width}`,
          }}
          className="rc-demo-widget"
        >
          <ImageComparer
            direction="horizontal"
            sourceOne="https://i.imgur.com/gypU9cN.jpg"
            sourceTwo="https://i.imgur.com/gypU9cN.jpg"
          ></ImageComparer>
        </div>
      </Section>
      <Section title="Vertical comparison">
        <div
          style={{
            height: "502px",
            width: `${Number.isInteger(width) ? `${width}px` : width}`,
          }}
          className="rc-demo-widget"
        >
          <ImageComparer
            direction="vertical"
            sourceOne="https://i.imgur.com/gypU9cN.jpg"
            sourceTwo="https://i.imgur.com/gypU9cN.jpg"
          ></ImageComparer>
        </div>
      </Section>
    </div>
  );
}

export default Widgets;
