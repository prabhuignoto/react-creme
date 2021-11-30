import React, { CSSProperties, useEffect } from "react";
import { Image, Reveal } from "../../components";
import useMedia from "../useMedia";

const imageWrapStyle = {
  height: "400px",
  display: "flex",
  placeContent: "center center",
  alignItems: "center",
} as CSSProperties;

function widgets() {
  const ref = React.useRef<HTMLDivElement>(null);

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(500);
    } else if (media.isMobile) {
      setWidth(400);
    } else if (media.isBigScreen) {
      setWidth(500);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div
        className="rc-demo-widget"
        style={{
          height: "600px",
          overflow: "auto",
          border: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
        }}
        ref={ref}
      >
        <div
          style={{
            marginTop: "2000px",
            width: "100%",
          }}
        >
          <Reveal parent={ref}>
            <div style={{ ...imageWrapStyle }}>
              <Image
                width={width}
                height={500}
                expandOnClick
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3083&q=60"
              />
            </div>
          </Reveal>
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <Reveal parent={ref}>
            <div style={{ ...imageWrapStyle }}>
              <Image
                width={width}
                height={300}
                expandOnClick
                src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
              />
            </div>
          </Reveal>
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          <Reveal parent={ref}>
            <div style={{ ...imageWrapStyle }}>
              <Image
                width={width}
                height={300}
                expandOnClick
                src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
              />
            </div>
          </Reveal>
        </div>
      </div>
    )
  );
}

export default widgets;
