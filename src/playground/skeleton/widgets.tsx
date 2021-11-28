import React, { useEffect } from "react";
import { Skeleton } from "../../components";
import useMedia from "../useMedia";

function widgets() {
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
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Skeleton rows={6} rowHeight={10} blocks={2} showCircle animate />
          </div>
        </div>
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Skeleton rows={6} rowHeight={10} blocks={1} showCircle />
          </div>
        </div>
      </div>
    )
  );
}

export default widgets;
