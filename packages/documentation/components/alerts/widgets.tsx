import React, { useLayoutEffect } from 'react';
import { BlockQuote, Section } from '../../../lib/components';
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

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

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

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Informational Text">
          <BlockQuote>
            Alerts can be closed or dismissed by default. Use the{' '}
            <code>canDismiss</code> prop to change this behavior.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>{Information}</div>
          </DemoWidget>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>{Dismiss}</div>
          </DemoWidget>
        </Section>
        <Section title="Success Message">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>{Success}</div>
          </DemoWidget>
        </Section>
        <Section title="Warning Message">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>{Warning}</div>
          </DemoWidget>
        </Section>
        <Section title="Error Message">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>{Error}</div>
          </DemoWidget>
        </Section>
        <Section title="Render Custom content">
          <DemoWidget>{Custom}</DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
