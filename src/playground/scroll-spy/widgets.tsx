import React, { useEffect } from "react";
import { ScrollSpy, Section } from "../../components";
import useMedia from "./../useMedia";

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

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Left aligned links">
          <div
            className="rc-demo-widget"
            style={{ width: `${width}px`, height: "500px" }}
          >
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
        </Section>
        <Section title="right aligned links">
          <div
            className="rc-demo-widget"
            style={{ width: `${width}px`, height: "450px" }}
          >
            <ScrollSpy
              linksPosition="right"
              links={["one", "two", "three", "four", "five"]}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Para key={i} />
              ))}
            </ScrollSpy>
          </div>
        </Section>
      </div>
    )
  );
}

export default Widgets;
