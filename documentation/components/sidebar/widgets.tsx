import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, Section, Sidebar } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isExtraLargeScreen) {
      setWidth(600);
    }
  }, [media]);
  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <BlockQuote>Sections are collapsible by default.</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px`, height: "400px" }}>
              <Sidebar
                groups={[
                  {
                    title: "Section 1",
                    items: [{ name: "tester" }, { name: "tester 2" }],
                  },
                  {
                    title: "Section 2",
                    items: [{ name: "tester" }, { name: "tester 2" }],
                  },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Can optionally include a search bar for filtering the sidebar.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px`, height: "450px" }}>
              <Sidebar
                enableSearch
                groups={[
                  {
                    title: "Section 1",
                    items: [{ name: "tester" }],
                  },
                  {
                    title: "Section 2",
                    items: [{ name: "tester" }, { name: "tester 2" }],
                  },
                  {
                    title: "Section 3",
                    items: [{ name: "tester" }],
                  },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;