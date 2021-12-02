import React, { useEffect } from "react";
import { Section, Tags } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>(null);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth("90%");
    } else if (media.isMobile) {
      setWidth("90%");
    } else if (media.isBigScreen) {
      setWidth(950);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  const resolvedWidth = typeof width === "string" ? width : `${width}px`;

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Tags - default">
          <div style={{ width: resolvedWidth }} className="rc-demo-widget">
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
        </Section>
        <Section title="Tags - Filled style">
          <div style={{ width: resolvedWidth }} className="rc-demo-widget">
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
        </Section>
        <Section title="Tags - Readonly">
          <div style={{ width: resolvedWidth }} className="rc-demo-widget">
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
        </Section>
      </div>
    )
  );
}

export default widgets;
