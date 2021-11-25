import React, { useEffect } from "react";
import { Splitter } from "../components";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function splitter() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        tabTitles={["Splitter", "properties"]}
        data={[
          {
            name: "direction",
            description:
              "sets the direction of split 'horizontal' | 'vertical'",
            default: "horizontal",
            optional: "Yes",
          },
          {
            name: "border",
            description: "enables or disables the border",
            default: "False",
            optional: "Yes",
          },
          {
            name: "minSplitWidth",
            description: "Minimum split width",
            default: "200",
            optional: "Yes",
          },
          {
            name: "maxSplitWidth",
            description: "Maximum split width",
            default: "400",
            optional: "Yes",
          },
          {
            name: "minSplitHeight",
            description: "Minimum split height",
            default: "100",
            optional: "Yes",
          },
          {
            name: "maxSplitHeight",
            description: "Maximum split height",
            default: "200",
            optional: "Yes",
          },
        ]}
        demoWidget={
          <div style={{ width: `${width}px` }} className="rc-demo-widgets">
            <div className="rc-demo-widget">
              <Splitter
                dir="horizontal"
                minSplitWidth={200}
                maxSplitWidth={300}
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
            <div className="rc-demo-widget">
              <Splitter
                dir="vertical"
                minSplitHeight={100}
                maxSplitHeight={300}
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
          </div>
        }
      />
    )
  );
}

export default splitter;
