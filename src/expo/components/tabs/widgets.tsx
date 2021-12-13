import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Tabs } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";
function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    } else if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Flat tabs">
          <BlockQuote>
            In flat mode, the tabs are rendered as a horizontal list of tabs
            with a flat accent.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
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
          </DemoWidget>
        </Section>
        <Section title="Rounded tabs">
          <BlockQuote>
            In rounded mode, the tabs are rendered as a horizontal list of tabs
            with rounded borders.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
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
          </DemoWidget>
        </Section>
        <Section title="Rounded tabs with scroll">
          <BlockQuote>
            When the tabs are too long to fit in the available space, they can
            be scrolled with the help of the buttons to the right.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
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
          </DemoWidget>
        </Section>
        <Section title="Flat tabs (Disabled)">
          <BlockQuote>
            Specific tabs can be disabled by passing an array of tab labels to
            the <em>disabledTabs</em> array
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
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
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
