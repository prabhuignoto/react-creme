import React, { useEffect } from "react";
import { Section, Skeleton } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
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
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} blocks={1} showCircle />
            </div>
          </div>
        </Section>
        <Section title="Custom row count and height">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={8} rowHeight={5} blocks={1} />
            </div>
          </div>
        </Section>
        <Section title="Animated rows">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={8} animate />
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
