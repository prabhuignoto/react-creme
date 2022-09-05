import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DataGrid, Section, Text } from '../../../lib/components';
import { DataGridColumn } from '../../../lib/components/data-grid/data-grid-model';
import { responsiveState } from '../../atoms/home';
import { DemoWidget } from '../../common/demo-widget';
import { columnsConfig, data } from './grids-data';

function widgets() {
  const media = useRecoilValue(responsiveState);
  const [width, setWidth] = useState<string | number>(0);
  const [columns, setColumns] = useState<DataGridColumn[]>(columnsConfig);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth('100%');
    } else if (media.isBigScreen) {
      setWidth('100%');
      setColumns([
        { name: 'name', type: 'string' },
        { name: 'marks', type: 'number' },
        { name: 'dept', type: 'string' },
      ]);
    } else if (media.isDesktop) {
      setWidth('100%');
      setColumns([
        { name: 'name', type: 'string' },
        { name: 'marks', type: 'number' },
        { name: 'dept', type: 'string' },
      ]);
    } else if (media.isTablet) {
      setWidth('100%');
      setColumns([
        { name: 'name', type: 'string', width: 200 },
        { name: 'dept', type: 'string', width: 200 },
        { name: 'marks', type: 'number' },
      ]);
    } else if (media.isMobile) {
      setWidth('100%');
      setColumns([
        { name: 'name', type: 'string' },
        { name: 'marks', type: 'number' },
      ]);
    }
  }, [media]);

  return width ? (
    <div className="rc-demo-widgets">
      <Section size="md" title="Comfortable View">
        <Text>
          In Comfortable mode, the display density is set to high and is
          preferable for better readability.
        </Text>
        <DemoWidget name="DataGrid" width={width} showCodeByDefault={false}>
          <DataGrid
            layoutStyle="comfortable"
            border
            // gridWidth={width}
            columns={columns}
            data={data}
          />
        </DemoWidget>
      </Section>
      <Section size="md" title="Compact View">
        <Text>
          In Compact mode, the display density is set to low and is preferred
          for smaller viewport and when you want to cramp in more rows in the
          grid.
        </Text>
        <DemoWidget name="DataGrid" width={width} showCodeByDefault={false}>
          <DataGrid
            layoutStyle="compact"
            fixedHeight
            border
            columns={columns}
            data={data}
          />
        </DemoWidget>
      </Section>
      <Section size="md" title="Sortable">
        <Text>Individual columns can be configured to be sortable.</Text>
        <DemoWidget name="DataGrid" width={width} showCodeByDefault={false}>
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
      <Section size="md" title="Custom Table outlook">
        <Text>
          Use the <code>zebra</code> property to alternate the background color
          of the rows.
        </Text>
        <DemoWidget name="DataGrid" width={width} showCodeByDefault={false}>
          <DataGrid
            layoutStyle="comfortable"
            zebra
            columns={columns}
            data={data}
          />
        </DemoWidget>
      </Section>
      <Section size="md" title="Searchable Grid">
        <Text>
          Use the <code>searchable</code> property to enable search
          functionality in the grid.
        </Text>
        <DemoWidget name="DataGrid" width={width} showCodeByDefault={false}>
          <DataGrid
            layoutStyle="comfortable"
            columns={columns.map(x => {
              if (x.name === 'name') {
                return { ...x, searchable: true };
              } else {
                return x;
              }
            })}
            data={data.slice(0)}
          />
        </DemoWidget>
      </Section>
    </div>
  ) : null;
}

export default widgets;
