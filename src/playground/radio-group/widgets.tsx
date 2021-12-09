import React, { useLayoutEffect } from "react";
import { BlockQuote, RadioGroup, Section } from "../../components";
import useMedia from "../useMedia";

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
          <div className="rc-demo-widget">
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
          </div>
        </Section>
        <Section title="Custom layout">
          <BlockQuote>
            The Layout of the RadioGroup can be customized to either row or
            column.
          </BlockQuote>
          <div className="rc-demo-widget">
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
          </div>
        </Section>
        <Section title="Disabled option">
          <BlockQuote>
            Disable specific option by setting the disabled property to true.
          </BlockQuote>

          <div className="rc-demo-widget">
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
          </div>
        </Section>
      </div>
    )
  );
}

export default Widgets;
