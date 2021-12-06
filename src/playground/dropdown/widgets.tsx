import React, { useEffect } from "react";
import { BlockQuote, Dropdown, Section } from "../../components";
import useMedia from "../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>(null);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Single selection">
          <div className="rc-demo-widget">
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
          </div>
        </Section>
        <Section title="Multi selection">
          <BlockQuote>
            With multi selection, you can select multiple options.
          </BlockQuote>
          <div className="rc-demo-widget">
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
                  { name: "france", value: "france", selected: false },
                  { name: "japan", value: "japan", selected: true },
                  { name: "singapore", value: "singapore", selected: false },
                  { name: "brazil", value: "brazil", selected: false },
                  { name: "venezuala", value: "venezuala", selected: false },
                  {
                    name: "united kingdom",
                    value: "united kingdom",
                    selected: true,
                  },
                  { name: "australia", value: "australia", selected: false },
                ]}
              />
            </div>
          </div>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Available options can be filtered by typing in the search box.
          </BlockQuote>
          <div className="rc-demo-widget">
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
          </div>
        </Section>
        <Section title="Virtualized">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <div className="rc-demo-widget">
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
                  { name: "vietnam", value: "vietnam" },
                  { name: "chile", value: "chile" },
                  { name: "Iran", value: "Iran" },
                  { name: "bolivia", value: "bolivia" },
                  { name: "australia", value: "australia" },
                  { name: "indonesia", value: "indonesia" },
                  { name: "italy", value: "italy" },
                ]}
              />
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default Widgets;
