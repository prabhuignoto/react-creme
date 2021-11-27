import React from "react";
import { useTimer } from "use-timer";
import { Button, CircularProgress, Progress } from "../../components";

const Widgets: React.FunctionComponent = () => {
  const { time, start, pause, reset } = useTimer({
    endTime: 50,
    interval: 100,
  });

  return (
    <div className="rc-demo-widgets">
      <div
        style={{ display: "flex", marginBottom: "1rem" }}
        className="rc-demo-widget"
      >
        <Button onClick={start} label="Start"></Button>
        <div style={{ margin: "0 1rem" }}>
          <Button onClick={pause} label="Pause"></Button>
        </div>
        <div style={{ margin: "0 1rem" }}>
          <Button onClick={reset} label="Reset"></Button>
        </div>
      </div>
      <div className="rc-demo-widget">
        <Progress
          type="progressive"
          width={300}
          maxValue={50}
          currentValue={time * 1}
          size="md"
          showProgressValue
        />
      </div>
      <div className="rc-demo-widget">
        <Progress
          type="progressive"
          width={300}
          maxValue={50}
          currentValue={time * 1}
          size="sm"
        />
      </div>
      <div className="rc-demo-widget">
        <Progress
          type="progressive"
          width={300}
          maxValue={32}
          currentValue={31}
          size="sm"
          status="success"
        />
      </div>
      <div className="rc-demo-widget">
        <Progress
          type="progressive"
          width={300}
          maxValue={50}
          currentValue={25}
          showProgressValue
          size="lg"
          status="error"
        />
      </div>
      <div className="rc-demo-widget">
        <Progress
          type="infinite"
          width={400}
          maxValue={50}
          currentValue={time * 1}
          showProgressValue
          size="md"
          infiniteStyle="bob"
        />
      </div>

      <div className="rc-demo-widget">
        <Progress
          type="infinite"
          width={350}
          maxValue={50}
          currentValue={time * 1}
          showProgressValue
          size="sm"
        />
      </div>

      <div>
        <CircularProgress size={40} />
      </div>
      <div>
        <CircularProgress size={40} style="double-ring" />
      </div>
    </div>
  );
};

export default Widgets;
