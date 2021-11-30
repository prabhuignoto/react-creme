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
            style={{ height: "502px", width: "950px" }}
            className="rc-demo-widget"
          >
            <ImageComparer
              direction="horizontal"
              sourceOne="https://i.imgur.com/gypU9cN.jpg"
              sourceTwo="https://i.imgur.com/gypU9cN.jpg"
            ></ImageComparer>
          </div>
          <div
            style={{ height: "502px", width: "950px" }}
            className="rc-demo-widget"
          >
            <ImageComparer
              direction="vertical"
              sourceOne="https://i.imgur.com/gypU9cN.jpg"
              sourceTwo="https://i.imgur.com/gypU9cN.jpg"
            ></ImageComparer>
          </div>
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default comparer;
