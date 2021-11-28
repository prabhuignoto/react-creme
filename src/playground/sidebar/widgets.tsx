import React, { useEffect } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
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
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);
  return (
    <div style={{ width: `${width}px` }} className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <Sidebar
          groups={[
            {
              title: "Section 1",
              items: [{ name: "tester" }, { name: "tester 2" }],
            },
            {
              title: "Section 2",
              items: [{ name: "tester" }, { name: "tester 2" }],
            },
            {
              title: "Section 3",
              items: [{ name: "tester" }, { name: "tester 3" }],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default widgets;
