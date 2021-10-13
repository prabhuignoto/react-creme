import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Link } from "../../link/link";
import { BreadCrumb } from "../breadcrumb";

const handler = jest.fn();

describe("Breadcrumb", () => {
  it("should render", () => {
    render(
      <BreadCrumb>
        <Link href="http://google.com" />
        <Link href="http://yahoo.com" />
        <Link href="http://amazon.com" />
      </BreadCrumb>
    );
  });

  it("should onClick is called", () => {
    const { getByText } = render(
      <BreadCrumb onClick={handler}>
        <Link href="http://google.com">google</Link>
        <Link href="http://yahoo.com">yahoo</Link>
        <Link href="http://amazon.com">amazon</Link>
      </BreadCrumb>
    );

    expect(getByText("google")).toBeInTheDocument();
    fireEvent.click(getByText("google"));

    expect(handler).toBeCalled();
  });
});
