import React, { useEffect } from "react";
import { ImageComparer } from "../../components";
import useMedia from "./../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>("90%");

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth("80%");
    } else if (media.isMobile) {
      setWidth("80%");
    } else if (media.isBigScreen) {
      setWidth(950);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
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
    </div>
  );
}

export default Widgets;
