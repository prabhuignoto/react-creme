import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { CustomImage, CustomImageCode, Default } from './widget-variants';

function widgets() {
  // const media = useMedia();

  const [width, setWidth] = React.useState(0);

  const responsive = useRecoilValue(responsiveState);

  useLayoutEffect(() => {
    if (!responsive) {
      return;
    }

    if (responsive.isExtraLargeScreen) {
      setWidth(650);
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

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Card shadowed">
          <BlockQuote>
            The <code>header</code> and <code>footer</code> props allows to
            render custom contents in the card header and footer.
          </BlockQuote>
          <DemoWidget width={width}>{Default}</DemoWidget>
        </Section>
        <Section title="Card without shadow">
          <BlockQuote>Card with no shadow but with a border.</BlockQuote>
          <DemoWidget width={width} codeString={CustomImageCode}>
            {CustomImage}
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
