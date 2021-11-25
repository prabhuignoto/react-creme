import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer } from "../components";
import DemoPageRenderer from "./demo-page-renderer";
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
      <DemoPageRenderer
        tabTitles={["drawer", "properties"]}
        data={[
          {
            name: "position",
            description:
              "docking position of the drawer. 'left' | 'right' | 'top' | 'bottom'",
            default: "left",
            optional: "Yes",
          },
          {
            name: "height",
            description:
              "custom height to be used when docked to top or bottom",
            default: "300",
            optional: "Yes",
          },
          {
            name: "width",
            description: "custom width to be used when docked to left or right",
            default: "300",
            optional: "Yes",
          },
          {
            name: "transition",
            description: "custom transition for custom animation",
            default: "cubic-bezier(0.79, 0.14, 0.15, 0.86)",
            optional: "Yes",
          },
        ]}
        demoWidget={
          <div className="rc-demo-widget">
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
        }
      ></DemoPageRenderer>
    )
  );
}

export default drawer;
