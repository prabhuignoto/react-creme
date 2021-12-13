import React, { useLayoutEffect } from "react";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";
import { Alert, BlockQuote, Section } from "../../../components";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Informational Text">
        <BlockQuote>
          Alerts can be closed or dismissed by default. Use the{" "}
          <code>canDismiss</code> prop to change this behavior.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a information text" />
          </div>
        </DemoWidget>
        <DemoWidget>
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a information text" canDismiss={false} />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Success Message">
        <DemoWidget>
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a success text" state="success" />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Warning Message">
        <DemoWidget>
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a warning text" state="warning" />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Error Message">
        <DemoWidget>
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a error text" state="error" />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
