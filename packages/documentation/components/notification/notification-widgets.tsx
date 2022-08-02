import { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  BlockQuote,
  Button,
  Dropdown,
  Notification,
  Section,
} from '../../../lib/components';
import { NotificationPosition } from '../../../lib/components/notification/notification-model';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const Widgets = () => {
  const ref = useRef(null);

  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(450);
    } else if (media.isBigScreen) {
      setWidth(400);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(250);
    }
  }, [media]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [position, setPosition] = useState<NotificationPosition>('top-left');
  return width ? (
    <div className="rc-demo-widgets">
      <Section>
        <BlockQuote>
          The notification can be positioned in different places on the screen.
        </BlockQuote>
        <DemoWidget name="Notification" width={300}>
          <Dropdown
            maxMenuHeight={300}
            placeholder="Select notification position"
            options={[
              { name: 'top-left', value: 'top-left' },
              { name: 'top-right', value: 'top-right' },
              { name: 'bottom-left', value: 'bottom-left' },
              { name: 'bottom-right', value: 'bottom-right' },
              {
                name: 'bottom-center',
                value: 'bottom-center',
              },
              { name: 'top-center', value: 'top-center' },
            ]}
            onSelected={val => setPosition(val as NotificationPosition)}
          ></Dropdown>
        </DemoWidget>
      </Section>
      {show && (
        <Notification
          position={position}
          title="Hello World"
          onClose={() => {
            setShow(false);
          }}
          containedToParent={ref}
        >
          <span>test</span>
        </Notification>
      )}
      {show2 && (
        <Notification
          position={position}
          title="Hello World"
          onClose={() => {
            setShow2(false);
          }}
        >
          <span>test</span>
        </Notification>
      )}
      {show3 && (
        <Notification
          position={position}
          title="Hello World"
          autoClose={3000}
          onClose={() => {
            setShow3(false);
          }}
        >
          <span>test</span>
        </Notification>
      )}
      <Section title="Notification - Default" size="md">
        <BlockQuote>
          By default the notification is positioned at the top-left corner of
          the screen relative to the page.
        </BlockQuote>
        <DemoWidget name="Notification" width={150}>
          <Button label="Open Notification" onClick={() => setShow2(true)} />
        </DemoWidget>
      </Section>
      <Section title="Notification - Contained Mode" size="md">
        <BlockQuote>
          In this example the notification is positioned relative to the parent
          element.
        </BlockQuote>
        <div
          className="rc-demo-widget"
          style={{
            background: '#f5f5f5',
            height: '350px',
            placeContent: 'center',
            width: `${width}px`,
          }}
          ref={ref}
        >
          <Button
            label="Open Notification (Contained)"
            onClick={() => setShow(true)}
          />
        </div>
      </Section>
      <Section title="Notification - Auto Close" size="md">
        <BlockQuote>
          The notification can be closed automatically after a certain time
          using the autoClose property.
        </BlockQuote>
        <DemoWidget name="Notification" width={150}>
          <Button label="Open Notification" onClick={() => setShow3(true)} />
        </DemoWidget>
      </Section>
    </div>
  ) : null;
};

export default Widgets;
