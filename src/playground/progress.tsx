import React, { CSSProperties } from "react";
import { useTimer } from "use-timer";
import { Button, Progress } from "../components";

const wrap: CSSProperties = {
  margin: "1rem 0",
};

function progress() {
  const { time, start, pause, reset } = useTimer({
    endTime: 50,
    interval: 100,
  });

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <div style={{ margin: "0 1rem" }}>
          <Button onClick={start} label="Start"></Button>
        </div>
        <div style={{ margin: "0 1rem" }}>
          <Button onClick={pause} label="Pause"></Button>
        </div>
        <div style={{ margin: "0 1rem" }}>
          <Button onClick={reset} label="Reset"></Button>
        </div>
      </div>
      <div style={wrap}>
        <Progress
          type="progressive"
          width={300}
          maxValue={50}
          currentValue={time * 1}
          size="md"
          showProgressValue
        />
      </div>
      <div style={wrap}>
        <Progress
          type="progressive"
          width={300}
          maxValue={50}
          currentValue={time * 1}
          size="sm"
        />
      </div>
      <div style={wrap}>
        <Progress
          type="progressive"
          width={300}
          maxValue={32}
          currentValue={31}
          size="sm"
          status="success"
        />
      </div>
      <div style={wrap}>
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
      <div style={wrap}>
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

      <div style={wrap}>
        <Progress
          type="infinite"
          width={350}
          maxValue={50}
          currentValue={time * 1}
          showProgressValue
          size="sm"
        />
      </div>
    </div>
  );
}

export default progress;
