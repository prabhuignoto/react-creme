import React, { useEffect } from "react";
import { Alert, BlockQuote, Section } from "../../components";
import useMedia from "../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
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
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a information text" />
          </div>
        </div>
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a information text" canDismiss={false} />
          </div>
        </div>
      </Section>
      <Section title="Success Message">
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a success text" state="success" />
          </div>
        </div>
      </Section>
      <Section title="Warning Message">
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a warning text" state="warning" />
          </div>
        </div>
      </Section>
      <Section title="Error Message">
        <div className="rc-demo-widget">
          <div style={{ width: `${width}px` }}>
            <Alert message="This is a error text" state="error" />
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Widgets;
