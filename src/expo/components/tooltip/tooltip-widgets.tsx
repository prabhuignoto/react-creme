import React, { useLayoutEffect, useState } from "react";
import {
  BlockQuote,
  Card,
  Image,
  RadioGroup,
  Section,
  Tooltip,
} from "../../../components";
import { ToolTipPosition } from "../../../components/tooltip/tooltip-model";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

const Widgets = () => {
  const [position, setPosition] = useState<ToolTipPosition>("top center");

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
      setWidth(580);
    } else if (media.isMobile) {
      setWidth(400);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section>
          <BlockQuote>
            The Component supports 12 different docking positions.
          </BlockQuote>
          <div className="rc-demo-widget" style={{ width: "400px" }}>
            <RadioGroup
              layout="row"
              onSelected={(val) => setPosition(val as ToolTipPosition)}
              items={[
                { label: "top center", value: "top center", checked: true },
                { label: "top left", value: "top left" },
                { label: "top right", value: "top right" },
                { label: "bottom center", value: "bottom center" },
                { label: "bottom left", value: "bottom left" },
                { label: "bottom right", value: "bottom right" },
                { label: "left center", value: "left center" },
                { label: "left top", value: "left top" },
                { label: "left bottom", value: "left bottom" },
                { label: "right center", value: "right center" },
                { label: "right top", value: "right top" },
                { label: "right bottom", value: "right bottom" },
              ]}
            ></RadioGroup>
          </div>
        </Section>
        <Section title="On Hover">
          <BlockQuote>
            The Tooltip is activated by hovering over the target element.
          </BlockQuote>
          <DemoWidget>
            <Tooltip
              message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
              position={position}
              minWidth={160}
            >
              <div style={{ width: `${width}px`, marginTop: "1rem" }}>
                <Card minHeight={100}>
                  Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean
                  molestie velit quis volutpat vestibulum. Donec facilisis est
                  ac condimentum aliquet. Nam semper dui eget sagittis sagittis.
                  Aenean sodales vulputate magna vitae sodales. Phasellus
                  dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam
                  diam, at pulvinar
                </Card>
              </div>
            </Tooltip>
          </DemoWidget>
        </Section>
        <Section title="Static Tooltip">
          <BlockQuote>
            The Tooltip can also be configured to be static.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px`, marginTop: "1rem" }}>
              <Tooltip
                message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
                position={position}
                minWidth={150}
                isStatic
              >
                <div style={{ width: `${width}px` }}>
                  <Card>
                    <Image
                      height={400}
                      src="https://www.dccomics.com/sites/default/files/Gallery_20210914_BM_THEWORLD_61401312483190.19934149.jpg"
                    />
                  </Card>
                </div>
              </Tooltip>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
};

export { Widgets };
