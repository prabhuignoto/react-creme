import { render } from "@testing-library/react";
import React from "react";
import { Progress } from "../progress";

describe("Progress", () => {
  it("should render progressbar", async () => {
    render(
      <Progress
        type="progressive"
        maxValue={200}
        size="sm"
        width={300}
        currentValue={120}
      />
    );
  });
});
