import React, { useEffect } from "react";
import { Sidebar } from "../components";
import DemoPageRenderer from "./demo-page-renderer";
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

  return (
    width > 0 && (
      <DemoPageRenderer
        tabTitles={["Sidebar", "Properties"]}
        demoWidget={
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
        }
        data={[
          {
            name: "groups",
            description: "Collection of sidebar items passed in groups",
            default: "[]",
            optional: "No",
          },
          {
            name: "onSelect",
            description:
              "Callback that gets invoked on selecting a sidebar item",
            default: "",
            optional: "Yes",
          },
        ]}
      ></DemoPageRenderer>
    )
  );
}

export default sidebar;
