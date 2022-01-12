import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
import { BlockQuote, List, Section } from "../../../lib/components";
import { responsiveState } from "../../atoms/home";
import { DemoWidget } from "../../common/demo-widget";

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <List
                maxHeight={450}
                onSelection={(val) => console.log(val)}
                options={Array.from({ length: 5 }, (_, i) => ({
                  name: `Item ${i + 1}`,
                  value: `Item ${i + 1}`,
                }))}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Multi selection mode">
          <BlockQuote>
            In Multi selection mode you can select multiple items.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <List
                onSelection={(val) => console.log(val)}
                allowMultiSelection
                maxHeight={350}
                options={[
                  {
                    name: "india",
                    value: "india",
                  },
                  { name: "usa", value: "usa" },
                  { name: "uk", value: "uk" },
                  { name: "France", value: "france" },
                  { name: "germany", value: "germany", disabled: true },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Searchable list">
          <BlockQuote>
            With searchable list items can be quickly searched.
          </BlockQuote>
          <DemoWidget>
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
          </DemoWidget>
        </Section>
        <Section title="Virtualized">
          <BlockQuote>
            The virtualized list is a performance improvement over the default
            rendering. It renders only the visible items
          </BlockQuote>
          <DemoWidget>
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
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
