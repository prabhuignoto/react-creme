import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Skeleton } from "../../components";
import useMedia from "../useMedia";

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
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} blocks={1} />
            </div>
          </div>
        </Section>
        <Section title="With Circle">
          <BlockQuote>
            A circle can be added to the Skeleton to make it more visible.
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} blocks={1} showCircle />
            </div>
          </div>
        </Section>
        <Section title="Custom row count and height">
          <BlockQuote>The height and row count can be customized.</BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={8} rowHeight={5} blocks={1} />
            </div>
          </div>
        </Section>
        <Section title="Animated rows">
          <BlockQuote>
            The rows can be animated by setting the <code>animate</code> prop
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} animate />
            </div>
          </div>
        </Section>
        <Section title="Default rendering">
          <BlockQuote>Can customize the number of blocks</BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={4} rowHeight={8} blocks={2} />
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
