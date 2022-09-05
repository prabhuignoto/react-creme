import { useTimer } from 'use-timer';
import {
  Button,
  CircularProgress,
  Progress,
  Section,
  Text,
} from '../../../lib/components';
import { DemoWidget } from '../../common/demo-widget';

const Widgets: React.FunctionComponent = () => {
  const { time, start, pause, reset } = useTimer({
    endTime: 50,
    interval: 100,
  });

  return (
    <div className="rc-demo-widgets">
      <Section size="md" title="Default rendering">
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
      <Section size="md" title="States">
        <Text>The progress bar can be in a success or error state.</Text>
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
      <Section size="md" title="Indeterminate progress">
        <Text>Useful for operations that take a long time to complete.</Text>
        <DemoWidget name="Progress">
          <Progress type="indeterminate" showProgressValue size="sm" />
        </DemoWidget>
      </Section>
      <Section size="md" title="Indeterminate Progress - Bob">
        <Text>Infinite progress with a bob animation</Text>
        <DemoWidget name="Progress">
          <Progress type="indeterminate" size="md" indeterminateStyle="bob" />
        </DemoWidget>
      </Section>
      <Section size="md" title="Circular Progress">
        <Text>Infinite progress is also available in circular mode.</Text>
        <DemoWidget name="Progress">
          <div style={{ margin: '0 0.5rem' }}>
            <CircularProgress size={'md'} />
          </div>
        </DemoWidget>
      </Section>
      {/* <Section size="md"  title="Circular Progress - Double ring" >
        <div className="rc-demo-widget">
          <CircularProgress size={40} style="double-ring" />
        </div>
      </Section> */}
    </div>
  );
};

export default Widgets;
