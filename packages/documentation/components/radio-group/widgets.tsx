import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, RadioGroup, Section } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(200);
    } else if (media.isMobile) {
      setWidth(200);
    } else if (media.isDesktop) {
      setWidth(200);
    } else if (media.isBigScreen) {
      setWidth(200);
    } else if (media.isExtraLargeScreen) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <RadioGroup
                items={[
                  { disabled: false, label: "John" },
                  { label: "Doe" },
                  { label: "Murthy" },
                  { checked: true, label: "Prabhu" },
                ]}
                onSelected={(val) => console.log(val)}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom layout">
          <BlockQuote>
            The Layout of the RadioGroup can be customized to either row or
            column.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width * 3}px` }}>
              <RadioGroup
                layout="row"
                items={[
                  { disabled: false, label: "John" },
                  { label: "Doe" },
                  { checked: true, label: "Prabhu" },
                ]}
                onSelected={(val) => console.log(val)}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Disabled option">
          <BlockQuote>
            Disable specific option by setting the disabled property to true.
          </BlockQuote>

          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <RadioGroup
                items={[
                  { disabled: true, label: "John" },
                  { label: "Doe" },
                  { checked: true, label: "Prabhu" },
                ]}
                onSelected={(val) => console.log(val)}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="RTL">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <RadioGroup
                RTL
                items={[
                  { disabled: true, label: "John" },
                  { label: "Doe" },
                  { checked: true, label: "Prabhu" },
                ]}
                onSelected={(val) => console.log(val)}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
