import React, { useEffect } from "react";
import { Accordion } from "../components";
import { Image } from "../components/image/image";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function accordion() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        tabTitles={["Accordion", "Properties"]}
        data={[
          {
            name: "id",
            description: "unique id for the accordion",
            default: "auto generated",
            optional: "Yes",
          },
          {
            name: "alignIconRight",
            description: "Aligns the expand/collapse icon to the Right.",
            default: "false",
            optional: "Yes",
          },
          {
            name: "noBorder",
            description: "Disables the border around the accordion item",
            default: "false",
            optional: "Yes",
          },
          {
            name: "transition",
            description: "custom transition function",
            default: "",
            optional: "Yes",
          },
          {
            name: "onCollapsed",
            description: "callback that is called on collapse",
            default: "",
            optional: "Yes",
          },
          {
            name: "onExpanded",
            description: "callback that is called on expand",
            default: "",
            optional: "Yes",
          },
        ]}
        demoWidget={
          <div
            style={{ width: `${width}px`, minHeight: "1200px" }}
            className="rc-demo-widgets"
          >
            <div className="rc-demo-widget">
              <Accordion title="Show Image">
                <div
                  style={{
                    width: `${width}px`,
                    height: "400px",
                  }}
                >
                  <Image src="https://images.unsplash.com/photo-1635276080002-e1b219f8414f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1447&q=80" />
                </div>
              </Accordion>
            </div>
            <div className="rc-demo-widget">
              <Accordion title="Lorem Ipsum" noBorder>
                <p>
                  Sed laoreet neque eget sem varius, et interdum dui venenatis.
                  Suspendisse in faucibus tortor, nec aliquet arcu. Quisque at
                  lorem sed est pretium bibendum. Etiam semper iaculis semper.
                  Proin auctor velit massa, euismod pretium dui euismod in.
                  Pellentesque rhoncus eros id posuere tincidunt. Maecenas quis
                  libero vitae elit consectetur finibus et ac libero. Donec at
                  fermentum lectus. Cras iaculis augue non mauris interdum,
                  vitae pretium mi blandit. Aenean ultrices pellentesque lectus
                  ac faucibus. Morbi tristique vulputate nisi, id porttitor diam
                  egestas a. Suspendisse a tortor suscipit, accumsan massa at,
                  viverra urna. Maecenas vel lectus sodales, dapibus dolor eget,
                  pharetra neque. Nam eleifend id mauris in suscipit. Ut sed
                  risus at mi vulputate rhoncus.
                </p>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content
                  here, content here, making it look like readable English. Many
                  desktop publishing packages and web page editors now use Lorem
                  Ipsum as their default model text, and a search for lorem
                  ipsum will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </Accordion>
            </div>
          </div>
        }
      ></DemoPageRenderer>
    )
  );
}

export default accordion;
