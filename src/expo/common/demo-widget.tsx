import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { Accordion } from "../../components";
import { CodeIcon } from "../../icons";
import "./demo-widget.scss";
import { Code } from "./syntax-highlighter";

interface WidgetProps {
  children: React.ReactNode;
  layout?: "horizontal" | "vertical";
  width?: string | number;
  fullWidth?: boolean;
}

const DemoWidget: React.FC<WidgetProps> = ({
  children,
  layout = "row",
  width,
  fullWidth = false,
}) => {
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
      <div className="rc-demo-code-block">
        <Accordion
          title="Show Code"
          noBorder
          focusable={false}
          customIcon={<CodeIcon />}
        >
          <Code
            code={reactElementToJSXString(children, {
              showDefaultProps: true,
              maxInlineAttributesLineLength: 550,
              useBooleanShorthandSyntax: true,
              tabStop: 4,
              sortProps: true,
            })}
          ></Code>
        </Accordion>
      </div>
    </div>
  );
};

export { DemoWidget };
