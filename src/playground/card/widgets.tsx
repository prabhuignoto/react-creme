import React, { useLayoutEffect } from "react";
import { BlockQuote, Card, Image, Section, Skeleton } from "../../components";
import { DemoWidget } from "../common/demo-widget";
import useMedia from "../common/useMedia";

function widgets() {
  const media = useMedia();

  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Card shadowed">
          <BlockQuote>
            There are slots for header, footer and the main content.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px`, marginTop: "2rem" }}>
              <Card
                alignHeader="left"
                header={<h2>header</h2>}
                footer={<span>footer</span>}
                minHeight={400}
              >
                <Skeleton
                  animate
                  rowHeight={10}
                  rows={10}
                  style={{ marginTop: "1rem" }}
                  showCircle
                ></Skeleton>
              </Card>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Card without shadow">
          <BlockQuote>Card with no shadow but with a border.</BlockQuote>
          <DemoWidget>
            <div style={{ margin: "1rem 0", width: `${width}px` }}>
              <Card alignHeader="left" minHeight={400} shadow={false}>
                <Image src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg" />
              </Card>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
