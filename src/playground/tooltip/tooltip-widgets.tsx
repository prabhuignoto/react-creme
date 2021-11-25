import React, { useEffect, useState } from "react";
import { Card, Image, RadioGroup, Tooltip } from "../../components";
import { ToolTipPosition } from "../../components/tooltip/tooltip-model";
import useMedia from "../useMedia";

const Widgets = () => {
  const [position, setPosition] = useState<ToolTipPosition>("top center");

  const media = useMedia();

  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget" style={{ margin: "3rem 0" }}>
        <Tooltip
          message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
          position={position}
          minWidth={160}
        >
          <div style={{ width: `${width}px` }}>
            <Card minHeight={100}>
              Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean
              molestie velit quis volutpat vestibulum. Donec facilisis est ac
              condimentum aliquet. Nam semper dui eget sagittis sagittis. Aenean
              sodales vulputate magna vitae sodales. Phasellus dignissim, diam
              id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar
            </Card>
          </div>
        </Tooltip>
      </div>
      <div
        className="rc-demo-widget"
        style={{ marginTop: "6rem", width: `${width}px` }}
      >
        <Tooltip
          message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
          position={position}
          minWidth={150}
          isStatic
        >
          <div style={{ width: `${width}px` }}>
            <Card>
              <Image
                height={500}
                src="https://www.dccomics.com/sites/default/files/Gallery_20210914_BM_THEWORLD_61401312483190.19934149.jpg"
              />
            </Card>
          </div>
        </Tooltip>
      </div>
      <div
        style={{ margin: "3rem 0", width: `${width}px` }}
        className="rc-demo-widget"
      >
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
    </div>
  );
};

export { Widgets };
