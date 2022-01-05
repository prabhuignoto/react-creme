import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, Section, Slider } from "../../../components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

const Widgets = () => {
  const media = useRecoilValue(responsiveState);
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
    } else if (media.isExtraLargeScreen) {
      setWidth(500);
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
          <BlockQuote>
            The tooltip will only show when the user hovers over the slider.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider
                start={1}
                end={20}
                position="top"
                knobShape="square"
                knobSize={15}
                sliderValue={10}
                showTooltipOnHover
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Formatted value">
          <BlockQuote>
            The slider can also display the value in a formatted way.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Slider
                start={1}
                end={20}
                sliderValue={15}
                knobSize={16}
                formatter={(val) => `value: ${val}`}
                tooltipWidth={70}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Disabled state">
          <BlockQuote>
            The slide can be disabled via the <code>disabled</code> prop.
          </BlockQuote>
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

export default Widgets;
