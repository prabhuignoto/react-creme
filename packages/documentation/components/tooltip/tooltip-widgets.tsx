import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  BlockQuote,
  Card,
  Dropdown,
  Image,
  Section,
  Tooltip,
} from '../../../lib/components';
import { ToolTipPosition } from '../../../lib/components/tooltip/tooltip-model';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const Widgets = () => {
  const [position, setPosition] = useState<ToolTipPosition>('bottom center');

  const media = useRecoilValue(responsiveState);

  const [width, setWidth] = React.useState(0);

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
    } else if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(330);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section>
          <BlockQuote>
            The Component supports 12 different docking positions.
          </BlockQuote>
          <div className="rc-demo-widget" style={{ width: '320px' }}>
            <Dropdown
              placeholder="choose a position"
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
        <Section title="On Hover">
          <BlockQuote>
            The Tooltip is activated by hovering over the target element.
          </BlockQuote>
          <DemoWidget>
            <Tooltip
              message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
              position={position}
              minWidth={160}
              bgColor="#fff"
              foreColor="#FF0000"
            >
              <div style={{ width: `${width}px` }}>
                <Card height={200}>
                  Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean
                  molestie velit quis volutpat vestibulum. Donec facilisis est
                  ac condimentum aliquet. Nam semper dui eget sagittis sagittis.
                  Aenean sodales vulputate magna vitae sodales. Phasellus
                  dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam
                  diam, at pulvinar
                </Card>
              </div>
            </Tooltip>
          </DemoWidget>
        </Section>
        <Section title="Static Tooltip">
          <BlockQuote>
            The Tooltip can also be configured to be static. The Tooltip will be
            always visible.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Tooltip
                message="Phasellus dignissim, diam id ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar"
                position={position}
                minWidth={150}
                isStatic
              >
                <div style={{ width: `${width}px` }}>
                  <Card height={300}>
                    <Image
                      height={280}
                      src="https://www.dccomics.com/sites/default/files/Gallery_20210914_BM_THEWORLD_61401312483190.19934149.jpg"
                    />
                  </Card>
                </div>
              </Tooltip>
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
};

export default Widgets;
