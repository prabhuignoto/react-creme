import React, { useLayoutEffect } from "react";
import { ImageComparer, Section } from "../../../components";
import { BlockQuote } from "../../../components/block-quote/block-quote";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>("90%");

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isBigScreen) {
      setWidth(950);
    } else if (media.isDesktop) {
      setWidth(650);
    } else if (media.isTablet) {
      setWidth("90%");
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