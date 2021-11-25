import React, { CSSProperties, useEffect, useMemo } from "react";
import { CheckBox } from "../components";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function checkbox() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  const style = useMemo(() => {
    return {
      width: `${width}px`,
      margin: "1rem 0",
    } as CSSProperties;
  }, [width]);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(350);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(400);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        data={[
          {
            name: "label",
            description: `label for the checkbox`,
            default: `""`,
            optional: "Yes",
          },
          {
            name: "disabled",
            description: `disables the button`,
            default: "False",
            optional: "Yes",
          },
          {
            name: "size",
            description: `sets the size of the button. <br> <code>"sm" | "md" | "lg"</code>`,
            default: "sm",
            optional: "Yes",
          },
          {
            name: "style",
            description: `any custom CSS`,
            default: "{}",
            optional: "Yes",
          },
          {
            name: "focusable",
            description: `makes the component focusable via keyboard`,
            default: "False",
            optional: "Yes",
          },
          {
            name: "border",
            description: `prop for disabling the button border`,
            default: "true",
            optional: "Yes",
          },
          {
            name: "isChecked",
            description: `prop to set the checkbox to checked state on load`,
            default: "False",
            optional: "Yes",
          },
          {
            name: "onChange",
            description: `Callback fired when the state changes`,
            default: "",
            optional: "Yes",
          },
        ]}
        tabTitles={["checkbox", "properties"]}
        demoWidget={
          <div className="rc-demo-widgets">
            <div style={style} className="rc-demo-widget">
              <CheckBox
                label="select"
                onChange={(ele) => console.log(ele)}
                focusIcon
              />
            </div>
            <div className="rc-demo-widget" style={style}>
              <CheckBox
                label="select the value its too lg"
                onChange={(ele) => console.log(ele)}
                size="md"
                border={false}
              />
            </div>
            <div style={style} className="rc-demo-widget">
              <CheckBox
                label="select"
                onChange={(ele) => console.log(ele)}
                isChecked
                size="lg"
                border={false}
                focusIcon
              />
            </div>
          </div>
        }
      ></DemoPageRenderer>
    )
  );
}

export default checkbox;
