import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer } from "../components";
import useMedia from "./useMedia";

function drawer() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(250);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(550);
    }
  }, [media]);

  return (
    width > 0 && (
      <div>
        <Button onClick={() => setOpen(true)} label="Open drawer"></Button>
        {open && (
          <Drawer
            position="right"
            width={width}
            onClose={() => setOpen(false)}
            containedToParent={ref}
          >
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
    )
  );
}

export default drawer;
