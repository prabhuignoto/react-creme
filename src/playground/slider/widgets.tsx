import React, { useLayoutEffect } from "react";
import { BlockQuote, Section } from "../../components";
import { Slider } from "../../components/slider/slider";
import { DemoWidget } from "../common/demo-widget";
import useMedia from "../common/useMedia";

const Widgets = () => {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(350);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default Render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider
                start={4}
                end={13}
                // onChange={(val) => console.log(val)}
                position="top"
                knobShape="square"
                knobSize={15}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Positioning the Tooltip">
          <BlockQuote>
            Can also position the tooltip to be on the top or bottom of the
            slider. The Example here shows the tooltip on the bottom.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider start={15} end={70} knobSize={16} position="bottom" />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Preselected Value">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider
                start={1}
                end={20}
                position="top"
                knobShape="square"
                knobSize={15}
                sliderValue={10}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Show Tooltip on Hover">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider start={1} end={5} knobSize={16} showTooltipOnHover />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Disabled state">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider
                start={5}
                end={67}
                disabled
                knobSize={16}
                sliderValue={60}
                position="bottom"
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
};

export { Widgets };
