import React, { useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BlockQuote, DataGrid, Section } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';

const data = [
  {
    age: 30,
    dept: 'physics',
    marks: 100,
    name: 'John',
  },
  {
    age: 25,
    dept: 'chemistry is the toughest job in the world',
    marks: 80,
    name: 'Jane',
  },
  {
    age: 25,
    dept: 'chemistry',
    marks: 78,
    name: 'Lewis hamilton',
  },
  { age: 35, dept: 'Physics', marks: 100, name: 'Prabhu' },
  { age: 25, dept: 'Biology', marks: 95, name: 'Clive' },
];

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = React.useState(0);
  const [columns, setColumns] = React.useState<DataGridColumn[]>([
    { name: 'name', type: 'string' },
    { name: 'age', type: 'number' },
    { name: 'dept', type: 'string' },
    { name: 'marks', type: 'number' },
  ]);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(1250);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(650);
      setColumns([
        { name: 'name', type: 'string' },
        { name: 'marks', type: 'number' },
        { name: 'dept', type: 'string' },
      ]);
    } else if (media.isTablet) {
      setWidth(580);
      setColumns([
        { name: 'name', type: 'string', width: 200 },
        { name: 'dept', type: 'string', width: 200 },
        { name: 'marks', type: 'number' },
      ]);
    } else if (media.isMobile) {
      setWidth(320);
      setColumns([
        { name: 'name', type: 'string' },
        { name: 'marks', type: 'number' },
      ]);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <Section title="Comfortable View">
          <BlockQuote>
            In Comfortable mode, the display density is set to high and is
            preferable for better readability.
          </BlockQuote>
          <DemoWidget width={width}>
            <DataGrid
              layoutStyle="comfortable"
              border
              gridWidth={width}
              columns={columns}
              data={data}
            />
          </DemoWidget>
        </Section>
        <Section title="Compact View">
          <BlockQuote>
            In Compact mode, the display density is set to low and is preferred
            for smaller viewport and when you want to cramp in more rows in the
            grid.
          </BlockQuote>
          <DemoWidget width={width}>
            <DataGrid
              layoutStyle="compact"
              fixedHeight
              border
              columns={columns}
              data={data}
            />
          </DemoWidget>
        </Section>
        <Section title="Sortable">
          <BlockQuote>
            Individual columns can be configured to be sortable.
          </BlockQuote>
          <DemoWidget width={width}>
            <DataGrid
              layoutStyle="comfortable"
              border
              columns={columns.map(x => {
                if (x.name === 'name') {
                  return { ...x, sortable: true };
                } else {
                  return x;
                }
              })}
              data={data}
            />
          </DemoWidget>
        </Section>
        <Section title="Custom Table outlook">
          <BlockQuote>
            Use the <code>zebra</code> property to alternate the background
            color of the rows.
          </BlockQuote>
          <DemoWidget width={width}>
            <DataGrid
              layoutStyle="comfortable"
              zebra
              columns={columns}
              data={data}
            />
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
