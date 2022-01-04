import React from "react";
import { Accordion } from "../../components";
import { CodeIcon } from "../../icons";
import { Code } from "./Code";
import "./demo-widget.scss";

interface WidgetProps {
  children: React.ReactNode;
  layout?: "horizontal" | "vertical";
  width?: string | number;
  fullWidth?: boolean;
}

const DemoWidget: React.FC<WidgetProps> = React.memo(
  ({
    children,
    layout = "vertical",
    width,
    fullWidth = false,
  }: WidgetProps) => {
    return (
      <div
        className="rc-demo-widget"
        style={{
          display: "flex",
          flexDirection: layout === "horizontal" ? "row" : "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div style={{ margin: "0.5rem 0", width: fullWidth ? "100%" : "" }}>
          {children}
        </div>
        <div style={{ width: "100%" }}>
          <Accordion
            title="Show Code"
            border={false}
            focusable={false}
            customIcon={<CodeIcon />}
          >
            <Code>{children}</Code>
          </Accordion>
        </div>
      </div>
    );
  }
);

DemoWidget.displayName = "DemoWidget";

export { DemoWidget };
