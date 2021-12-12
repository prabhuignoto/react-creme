import React, { useLayoutEffect } from "react";
import { BlockQuote, Section, Tags } from "../../components";
import { DemoWidget } from "../common/demo-widget";
import useMedia from "../common/useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isBigScreen) {
      setWidth(950);
    } else if (media.isDesktop) {
      setWidth(650);
    } else if (media.isTablet) {
      setWidth("90%");
    } else if (media.isMobile) {
      setWidth("90%");
    }
  }, [media]);

  const resolvedWidth = typeof width === "string" ? width : `${width}px`;

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Tags - default">
          <BlockQuote>
            New tags can be added to the list by typing in the input field.Tags
            can be removed by clicking on the close icon on the tag.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                items={[
                  { name: "prabhu murthy", disabled: false },
                  { name: "blue" },
                  { name: "red" },
                  { name: "orange" },
                  { name: "tester", disabled: false },
                ]}
                maxTags={15}
                onSelected={(val) => console.log(val)}
                tagWidth={150}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Filled style">
          <BlockQuote>
            Tags can be disabled by setting the disabled property to true.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                items={[
                  { name: "prabhu murthy", disabled: false },
                  { name: "blue" },
                  { name: "red" },
                  { name: "orange" },
                  { name: "tester", disabled: true },
                ]}
                maxTags={15}
                onSelected={(val) => console.log(val)}
                tagWidth={150}
                tagStyle="fill"
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Readonly">
          <BlockQuote>
            In readonly mode, you can only select the tags that are already in
            the list.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                items={[
                  { name: "prabhu", disabled: false },
                  { name: "blue" },
                  { name: "red" },
                  { name: "orange" },
                  { name: "tester", disabled: false },
                ]}
                maxTags={15}
                restrictToValues={["one", "two"]}
                onSelected={(val) => console.log(val)}
                readonly
                tagWidth={50}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
