import React, { useLayoutEffect, useState } from "react";
import {
  BlockQuote,
  Card,
  Dropdown,
  Image,
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
    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(550);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(350);
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
            <Dropdown
              placeholder="choose a position"
              onSelected={(val) => {
                setPosition(val as ToolTipPosition);
              }}
              options={[
                { name: "top center", value: "top center" },
                { name: "top left", value: "top left" },
                { name: "top right", value: "top right" },
                { name: "bottom center", value: "bottom center" },
                { name: "bottom left", value: "bottom left" },
                { name: "bottom right", value: "bottom right" },
                { name: "left center", value: "left center" },
                { name: "left top", value: "left top" },
                { name: "left bottom", value: "left bottom" },
                { name: "right center", value: "right center" },
                { name: "right top", value: "right top" },
                { name: "right bottom", value: "right bottom" },
              ]}
            ></Dropdown>
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
              bgColor="#fff"
              foreColor="#FF0000"
            >
              <div style={{ width: `${width}px` }}>
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
            <div style={{ width: `${width}px` }}>
              <Tooltip
                message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
                position={position}
                minWidth={150}
                isStatic
              >
                <div style={{ width: `${width}px` }}>
                  <Card>
                    <Image
                      height={300}
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

export default Widgets;
