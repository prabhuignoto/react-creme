import React, { useEffect } from "react";
import { Tabs } from "../components/tabs/tabs";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function tabs() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        tabTitles={["Tabs", "properties"]}
        data={[
          {
            name: "tabStyle",
            description: "sets the tab style. 'flat' | 'rounded'",
            default: "flat",
            optional: "Yes",
          },
          {
            name: "border",
            description: "enables or disables the border",
            default: "False",
            optional: "Yes",
          },
          {
            name: "labels",
            description: "sets the label for each tab",
            default: "[]",
            optional: "Yes",
          },
          {
            name: "disabledTabs",
            description: "prop to disable set of tabs",
            default: "[]",
            optional: "Yes",
          },
          {
            name: "style",
            description: "Sets any custom CSS",
            default: "{}",
            optional: "Yes",
          },
        ]}
        demoWidget={
          <div className="rc-demo-widgets">
            <div
              style={{ width: `${width}px`, margin: "1rem 0" }}
              className="rc-demo-widget"
            >
              <Tabs
                labels={["one", "two", "three"]}
                border={false}
                tabStyle="rounded"
              >
                <span>one</span>
                <span>two</span>
                <span>three</span>
              </Tabs>
            </div>
            <div
              style={{ width: `${width}px`, margin: "1rem 0" }}
              className="rc-demo-widget"
            >
              <Tabs
                labels={["one", "two", "three"]}
                tabStyle="flat"
                disabledTabs={["two", "one"]}
              >
                <span>one</span>
                <span>two</span>
                <span>three</span>
              </Tabs>
            </div>
            <div
              style={{ width: `${width}px`, margin: "1rem 0" }}
              className="rc-demo-widget"
            >
              <Tabs
                labels={[
                  "one",
                  "two",
                  "three",
                  "four",
                  "five",
                  "six",
                  "seven",
                  "eight",
                  "nine",
                ]}
                tabStyle="rounded"
                border={false}
                disabledTabs={["three", "six", "seven", "one", "two", "four"]}
              >
                <span>one</span>
                <span>two</span>
                <span>three</span>
                <span>four</span>
                <span>five</span>
                <span>six</span>
                <span>seven</span>
                <span>eight</span>
                <span>nine</span>
              </Tabs>
            </div>
            <div
              style={{ width: `${width}px`, margin: "1rem 0" }}
              className="rc-demo-widget"
            >
              <Tabs
                labels={[
                  "one",
                  "two",
                  "three",
                  "four",
                  "five",
                  "six",
                  "seven",
                  "eight",
                  "nine",
                ]}
                tabStyle="flat"
                border={false}
              >
                <span>one</span>
                <span>two</span>
                <span>three</span>
                <span>four</span>
                <span>five</span>
                <span>six</span>
                <span>seven</span>
                <span>eight</span>
                <span>nine</span>
              </Tabs>
            </div>
          </div>
        }
      ></DemoPageRenderer>
    )
  );
}

export default tabs;
