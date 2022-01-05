import React, { useLayoutEffect } from "react";
import {
  AccordionGroup,
  BlockQuote,
  Image,
  Section,
} from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(330);
    }
  }, [media]);

  const Para = () => (
    <p>
      Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit amet justo
      vel, convallis volutpat neque. Morbi semper odio sed diam tristique, nec
      tempor neque tempus. Praesent quis ultrices odio. Nulla vestibulum nulla
      sed massa molestie, quis vulputate risus semper. Phasellus elementum,
      metus in iaculis sollicitudin, risus elit pulvinar neque, eget pulvinar
      odio libero eu mi. Vivamus id leo facilisis, tincidunt lacus semper,
      condimentum est. Nam euismod non eros a lacinia.
    </p>
  );

  return (
    width > 0 && (
      <div className="rc-demo-widgets" style={{ minHeight: "1200px" }}>
        <Section title="Default Render">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <AccordionGroup titles={["one", "two"]} focusable>
                <Para />
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                  }}
                >
                  <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
                </div>
              </AccordionGroup>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Initial state">
          <BlockQuote>
            Set a default state for the AccordionGroup on load. This is useful
            if you want to keep the accordions closed or open on load. The
            example shows the accordions open on load
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two"]}
                autoClose={false}
                border={false}
                expanded
              >
                <Para />
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
                </div>
              </AccordionGroup>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Auto Closing Sections">
          <BlockQuote>
            The AccordionGroup can be configured to close all other sections
            when one is open.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two", "three"]}
                autoClose
                border={false}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <Para key={i} />
                ))}
              </AccordionGroup>
            </div>
          </DemoWidget>
        </Section>
        <Section title="Custom Icon">
          <BlockQuote>
            The AccordionGroup can be configured to use custom icons and
            alignment
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two", "three"]}
                border={false}
                iconType="plus"
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <Para key={i} />
                ))}
              </AccordionGroup>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
