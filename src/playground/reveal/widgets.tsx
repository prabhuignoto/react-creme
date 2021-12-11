import React, { CSSProperties, useLayoutEffect } from "react";
import { Image, Reveal } from "../../components";
import useMedia from "../common/useMedia";

const blankStyle = {
  minHeight: "1200px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  fontSize: "1.2rem",
  paddingTop: "200px",
} as CSSProperties;

const imageWrapStyle = {
  width: "450px",
  display: "flex",
  margin: "0 auto",
} as CSSProperties;

function widgets() {
  const ref = React.useRef<HTMLDivElement>(null);

  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(650);
    } else if (media.isMobile) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(750);
    } else if (media.isBigScreen) {
      setWidth(850);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widget" ref={ref}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: `${width}px`,
            height: "750px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
          <Reveal parent={ref}>
            <p style={imageWrapStyle}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which dont look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isnt anything embarrassing hidden in the
              middle of text. All the Lorem Ipsum generators on the Internet
              tend to repeat predefined chunks as necessary, making this the
              first true generator on the Internet. It uses a dictionary of over
              200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The
              generated Lorem Ipsum is therefore always free from repetition,
              injected humour, or non-characteristic words etc.
            </p>
          </Reveal>
          <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
          <Reveal parent={ref}>
            <Image
              width={width}
              height={300}
              expandImageOnClick
              src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg"
            />
          </Reveal>
          <div style={blankStyle}>⬇️ Scroll Down ⬇️</div>
          <Reveal parent={ref}>
            <p style={imageWrapStyle}>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which dont look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isnt anything embarrassing hidden in the
              middle of text. All the Lorem Ipsum generators on the Internet
              tend to repeat predefined chunks as necessary, making this the
              first true generator on the Internet. It uses a dictionary of over
              200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The
              generated Lorem Ipsum is therefore always free from repetition,
              injected humour, or non-characteristic words etc.
            </p>
          </Reveal>
        </div>
      </div>
    )
  );
}

export default widgets;
