import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Sidebar } from "../../../components";
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
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(500);
    }
  }, [media]);
  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <BlockQuote>Sections are collapsible by default.</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px`, height: "300px" }}>
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
