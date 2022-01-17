import React from 'react';
import { useTimer } from 'use-timer';
import {
  BlockQuote,
  Button,
  CircularProgress,
  Progress,
  Section,
} from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';
const Widgets: React.FunctionComponent = () => {
  const { time, start, pause, reset } = useTimer({
    endTime: 50,
    interval: 100,
  });

  return (
    <div className="rc-demo-widgets">
      <Section title="Default rendering">
        <div className="rc-demo-widget">
          <div style={{ margin: '0 1rem' }}>
            <Button onClick={start} label="Start"></Button>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <Button onClick={pause} label="Pause"></Button>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <Button onClick={reset} label="Reset"></Button>
          </div>
        </div>
        <DemoWidget>
          <Progress
            type="progressive"
            // width={300}
            maxValue={50}
            currentValue={time * 1}
            size="md"
            showProgressValue
          />
        </DemoWidget>
        <DemoWidget>
          <Progress
            type="progressive"
            // width={300}
            maxValue={50}
            currentValue={time * 1}
            size="sm"
          />
        </DemoWidget>
      </Section>
      <Section title="States">
        <BlockQuote>
          The progress bar can be in a success or error state.
        </BlockQuote>
        <DemoWidget>
          <Progress
            type="progressive"
            // width={300}
            maxValue={32}
            currentValue={31}
            size="sm"
            status="success"
          />
        </DemoWidget>
        <DemoWidget>
          <Progress
            type="progressive"
            // width={300}
            maxValue={50}
            currentValue={25}
            showProgressValue
            size="lg"
            status="error"
          />
        </DemoWidget>
      </Section>
      <Section title="Infinite progress">
        <BlockQuote>
          Useful for operations that take a long time to complete.
        </BlockQuote>
        <DemoWidget>
          <Progress
            type="infinite"
            // width={350}
            maxValue={50}
            currentValue={time * 1}
            showProgressValue
            size="sm"
          />
        </DemoWidget>
      </Section>
      <Section title="Infinite Progress - Bob">
        <BlockQuote>Infinite progress with a bob animation</BlockQuote>
        <DemoWidget>
          <Progress
            type="infinite"
            // width={400}
            maxValue={50}
            currentValue={time * 1}
            showProgressValue
            size="md"
            infiniteStyle="bob"
          />
        </DemoWidget>
      </Section>
      <Section title="Circular Progress">
        <BlockQuote>
          Infinite progress is also available in circular mode.
        </BlockQuote>
        <DemoWidget>
          <div style={{ margin: '0 0.5rem' }}>
            <CircularProgress size={'md'} />
          </div>
        </DemoWidget>
      </Section>
      {/* <Section title="Circular Progress - Double ring">
        <div className="rc-demo-widget">
          <CircularProgress size={40} style="double-ring" />
        </div>
      </Section> */}
    </div>
  );
};

export default Widgets;
