import React, { useEffect } from "react";
import { BlockQuote } from "../../components";
import { List } from "../../components/list/list";
import { Section } from "../../components/section/section";
import useMedia from "../useMedia";

function Widgets() {
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
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(500);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <List
                maxHeight={350}
                onSelection={(val) => console.log(val)}
                options={Array.from({ length: 25 }, (_, i) => ({
                  name: `Item ${i}`,
                  value: `Item ${i}`,
                }))}
              />
            </div>
          </div>
        </Section>
        <Section title="Multi selection mode">
          <BlockQuote>
            In Multi selection mode you can select multiple items.
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <List
                onSelection={(val) => console.log(val)}
                allowMultiSelection
                maxHeight={350}
                options={[
                  {
                    name: "india is a huge country with a enormous land and rivers india is a huge country with a enormous land and rivers",
                    value: "india",
                  },
                  { name: "usa", value: "usa" },
                  { name: "uk", value: "uk" },
                  { name: "France", value: "france" },
                  { name: "germany", value: "germany", disabled: true },
                ]}
              />
            </div>
          </div>
        </Section>
        <Section title="Searchable list">
          <BlockQuote>
            With searchable list items can be quickly searched.
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <List
                maxHeight={400}
                virtualized
                enableSearch
                onSelection={(val) => console.log(val)}
                options={Array.from({ length: 500 }, (_, i) => ({
                  name: `Item ${i}`,
                  value: `Item ${i}`,
                }))}
              />
            </div>
          </div>
        </Section>
        <Section title="Virtualized">
          <BlockQuote>
            The virtualized list is a performance improvement over the default
            rendering. It renders only the visible items
          </BlockQuote>
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <List
                maxHeight={350}
                virtualized
                showCheckIcon
                onSelection={(val) => console.log(val)}
                options={Array.from({ length: 500 }, (_, i) => ({
                  name: `Item ${i}`,
                  value: `Item ${i}`,
                }))}
              />
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default Widgets;
