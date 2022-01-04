import React, { useLayoutEffect, useState } from "react";
import { Button, Drawer, Section } from "../../../components";
import useMedia from "../../common/useMedia";

const Widget: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(250);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(550);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <div className="rc-demo-widget">
        <Section title="Docked to Right" height={100}>
          <div style={{ width: "100px" }}>
            <Button onClick={() => setOpen(true)} label="Open drawer"></Button>
          </div>
        </Section>
        {open && (
          <Drawer position="right" width={width} onClose={() => setOpen(false)}>
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
      <div className="rc-demo-widget">
        <Section title="Docked to Left" height={100}>
          <div style={{ width: "100px" }}>
            <Button onClick={() => setOpen2(true)} label="Open drawer"></Button>
          </div>
        </Section>
        {open2 && (
          <Drawer position="left" width={width} onClose={() => setOpen2(false)}>
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
      <div className="rc-demo-widget">
        <Section title="Docked to Top" height={100}>
          <div style={{ width: "100px" }}>
            <Button onClick={() => setOpen3(true)} label="Open drawer"></Button>
          </div>
        </Section>
        {open3 && (
          <Drawer position="top" height={400} onClose={() => setOpen3(false)}>
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
      <div className="rc-demo-widget">
        <Section title="Docked to Bottom" height={100}>
          <div style={{ width: "100px" }}>
            <Button onClick={() => setOpen4(true)} label="Open drawer"></Button>
          </div>
        </Section>
        {open4 && (
          <Drawer
            position="bottom"
            height={400}
            onClose={() => setOpen4(false)}
          >
            <span>This is a test</span>
          </Drawer>
        )}
      </div>
    </div>
  );
};

export default Widget;
