import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Skeleton } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";
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
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default rendering">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} blocks={1} />
            </div>
          </DemoWidget>
        </Section>
        <Section title="With Circle">
          <BlockQuote>
            A circle can be added to the Skeleton to make it more visible.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} blocks={1} showCircle />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom row count and height">
          <BlockQuote>The height and row count can be customized.</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={8} rowHeight={5} blocks={1} />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Animated rows">
          <BlockQuote>
            The rows can be animated by setting the <code>animate</code> prop
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} animate />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Default rendering">
          <BlockQuote>Can customize the number of blocks</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={4} rowHeight={8} blocks={2} />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
