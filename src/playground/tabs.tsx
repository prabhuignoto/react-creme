import React, { useEffect } from "react";
import { Tabs } from "../components/tabs/tabs";
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
      <div>
        <div style={{ width: `${width}px`, margin: "1rem 0" }}>
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
        <div style={{ width: `${width}px`, margin: "1rem 0" }}>
          <Tabs labels={["one", "two", "three"]} tabStyle="flat">
            <span>one</span>
            <span>two</span>
            <span>three</span>
          </Tabs>
        </div>
        <div style={{ width: `${width}px`, margin: "1rem 0" }}>
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
        <div style={{ width: `${width}px`, margin: "1rem 0" }}>
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

export default tabs;
