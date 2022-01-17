import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, Section, Tags } from '../../../lib/components';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const items = [
  { disabled: false, name: 'python' },
  { name: 'fortran' },
  { name: 'c sharp' },
  { name: 'Go lang' },
  { disabled: true, name: 'RUST' },
];

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState<string | number>(null);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(500);
    } else if (media.isTablet) {
      setWidth('85%');
    } else if (media.isMobile) {
      setWidth('90%');
    }
  }, [media]);

  const resolvedWidth = typeof width === 'string' ? width : `${width}px`;

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Tags - default">
          <BlockQuote>
            New tags can be added to the list by typing in the input field.Tags
            can be removed by clicking on the close icon on the tag.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                placeholder="Choose a language..."
                items={items}
                maxTags={15}
                onChange={(val) => console.log(val)}
                tagWidth={150}
                focusable
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Filled style">
          <BlockQuote>
            Tags can be disabled by setting the disabled property to true.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                placeholder="Choose a language..."
                items={items}
                maxTags={15}
                onChange={(val) => console.log(val)}
                tagWidth={150}
                tagStyle="fill"
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Tags - Readonly">
          <BlockQuote>
            In readonly mode, you can only select the tags that are already in
            the list.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                placeholder="Choose a language..."
                items={items}
                maxTags={15}
                onChange={(val) => console.log(val)}
                readonly
                tagWidth={50}
              />
            </div>
          </DemoWidget>
        </Section>
        <Section title="Tags - AutoComplete">
          <BlockQuote>
            In readonly mode, you can only select the tags that are already in
            the list.
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: resolvedWidth }}>
              <Tags
                placeholder="Choose a language..."
                items={items}
                maxTags={15}
                onChange={(val) => console.log(val)}
                tagWidth={100}
                autoComplete
                suggestions={['one', 'two']}
              />
            </div>
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
