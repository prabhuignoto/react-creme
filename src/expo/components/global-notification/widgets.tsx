import React from "react";
import {
  Button,
  GlobalNotification,
  RadioGroup,
  Section,
} from "../../../components";
import { GlobalNotificationState } from "../../../components/global-notification/global-notification";
import { DemoWidget } from "../../common/demo-widget";

function widgets() {
  const [show, setShow] = React.useState(false);

  const onClose = () => {
    setShow(false);
  };

  const [state, setState] = React.useState<GlobalNotificationState>("info");

  return (
    <div className="rc-demo-widgets">
      <Section title="">
        <div className="rc-demo-widget" style={{ width: "250px" }}>
          <RadioGroup
            items={[
              { label: "Success", value: "success" },
              {
                label: "Warning",
                value: "warning",
              },
              {
                label: "Error",
                value: "error",
              },
              {
                label: "Info",
                value: "info",
                checked: true,
              },
            ]}
            onSelected={(value) => {
              setState(value as GlobalNotificationState);
            }}
          />
        </div>
        <div className="rc-demo-widget">
          <Button
            onClick={() => setShow((prev) => !prev)}
            label="Open Global Notification"
          />
        </div>
        <DemoWidget>
          <GlobalNotification message="This is a test message" delay={0} />
        </DemoWidget>
        {show && (
          <GlobalNotification
            message="This is a test message"
            onClose={onClose}
            delay={0}
            state={state}
          />
        )}
      </Section>
    </div>
  );
}

export default widgets;
