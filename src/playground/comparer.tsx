import React from "react";
import { ImageComparer } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function comparer() {
  // const media = useMedia();
  // const [_, setWidth] = React.useState(0);

  // useEffect(() => {
  //   if (!media) {
  //     return;
  //   }
  //   if (media.isTablet) {
  //     setWidth(500);
  //   } else if (media.isMobile) {
  //     setWidth(400);
  //   } else if (media.isBigScreen) {
  //     setWidth(500);
  //   } else if (media.isDesktop) {
  //     setWidth(450);
  //   }
  // }, [media]);

  return (
    <DemoPageRenderer
      data={[]}
      tabTitles={["comparer", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div
            style={{ height: "600px", width: "450px" }}
            className="rc-demo-widget"
          >
            <ImageComparer
              sourceOne="https://images.unsplash.com/photo-1634747037495-3a209f58cfb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80"
              sourceTwo="https://images.unsplash.com/photo-1634747037495-3a209f58cfb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80"
            ></ImageComparer>
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default comparer;
