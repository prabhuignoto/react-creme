import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Dropdown, Section } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

function Widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(400);
    } else if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(320);
    } else if (media.isBigScreen) {
      setWidth(350);
    } else if (media.isDesktop) {
      setWidth(350);
    }
  }, [media]);
  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Single selection">
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={300}
                placeholder="choose a country"
                onSelected={(val) => console.log(val)}
                options={[
                  {
                    disabled: true,
                    name: 'germany',
                    value: 'germany',
                  },
                  { name: 'india', value: 'india' },
                  { name: 'usa', value: 'usa' },
                  { name: 'uk', value: 'uk' },
                  { name: 'srilanka', value: 'srilanka' },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Multi selection">
          <BlockQuote>
            With multi selection, you can select multiple options.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                onSelected={(val) => console.log(val)}
                placeholder="choose a country"
                allowMultiSelection
                maxMenuHeight={300}
                focusable
                options={[
                  {
                    disabled: true,
                    name: 'germany',
                    value: 'germany',
                  },
                  { name: 'india', value: 'india' },
                  { name: 'usa', value: 'usa' },
                  { name: 'uk', selected: true, value: 'uk' },
                  {
                    name: 'srilanka',
                    selected: false,
                    value: 'srilanka',
                  },
                  {
                    name: 'brazil',
                    selected: false,
                    value: 'brazil',
                  },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Search">
          <BlockQuote>
            Available options can be filtered by typing in the search box.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={300}
                placeholder="choose a country"
                onSelected={(val) => console.log(val)}
                enableSearch
                options={[
                  {
                    disabled: true,
                    name: 'germany',
                    value: 'germany',
                  },
                  { name: 'india', value: 'india' },
                  {
                    name: 'usa',
                    selected: true,
                    value: 'usa',
                  },
                  { name: 'uk', value: 'uk' },
                  { name: 'srilanka', value: 'srilanka' },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Virtualized">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={300}
                placeholder="choose a country"
                onSelected={(val) => console.log(val)}
                virtualize
                enableSearch
                options={[
                  {
                    disabled: true,
                    name: 'germany',
                    value: 'germany',
                  },
                  { name: 'india', value: 'india' },
                  {
                    name: 'usa',
                    selected: true,
                    value: 'usa',
                  },
                  { name: 'uk', value: 'uk' },
                  { name: 'srilanka', value: 'srilanka' },
                  { name: 'canada', value: 'canada' },
                  { name: 'thailand', value: 'thailand' },
                  { name: 'brazil', value: 'brazil' },
                  { name: 'china', value: 'china' },
                  { name: 'japan', value: 'japan' },
                  { name: 'korea', value: 'korea' },
                  { name: 'indonesia', value: 'indonesia' },
                  { name: 'malaysia', value: 'malaysia' },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="RTL">
          <BlockQuote>
            With virtualized, the options are rendered only when they are in the
            viewport of the menu.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Dropdown
                maxMenuHeight={300}
                placeholder="choose a country"
                onSelected={(val) => console.log(val)}
                enableSearch
                RTL
                focusable
                options={[
                  {
                    disabled: true,
                    name: 'germany',
                    value: 'germany',
                  },
                  { name: 'india', value: 'india' },
                  {
                    name: 'usa',
                    selected: true,
                    value: 'usa',
                  },
                  { name: 'uk', value: 'uk' },
                  { name: 'srilanka', value: 'srilanka' },
                  { name: 'malaysia', value: 'malaysia' },
                ]}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default Widgets;
