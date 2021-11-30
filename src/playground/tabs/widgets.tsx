import React, { useEffect } from "react";
import { Tabs } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
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
    )
  );
}

export default widgets;
