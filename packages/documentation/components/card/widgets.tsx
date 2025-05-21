import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { Section, Text } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { CustomImage, CustomImageCode, Default } from './widget-variants';

function widgets() {
  // const media = useMedia();

  const [width, setWidth] = useState(0);

  const responsive = useAtomValue(responsiveState);

  useLayoutEffect(() => {
    if (!responsive) {
      return;
    }

    if (responsive.isExtraLargeScreen) {
      setWidth(550);
    } else if (responsive.isBigScreen) {
      setWidth(550);
    } else if (responsive.isDesktop) {
      setWidth(500);
    } else if (responsive.isTablet) {
      setWidth(450);
    } else if (responsive.isMobile) {
      setWidth(320);
    }
  }, [responsive]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Card shadowed">
        <Text>
          The <code>header</code> and <code>footer</code> props allows to render
          custom contents in the card header and footer.
        </Text>
        <DemoWidget name="Card" width={width}>
          {Default}
        </DemoWidget>
      </Section>
      <Section size="md" title="Card without shadow">
        <Text>Card with no shadow but with a border.</Text>
        <DemoWidget name="Card" width={width} codeString={CustomImageCode}>
          {CustomImage}
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
