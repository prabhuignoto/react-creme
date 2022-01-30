import React, { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Button, Dialog, Section } from '../../../lib/components';
import { asideState, responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Drop } from './widget-variants';

const Widget = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const ref = useRef();

  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);

  const setAside = useSetRecoilState(asideState);

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

  const handleOnOpen = () => {
    setAside({
      isAnyOverlayOpen: true,
      isOpen: false,
    });
  };

  const handleOnClose = () => {
    setAside({
      isAnyOverlayOpen: false,
      isOpen: false,
    });
  };

  return (
    media &&
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Default render">
          <DemoWidget component={Default}>
            <Button onClick={() => setOpen(true)} label="Open dialog"></Button>
            {open && (
              <Dialog
                onClose={() => {
                  setOpen(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
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
            <Button onClick={() => setOpen2(true)} label="Open dialog"></Button>
            {open2 && (
              <Dialog
                onClose={() => {
                  setOpen2(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
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
