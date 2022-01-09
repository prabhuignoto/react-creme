import React, { CSSProperties, useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, CheckBox, Section } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  const style = useMemo(() => {
    return {
      width: `${width}px`,
      margin: "1rem 0",
    } as CSSProperties;
  }, [width]);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(250);
    } else if (media.isMobile) {
      setWidth(250);
    } else if (media.isBigScreen) {
      setWidth(250);
    } else if (media.isDesktop) {
      setWidth(250);
    } else if (media.isExtraLargeScreen) {
      setWidth(350);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget>
            <div style={style}>
              <CheckBox
                label="Choose your preferred option"
                onChange={(ele) => console.log(ele)}
                focusIcon
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Disabled State">
          <DemoWidget>
            <div style={style}>
              <CheckBox
                label="This option is disabled"
                onChange={(ele) => console.log(ele)}
                border={false}
                disabled
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Large size">
          <BlockQuote>Comes in three sizes: small, medium, large.</BlockQuote>
          <DemoWidget>
            <div style={style}>
              <CheckBox
                label="select"
                onChange={(ele) => console.log(ele)}
                isChecked
                size="lg"
                border={false}
                focusIcon
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Checkbox style">
          <DemoWidget>
            <div style={style}>
              <CheckBox
                onChange={(ele) => console.log(ele)}
                label="Choose this option"
                focusIcon
                checkBoxStyle="round"
                isChecked
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
