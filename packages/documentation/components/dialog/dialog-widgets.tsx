import React, { useLayoutEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BlockQuote, Button, Dialog, Section } from '../../../lib/components';
import { asideState, responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { Default, Drop, Rise, SlideLeft, SlideRight } from './widget-variants';

const Widget = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

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
        <Section title="Default render" size="md">
          <DemoWidget name="Dialog" width={110} component={Default}>
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
        <Section title="Animation - Drop" size="md">
          <BlockQuote>
            Dialog can be animated in five ways. <code>pop</code>,{' '}
            <code>drop</code>, <code>rise</code>, <code>slide-left</code> or{' '}
            <code>slide-right</code>
          </BlockQuote>
          <DemoWidget name="Dialog" width={110} component={Drop}>
            <Button onClick={() => setOpen5(true)} label="Open dialog"></Button>
            {open5 && (
              <Dialog
                onClose={() => {
                  setOpen5(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
                width={width}
                height={250}
                animationType="drop"
                size="md"
              >
                <span>Your content here!</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
        <Section title="Animation - Rise" size="md">
          <DemoWidget name="Dialog" width={110} component={Rise}>
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
                animationType="rise"
              >
                <span>Your content here!</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
        <Section title="Animation - Slide from Left" size="md">
          <DemoWidget name="Dialog" width={110} component={SlideLeft}>
            <Button onClick={() => setOpen3(true)} label="Open dialog"></Button>
            {open3 && (
              <Dialog
                onClose={() => {
                  setOpen3(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
                width={width}
                height={250}
                animationType="slide-left"
              >
                <span>Your content here!</span>
              </Dialog>
            )}
          </DemoWidget>
        </Section>
        <Section title="Animation - Slide from Right" size="md">
          <DemoWidget name="Dialog" width={110} component={SlideRight}>
            <Button onClick={() => setOpen4(true)} label="Open dialog"></Button>
            {open4 && (
              <Dialog
                onClose={() => {
                  setOpen4(false);
                  handleOnClose();
                }}
                onOpen={handleOnOpen}
                width={width}
                height={250}
                animationType="slide-right"
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
