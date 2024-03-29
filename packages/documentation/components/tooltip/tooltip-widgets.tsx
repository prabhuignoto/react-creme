import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Card,
  Dropdown,
  Image,
  Section,
  Text,
  Tooltip,
} from '../../../lib/components';
import { ToolTipPosition } from '../../../lib/components/tooltip/tooltip-model';
import { responsiveState, themeState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const Widgets = () => {
  const [position, setPosition] = useState<ToolTipPosition>('bottom center');

  const media = useRecoilValue(responsiveState);
  const theme = useRecoilValue(themeState);
  const isDark = useMemo(() => theme.darkMode, []);

  const [width, setWidth] = useState<string | number>(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isExtraLargeScreen) {
      setWidth(650);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(550);
    } else if (media.isMobile) {
      setWidth(320);
    } else if (media.isTablet) {
      setWidth(500);
    }
  }, [media]);

  return +width > 0 || width ? (
    <div className="rc-demo-widgets">
      <Section size="md" border={false}>
        <Text>
          Tooltip component can be anchored to a target element in{' '}
          <em>12 different positions</em>. Change the position of the tooltip in
          the following examples via this select.
        </Text>
        <div className="rc-demo-widget" style={{ width: '320px' }}>
          <Dropdown
            placeholder="choose a position"
            maxMenuHeight={350}
            onSelected={val => {
              setPosition(val as ToolTipPosition);
            }}
            options={[
              { name: 'top center', value: 'top center' },
              { name: 'top left', value: 'top left' },
              { name: 'top right', value: 'top right' },
              {
                name: 'bottom center',
                selected: true,
                value: 'bottom center',
              },
              { name: 'bottom left', value: 'bottom left' },
              { name: 'bottom right', value: 'bottom right' },
              { name: 'left center', value: 'left center' },
              { name: 'left top', value: 'left top' },
              { name: 'left bottom', value: 'left bottom' },
              { name: 'right center', value: 'right center' },
              { name: 'right top', value: 'right top' },
              { name: 'right bottom', value: 'right bottom' },
            ]}
          ></Dropdown>
        </div>
      </Section>
      <Section size="md" title="On Hover">
        <Text>
          The Tooltip is activated by hovering over the target element and is
          auto closed the moment the mouse moves out of the target element.
        </Text>
        <DemoWidget name="Tooltip" width={width}>
          <Tooltip
            message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
            position={position}
            minWidth={160}
            bgColor="#fff"
            foreColor="#FF0000"
            size="sm"
          >
            <Card height={200}>
              <p style={{ color: isDark ? '#fff' : '#000' }}>
                Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean
                molestie velit quis volutpat vestibulum. Donec facilisis est ac
                condimentum aliquet. Nam semper dui eget sagittis sagittis.
                Aenean sodales vulputate magna vitae sodales. Phasellus
                dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam
                diam, at pulvinar
              </p>
            </Card>
          </Tooltip>
        </DemoWidget>
      </Section>
      <Section size="md" title="Static Tooltip">
        <Text>
          Sometimes it can be useful to have the Tooltip visible all the time.
          use the <code>isStatic</code> prop to achieve this.
        </Text>
        <DemoWidget name="Tooltip" width={width}>
          <Tooltip
            message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
            position={position}
            minWidth={150}
            isStatic
          >
            <div style={{ width: `${width}px` }}>
              <Card height={300}>
                <Image height={280} src="https://bit.ly/37wPJb5" />
              </Card>
            </div>
          </Tooltip>
        </DemoWidget>
      </Section>
      <Section size="md" title="Activate Tooltip on click">
        <Text>
          Tooltip can be also activated by clicking on the target element via
          the <code>openOnClick</code> prop. In this mode a close button will be
          additionally rendered to close the tooltip.
        </Text>
        <DemoWidget name="Tooltip" width={width}>
          <Tooltip
            message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
            position={position}
            minWidth={160}
            openOnClick
          >
            <Card height={150}>
              <p style={{ color: isDark ? '#fff' : '#000' }}>
                Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean
                molestie velit quis volutpat vestibulum. Donec facilisis est ac
                condimentum aliquet. Nam semper dui eget sagittis sagittis.
                Aenean sodales vulputate magna vitae sodales. Phasellus
                dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam
                diam, at pulvinar
              </p>
            </Card>
          </Tooltip>
        </DemoWidget>
      </Section>
    </div>
  ) : null;
};

export default Widgets;
