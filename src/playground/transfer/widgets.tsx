import React, { useEffect } from "react";
import { Transfer } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(650);
    } else if (media.isMobile) {
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(850);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div className="rc-demo-widget">
          <Transfer
            list1={["one", "two", "five", "six"]}
            list2={["three", "four", "seven", "eight"]}
            onChange={(val, val2) => console.log(val, val2)}
            enableSearch
          />
        </div>
      </div>
    )
  );
}

export default widgets;
