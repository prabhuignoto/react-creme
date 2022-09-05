import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ScrollSpy, Section, Text } from '../../../lib/components';
import { responsiveState, themeState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const Para = () => {
  const theme = useRecoilValue(themeState);

  return (
    <p style={{ color: theme.darkMode ? '#fff' : '#000' }}>
      Nulla congue efficitur massa, at tempor enim mattis vitae. Suspendisse
      dictum tincidunt felis, vel convallis velit volutpat quis. Suspendisse
      auctor nibh ac purus commodo lacinia. Etiam ornare sodales risus, quis
      vulputate nisl dapibus sed. Quisque gravida viverra sagittis. Fusce
      hendrerit ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
      vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec bibendum
      purus orci, sed porttitor quam porta in. sodales risus, quis vulputate
      nisl dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit ante
      sed dictum commodo. Mauris a nulla suscipit, dapibus nulla vitae, semper
      neque. Nullam mattis et odio vel tincidunt. Donec bibendum purus orci, sed
      porttitor quam porta in.
    </p>
  );
};

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(700);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return width > 0 ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Left aligned links">
        <Text>
          The navigation links are left aligned and clicking on them will scroll
          to the section of the container that is being spyed on.
        </Text>
        <DemoWidget
          name="ScrollSpy"
          width={width}
          height={650}
          showCodeByDefault={false}
        >
          <ScrollSpy
            links={[
              'one',
              'two',
              'three',
              'four',
              'five',
              'six',
              'seven',
              'eight',
            ]}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Para />
              </div>
            ))}
          </ScrollSpy>
        </DemoWidget>
      </Section>
      <Section size="md" title="Right aligned links">
        <Text>
          The navigation links are right aligned and clicking on them will
          scroll to the section of the container that is being spyed on.
        </Text>
        <DemoWidget
          name="ScrollSpy"
          width={width}
          height={650}
          showCodeByDefault={false}
        >
          <ScrollSpy
            linksPosition="right"
            links={['one', 'two', 'three', 'four', 'five']}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <Para />
              </div>
            ))}
          </ScrollSpy>
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default Widgets;
