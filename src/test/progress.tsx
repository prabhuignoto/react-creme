import React from "react";
import { useTimer } from "use-timer";
import { Button, Progress } from "../components";

function progress() {
  const { time, start, pause } = useTimer({
    endTime: 40,
    interval: 100,
  });

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Button onClick={start} label="Start"></Button>
        <Button onClick={pause} label="Stop"></Button>
      </div>
      <Progress
        type="progressive"
        width={150}
        maxValue={200}
        currentValue={time * 5}
        showProgressValue
        size="small"
      />
    </div>
  );
}

export default progress;
