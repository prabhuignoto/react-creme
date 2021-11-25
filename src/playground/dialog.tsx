import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog } from "../components";
import DemoPageRenderer from "./demo-page-renderer";
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
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(600);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        data={[
          {
            name: "title",
            description: "Text title for the dialog",
            default: "",
            optional: "Yes",
          },
          {
            name: "width",
            description: "width of the dialog",
            default: "300",
            optional: "Yes",
          },
          {
            name: "height",
            description: "height of the dialog",
            default: "200",
            optional: "Yes",
          },
          {
            name: "onClose",
            description: "callback invoked on close",
            default: "",
            optional: "Yes",
          },
          {
            name: "onSuccess",
            description: "callback invoked when ok is pressed",
            default: "",
            optional: "Yes",
          },
        ]}
        tabTitles={["button", "properties"]}
        demoWidget={
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
        }
      ></DemoPageRenderer>
    )
  );
}

export default dialog;
