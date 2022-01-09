import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, Section, Skeleton } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setWidth(650);
    } else if (media.isBigScreen) {
      setWidth(550);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default rendering">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={6} blocks={1} />
            </div>
          </DemoWidget>
        </Section>
        <Section title="With Circle">
          <BlockQuote>
            A circle can be added to the Skeleton to make it more visible.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Skeleton rows={6} rowHeight={6} blocks={1} showCircle />
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
