import React, { useEffect } from "react";
import { Section, Tabs } from "../../components";
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
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Flat tabs">
          <div style={{ width: `${width}px` }} className="rc-demo-widget">
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
              enableSwipe
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
        </Section>
        <Section title="Rounded tabs">
          <div style={{ width: `${width}px` }} className="rc-demo-widget">
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
        </Section>
        <Section title="Rounded tabs with scroll">
          <div style={{ width: `${width}px` }} className="rc-demo-widget">
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
        </Section>
        <Section title="Flat tabs (Disabled)">
          <div style={{ width: `${width}px` }} className="rc-demo-widget">
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
        </Section>
      </div>
    )
  );
}

export default widgets;
