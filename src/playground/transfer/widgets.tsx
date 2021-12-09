import React, { useLayoutEffect } from "react";
import { Section, Transfer } from "../../components";
import useMedia from "../useMedia";

function widgets() {
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
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Transfer
                list1={["one", "two", "five", "six"]}
                list2={["three", "four", "seven", "eight"]}
                onChange={(val, val2) => console.log(val, val2)}
              />
            </div>
          </div>
        </Section>
        <Section title="Search">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Transfer
                list1={[
                  "one",
                  "two",
                  "five",
                  "six",
                  "nine",
                  "ten",
                  "thirteen",
                  "fourteen",
                  "seventeen",
                  "eighteen",
                ]}
                list2={["three", "four", "seven", "eight"]}
                onChange={(val, val2) => console.log(val, val2)}
                enableSearch
                virtualize
              />
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
