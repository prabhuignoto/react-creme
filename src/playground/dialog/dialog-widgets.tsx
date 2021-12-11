import React, { useLayoutEffect, useRef, useState } from "react";
import { Button, Dialog, Section } from "../../components";
import useMedia from "../common/useMedia";

const Widget = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
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
      <Section title="Default render">
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
      </Section>
    </div>
  );
};

export { Widget };
