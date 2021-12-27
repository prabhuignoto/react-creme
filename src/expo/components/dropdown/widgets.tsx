import React, { useLayoutEffect } from "react";
import { BlockQuote, Dropdown, Section } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Single selection">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={400}
                placeholder="choose another country"
                onSelected={(val) => console.log(val)}
                options={[
                  { name: "germany", value: "germany", disabled: true },
                  { name: "india", value: "india" },
                  { name: "usa", value: "usa", selected: true },
                  { name: "uk", value: "uk" },
                  { name: "srilanka", value: "srilanka" },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Multi selection">
          <BlockQuote>
            With multi selection, you can select multiple options.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                onSelected={(val) => console.log(val)}
                placeholder="choose a country"
                allowMultiSelection
                maxMenuHeight={400}
                options={[
                  { name: "germany", value: "germany", disabled: true },
                  { name: "india", value: "india" },
                  { name: "usa", value: "usa" },
                  { name: "uk", value: "uk", selected: true },
                  { name: "srilanka", value: "srilanka", selected: false },
                  { name: "brazil", value: "brazil", selected: false },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Available options can be filtered by typing in the search box.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={400}
                placeholder="choose another country"
                onSelected={(val) => console.log(val)}
                enableSearch
                options={[
                  { name: "germany", value: "germany", disabled: true },
                  { name: "india", value: "india" },
                  { name: "usa", value: "usa", selected: true },
                  { name: "uk", value: "uk" },
                  { name: "srilanka", value: "srilanka" },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Virtualized">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={400}
                placeholder="choose another country"
                onSelected={(val) => console.log(val)}
                virtualize
                options={[
                  { name: "germany", value: "germany", disabled: true },
                  { name: "india", value: "india" },
                  { name: "usa", value: "usa", selected: true },
                  { name: "uk", value: "uk" },
                  { name: "srilanka", value: "srilanka" },
                  { name: "canada", value: "canada" },
                  { name: "thailand", value: "thailand" },
                  { name: "brazil", value: "brazil" },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
