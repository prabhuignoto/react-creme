import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Splitter } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(680);
    } else if (media.isTablet) {
      setWidth(580);
    } else if (media.isMobile) {
      setWidth(400);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Horizontal mode">
          <BlockQuote>
            Splits the container horizontally with a drag handle for resizing
            and there by controlling the width of the left and right panels.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Splitter
                dir="horizontal"
                minSplitWidth={Math.round(width * 0.25)}
                maxSplitWidth={Math.round(width * 0.75)}
              >
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to be sure there isn&apos;t
                  anything embarrassing hidden in the middle of text. All the
                  Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet.
                </p>
              </Splitter>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Vertical Mode">
          <BlockQuote>
            Splits the container vertically with a drag handle for resizing and
            there by controlling the height of the top and bottom panels.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Splitter
                dir="vertical"
                minSplitHeight={400 * 0.25}
                maxSplitHeight={400 * 0.75}
              >
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source.
                </p>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don&apos;t
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to be sure there isn&apos;t
                  anything embarrassing hidden in the middle of text. All the
                  Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet.
                </p>
              </Splitter>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;