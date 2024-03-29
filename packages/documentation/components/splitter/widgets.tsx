import { useLayoutEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Section, Splitter, Text } from '../../../lib/components';
import { responsiveState, themeState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState(0);
  const theme = useRecoilValue(themeState);

  const isDark = useMemo(() => theme.darkMode, [theme]);

  const paraStyle = useMemo(
    () => ({
      color: isDark ? '#fff' : '#000',
      padding: '1rem',
    }),
    []
  );

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
      <Section size="md" title="Horizontal mode">
        <Text>
          Splits the container horizontally with a drag handle for resizing and
          there by controlling the width of the left and right panels.
        </Text>
        <DemoWidget name="Splitter" width={width} showCodeByDefault={false}>
          <Splitter
            dir="horizontal"
            minSplitWidth={Math.round(width * 0.3)}
            maxSplitWidth={Math.round(width * 0.75)}
            handleBarWidth={4}
          >
            <p style={paraStyle}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
            <p style={paraStyle}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet.
            </p>
          </Splitter>
        </DemoWidget>
      </Section>
      <Section size="md" title="Vertical Mode">
        <Text>
          Splits the container vertically with a drag handle for resizing and
          there by controlling the height of the top and bottom panels.
        </Text>
        <DemoWidget name="Splitter" width={width} showCodeByDefault={false}>
          <Splitter
            dir="vertical"
            minSplitHeight={400 * 0.25}
            maxSplitHeight={400 * 0.75}
            handleBarWidth={4}
          >
            <p style={paraStyle}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </p>
            <p style={paraStyle}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don&apos;t look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn&apos;t anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet.
            </p>
          </Splitter>
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
