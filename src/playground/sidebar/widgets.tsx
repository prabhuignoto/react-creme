import React, { useEffect } from "react";
import { Section } from "../../components";
import { Sidebar } from "../../components/sidebar/sidebar";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);
  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
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
