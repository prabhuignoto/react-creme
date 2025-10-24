import { useLayoutEffect, useState } from 'react';
import jsxToString from 'react-element-to-jsx-string';
import { Section, Text } from '../../../lib/components';
import { InlineCodeViewer } from '../../common/inline-code-viewer';
import { DemoWidget } from '../../common/demo-widget';
import useMedia from '../../common/useMedia';
import {
  Custom,
  Dismiss,
  Error,
  Information,
  Success,
  Warning,
} from './widget-variants';

const jsxToStringOptions = {
  maxInlineAttributesLineLength: 250,
  showDefaultProps: true,
  showFunctions: true,
  sortProps: true,
  tabStop: 4,
};

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(600);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Informational Text">
        <Text>
          Alerts can be closed or dismissed by default. Use the{' '}
          <code>canDismiss</code> prop to change this behavior.
        </Text>
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Information}
        </DemoWidget>
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Dismiss}
        </DemoWidget>
      </Section>
      <Section size="md" title="Success Message">
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Success}
        </DemoWidget>
      </Section>
      <Section size="md" title="Warning Message">
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Warning}
        </DemoWidget>
      </Section>
      <Section size="md" title="Error Message">
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Error}
        </DemoWidget>
      </Section>
      <Section size="md" title="Render Custom content">
        <DemoWidget name="Alert" width={width} showCodeByDefault>
          {Custom}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
