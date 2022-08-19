import { BlockQuote, Button, CircularProgress, Progress, Section } from '@core';
import { useTimer } from 'use-timer';
import { DemoWidget } from '../../common/demo-widget';

const Widgets: React.FunctionComponent = () => {
  const { time, start, pause, reset } = useTimer({
    endTime: 50,
    interval: 100,
  });

  return (
    <div className="rc-demo-widgets">
      <Section title="Default rendering" size="md">
        <div className="rc-demo-widget" style={{ marginBottom: '1rem' }}>
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
        <DemoWidget name="Progress">
          <Progress
            type="determinate"
            width={300}
            maxValue={50}
            currentValue={time * 1}
            size="md"
            showProgressValue
          />
        </DemoWidget>
        <DemoWidget name="Progress">
          <Progress
            type="determinate"
            maxValue={50}
            currentValue={time * 1}
            size="sm"
          />
        </DemoWidget>
      </Section>
      <Section title="States" size="md">
        <BlockQuote>
          The progress bar can be in a success or error state.
        </BlockQuote>
        <DemoWidget name="Progress">
          <Progress
            type="determinate"
            // width={300}
            maxValue={32}
            currentValue={31}
            size="sm"
            status="success"
          />
        </DemoWidget>
        <DemoWidget name="Progress">
          <Progress
            type="determinate"
            // width={300}
            maxValue={50}
            currentValue={25}
            showProgressValue
            size="lg"
            status="error"
          />
        </DemoWidget>
      </Section>
      <Section title="Indeterminate progress" size="md">
        <BlockQuote>
          Useful for operations that take a long time to complete.
        </BlockQuote>
        <DemoWidget name="Progress">
          <Progress type="indeterminate" showProgressValue size="sm" />
        </DemoWidget>
      </Section>
      <Section title="Indeterminate Progress - Bob" size="md">
        <BlockQuote>Infinite progress with a bob animation</BlockQuote>
        <DemoWidget name="Progress">
          <Progress type="indeterminate" size="md" indeterminateStyle="bob" />
        </DemoWidget>
      </Section>
      <Section title="Circular Progress" size="md">
        <BlockQuote>
          Infinite progress is also available in circular mode.
        </BlockQuote>
        <DemoWidget name="Progress">
          <div style={{ margin: '0 0.5rem' }}>
            <CircularProgress size={'md'} />
          </div>
        </DemoWidget>
      </Section>
      {/* <Section title="Circular Progress - Double ring" size="md">
        <div className="rc-demo-widget">
          <CircularProgress size={40} style="double-ring" />
        </div>
      </Section> */}
    </div>
  );
};

export default Widgets;
