import { useState } from 'react';
import {
  Button,
  GlobalNotification,
  RadioGroup,
  Section,
  Text,
} from '../../../lib/components';
import { GlobalNotificationState } from '../../../lib/components/global-notification/global-notification.model';
import { DemoWidget } from '../../common/demo-widget';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function widgets() {
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  const [state, setState] = useState<GlobalNotificationState>('info');

  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default" border={false}>
        <Text>
          The global notification component can be configured to be in four
          states: <code>info</code>, <code>success</code>, <code>warning</code>{' '}
          and <code>error</code>.
        </Text>
        <div className="rc-demo-widget" style={{ width: '250px' }}>
          <RadioGroup
            items={[
              { label: 'Success', value: 'success' },
              {
                label: 'Warning',
                value: 'warning',
              },
              {
                label: 'Error',
                value: 'error',
              },
              {
                checked: true,
                label: 'Info',
                value: 'info',
              },
            ]}
            onSelected={value => {
              setState(value as GlobalNotificationState);
            }}
          />
        </div>
        <div className="rc-demo-widget" style={{ margin: '1rem 0' }}>
          <Button
            onClick={() => setShow(prev => !prev)}
            label="Open Global Notification"
          />
        </div>
        <DemoWidget
          name="GlobalNotification"
          component={
            <GlobalNotification
              message="This is a test message"
              onClose={onClose}
              delay={500}
              closeAfter={4000}
              state={state}
              height={65}
              size="lg"
            />
          }
        ></DemoWidget>
        {show && (
          <GlobalNotification
            message="This is a test message"
            onClose={onClose}
            delay={500}
            closeAfter={4000}
            state={state}
            size="lg"
            height={65}
          />
        )}
      </Section>
    </div>
  );
}

export default widgets;
