import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BlockQuote, Button, Dialog, Section } from '../../../lib/components';
import { asideState, responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Drop } from './widget-variants';

const Widget = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
          <DemoWidget width={110} component={Default}>
            <Button onClick={() => setOpen(true)} label="Open dialog"></Button>
            {open && (
              <Dialog
                onClose={() => {
                  setOpen(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
                width={width}
                height={250}
                size="sm"
              >
                <span>Your content here !</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
        <Section title="Custom animation">
          <BlockQuote>
            Dialog comes with two animations: <code>pop</code> and{' '}
            <code>drop</code>. The example below shows dialog with drop
            animation.
          </BlockQuote>
          <DemoWidget width={110} component={Drop}>
            <Button onClick={() => setOpen2(true)} label="Open dialog"></Button>
            {open2 && (
              <Dialog
                onClose={() => {
                  setOpen2(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
                width={width}
                height={250}
                animationType="drop"
              >
                <span>Your content here!</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
      </div>
    )
  );
};

export default Widget;
