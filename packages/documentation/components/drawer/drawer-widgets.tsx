import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Drawer, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Bottom, Left, Right, Top } from './widget-variants';

const Widget: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const media = useRecoilValue(responsiveState);
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
    } else if (media.isExtraLargeScreen) {
      setWidth(600);
    }
  }, [media]);

  return (
    <div className="rc-demo-widgets">
      <Section title="Docked to Right" height={100}>
        <DemoWidget width={100} component={Right}>
          <Button onClick={() => setOpen(true)} label="Open drawer"></Button>
        </DemoWidget>
      </Section>
      {open && (
        <Drawer position="right" width={width} onClose={() => setOpen(false)}>
          <span>This is a test</span>
        </Drawer>
      )}
      <Section title="Docked to Left" height={100}>
        <DemoWidget width={100} component={Left}>
          <Button onClick={() => setOpen2(true)} label="Open drawer"></Button>
        </DemoWidget>
      </Section>
      {open2 && (
        <Drawer position="left" width={width} onClose={() => setOpen2(false)}>
          <span>This is a test</span>
        </Drawer>
      )}
      <Section title="Docked to Top" height={100}>
        <DemoWidget width={100} component={Top}>
          <Button onClick={() => setOpen3(true)} label="Open drawer"></Button>
        </DemoWidget>
      </Section>
      {open3 && (
        <Drawer position="top" height={400} onClose={() => setOpen3(false)}>
          <span>This is a test</span>
        </Drawer>
      )}
      <Section title="Docked to Bottom" height={100}>
        <DemoWidget width={100} component={Bottom}>
          <Button onClick={() => setOpen4(true)} label="Open drawer"></Button>
        </DemoWidget>
      </Section>
      {open4 && (
        <Drawer position="bottom" height={400} onClose={() => setOpen4(false)}>
          <span>This is a test</span>
        </Drawer>
      )}
    </div>
  );
};

export default Widget;
