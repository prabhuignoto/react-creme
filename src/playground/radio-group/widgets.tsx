import React, { useEffect } from "react";
import { RadioGroup, Section } from "../../components";
import useMedia from "../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(400);
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
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
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
