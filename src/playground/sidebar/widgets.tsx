import React, { useLayoutEffect } from "react";
import { BlockQuote, Section } from "../../components";
import { Sidebar } from "../../components/sidebar/sidebar";
import useMedia from "../useMedia";

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
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
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
          </div>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Can optionally include a search bar for filtering the sidebar.
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
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
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
