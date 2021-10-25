import React, { CSSProperties } from "react";
import { useTimer } from "use-timer";
import { Button, Progress } from "../components";

const wrap: CSSProperties = {
  margin: "1rem 0",
};

function progress() {
  const { time, start, pause, reset } = useTimer({
    endTime: 40,
    interval: 100,
  });

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Button onClick={start} label="Start"></Button>
        <Button onClick={pause} label="Pause"></Button>
        <Button onClick={reset} label="Reset"></Button>
      </div>
      <div style={wrap}>
        <Progress
          type="progressive"
          width={300}
          maxValue={200}
          currentValue={time * 5}
          showProgressValue
          size="small"
        />
      </div>
      <div style={wrap}>
        <Progress
          type="progressive"
          width={300}
          maxValue={200}
          currentValue={time * 5}
          size="big"
        />
      </div>
      <div style={wrap}>
        <Progress
          type="infinite"
          width={300}
          maxValue={200}
          currentValue={time * 5}
          showProgressValue
          size="small"
          infiniteStyle="bob"
        />
      </div>
    </div>
  );
}

export default progress;
