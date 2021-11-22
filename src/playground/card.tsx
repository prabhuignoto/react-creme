import React, { useEffect } from "react";
import { Card } from "../components/card/card";
import { Skeleton } from "../components/skeleton/skeleton";
import useMedia from "./useMedia";

function card() {
  const media = useMedia();

  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(600);
    } else if (media.isMobile) {
      setWidth(350);
    } else if (media.isBigScreen) {
      setWidth(1200);
    } else if (media.isDesktop) {
      setWidth(850);
    }
  }, [media]);

  return (
    width > 0 && (
      <div style={{ width: `${width}px` }}>
        <Card
          alignHeader="left"
          header={<h2>header</h2>}
          footer={<span>footer</span>}
          minHeight={400}
        >
          <Skeleton
            animate
            rowHeight={10}
            rows={10}
            style={{ marginTop: "1rem" }}
            showCircle
          ></Skeleton>
        </Card>
      </div>
    )
  );
}

export default card;
