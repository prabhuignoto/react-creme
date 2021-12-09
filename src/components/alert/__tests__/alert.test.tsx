import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Alert } from "../alert";

describe("Alert", () => {
  it("should render the alert", () => {
    const { getByText } = render(<Alert message="test" />);
    expect(getByText("test")).toBeInTheDocument();
  });

  it("should render success state correctly", () => {
    const { getByRole } = render(<Alert message="test" state="success" />);
    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("rc-alert-success");
  });

  it("should render warning state correctly", () => {
    const { getByRole } = render(<Alert message="test" state="warning" />);
    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("rc-alert-warning");
  });

  it("should render error state correctly", () => {
    const { getByRole } = render(<Alert message="test" state="error" />);
    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("rc-alert-error");
  });

  it("should render info state correctly", () => {
    const { getByRole } = render(<Alert message="test" state="info" />);
    expect(getByRole("alert")).toBeInTheDocument();
    expect(getByRole("alert")).toHaveClass("rc-alert-info");
  });

  it("should call onDismiss", () => {
    const onDismiss = jest.fn();
    const { getByRole } = render(
      <Alert message="test" state="info" onDismiss={onDismiss} />
    );
    fireEvent.click(getByRole("button"));
    expect(onDismiss).toHaveBeenCalled();
  });
});
