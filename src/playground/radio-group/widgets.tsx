import React, { useLayoutEffect } from "react";
import { BlockQuote, RadioGroup, Section } from "../../components";
import { DemoWidget } from "../common/demo-widget";
import useMedia from "../common/useMedia";

function Widgets() {
  const media = useMedia();
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
                  { label: "John", disabled: false },
                  { label: "Doe" },
                  { label: "Murthy" },
                  { label: "Prabhu", checked: true },
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
                  { label: "John", disabled: false },
                  { label: "Doe" },
                  { label: "Prabhu", checked: true },
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
                  { label: "John", disabled: true },
                  { label: "Doe" },
                  { label: "Prabhu", checked: true },
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
