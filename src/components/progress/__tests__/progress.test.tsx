import { render } from "@testing-library/react";
import React from "react";
import { Progress } from "../progress";

describe("Progress", () => {
  it("should render progressbar", async () => {
    const { getByRole } = render(
      <Progress
        type="progressive"
        maxValue={200}
        size="small"
        width={300}
        currentValue={120}
      />
    );
  });
});
