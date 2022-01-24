import React, { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Dialog, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Drop } from './widget-variants';

const Widget = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const ref = useRef();

  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(600);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(300);
    }
  }, [media]);

  return (
    media &&
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget component={Default}>
            <Button
              size="sm"
              onClick={() => setOpen(true)}
              label="Open dialog"
            ></Button>
            {open && (
              <Dialog
                onClose={() => setOpen(false)}
                containedToParent={ref}
                width={width}
                height={250}
              >
                <span>Test dialog content</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
        <Section title="Custom animation">
          <DemoWidget component={Drop}>
            <Button
              size="sm"
              onClick={() => setOpen2(true)}
              label="Open dialog"
            ></Button>
            {open2 && (
              <Dialog
                onClose={() => setOpen2(false)}
                containedToParent={ref}
                width={width}
                height={250}
                animationType="drop"
              >
                <span>Test dialog content</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
      </div>
    )
  );
};

export default Widget;
