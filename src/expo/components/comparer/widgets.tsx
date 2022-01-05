import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { ImageComparer, Section } from "../../../components";
import { BlockQuote } from "../../../components/block-quote/block-quote";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>("90%");

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(850);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth("80%");
    } else if (media.isMobile) {
      setWidth("90%");
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Horizontal Comparison">
        <BlockQuote>
          Compare two images side by side horizontally. The drag handle guides
          the user to the correct position.
        </BlockQuote>
        <DemoWidget fullWidth>
          <div
            style={{
              height: "450px",
              width: `${Number.isInteger(width) ? `${width}px` : width}`,
            }}
          >
            <ImageComparer
              direction="horizontal"
              sourceOne="https://i.imgur.com/gypU9cN.jpg"
              sourceTwo="https://i.imgur.com/LZXFDdq.jpg"
            ></ImageComparer>
          </div>
        </DemoWidget>
      </Section>
      <Section title="Vertical comparison">
        <BlockQuote>
          Compare two images side by side vertically. The drag handle guides the
          user to the correct position.
        </BlockQuote>
        <DemoWidget fullWidth>
          <div
            style={{
              height: "450px",
              width: `${Number.isInteger(width) ? `${width}px` : width}`,
            }}
          >
            <ImageComparer
              direction="vertical"
              sourceOne="https://i.imgur.com/gypU9cN.jpg"
              sourceTwo="https://i.imgur.com/LZXFDdq.jpg"
            ></ImageComparer>
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
