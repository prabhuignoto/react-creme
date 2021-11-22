import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "../components";
import useMedia from "./useMedia";

function dialog() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(1200);
    } else if (media.isDesktop) {
      setWidth(850);
    }
  }, [media]);

  return (
    width > 0 && (
      <>
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
      </>
    )
  );
}

export default dialog;
