import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "../../components";
import useMedia from "../useMedia";

const Widget = () => {
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
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(600);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <Button
          size="sm"
          onClick={() => setOpen(true)}
          label="Open dialog"
        ></Button>
        {open && (
          <Dialog
            onClose={() => setOpen(false)}
            containedToParent={ref}
            width={width}
            height={300}
          >
            <span>Test dialog content</span>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export { Widget };
