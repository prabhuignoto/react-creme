import React, { CSSProperties, useLayoutEffect, useMemo } from "react";
import { BlockQuote, ScrollSpy, Section } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";
const Para = () => (
  <p>
    Nulla congue efficitur massa, at tempor enim mattis vitae. Suspendisse
    dictum tincidunt felis, vel convallis velit volutpat quis. Suspendisse
    auctor nibh ac purus commodo lacinia. Etiam ornare sodales risus, quis
    vulputate nisl dapibus sed. Quisque gravida viverra sagittis. Fusce
    hendrerit ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
    vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec bibendum
    purus orci, sed porttitor quam porta in. sodales risus, quis vulputate nisl
    dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit ante sed
    dictum commodo. Mauris a nulla suscipit, dapibus nulla vitae, semper neque.
    Nullam mattis et odio vel tincidunt. Donec bibendum purus orci, sed
    porttitor quam porta in.
  </p>
);

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  const style = useMemo(() => {
    return { width: `${width}px`, height: "650px" } as CSSProperties;
  }, [width]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Left aligned links">
          <BlockQuote>
            The navigation links are left aligned and clicking on them will
            scroll to the section of the container that is being spyed on.
          </BlockQuote>
          <DemoWidget>
            <div style={style}>
              <ScrollSpy
                links={[
                  "one",
                  "two",
                  "three",
                  "four",
                  "five",
                  "six",
                  "seven",
                  "eight",
                ]}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <Para key={i} />
                ))}
              </ScrollSpy>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Right aligned links">
          <BlockQuote>
            The navigation links are right aligned and clicking on them will
            scroll to the section of the container that is being spyed on.
          </BlockQuote>
          <DemoWidget>
            <div style={style}>
              <ScrollSpy
                linksPosition="right"
                links={["one", "two", "three", "four", "five"]}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Para key={i} />
                ))}
              </ScrollSpy>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
