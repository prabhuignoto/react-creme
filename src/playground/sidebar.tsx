import React, { useEffect } from "react";
import { Sidebar } from "../components";
import useMedia from "./useMedia";

function sidebar() {
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

  const memoizedSidebar = React.useMemo(() => {
    return (
      <Sidebar
        groups={[
          { title: "one", items: [{ name: "prabhu" }, { name: "ramya" }] },
          { title: "two", items: [{ name: "prabhu" }, { name: "ramya" }] },
          { title: "three", items: [{ name: "prabhu" }, { name: "tester" }] },
        ]}
      />
    );
  }, []);

  return (
    width > 0 && <div style={{ width: `${width}px` }}>{memoizedSidebar}</div>
  );
}

export default sidebar;
