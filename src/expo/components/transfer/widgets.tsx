import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { Section, Transfer } from "../../../components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(800);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(520);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Transfer
                list1={["one", "two", "five", "six"]}
                list2={["three", "four", "seven", "eight"]}
                onChange={(val, val2) => console.log(val, val2)}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Search">
          <DemoWidget>
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
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
