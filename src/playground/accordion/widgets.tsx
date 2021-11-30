import React, { useEffect } from "react";
import { Accordion, Image } from "../../components";
import useMedia from "../useMedia";

function widgets() {
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
        style={{ width: `${width}px`, minHeight: "1200px" }}
        className="rc-demo-widgets"
      >
        <div className="rc-demo-widget">
          <Accordion title="Show Image" iconType="plus" alignIconRight>
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
              Suspendisse in faucibus tortor, nec aliquet arcu. Quisque at lorem
              sed est pretium bibendum. Etiam semper iaculis semper. Proin
              auctor velit massa, euismod pretium dui euismod in. Pellentesque
              rhoncus eros id posuere tincidunt. Maecenas quis libero vitae elit
              consectetur finibus et ac libero. Donec at fermentum lectus. Cras
              iaculis augue non mauris interdum, vitae pretium mi blandit.
              Aenean ultrices pellentesque lectus ac faucibus. Morbi tristique
              vulputate nisi, id porttitor diam egestas a. Suspendisse a tortor
              suscipit, accumsan massa at, viverra urna. Maecenas vel lectus
              sodales, dapibus dolor eget, pharetra neque. Nam eleifend id
              mauris in suscipit. Ut sed risus at mi vulputate rhoncus.
            </p>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for lorem ipsum will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
          </Accordion>
        </div>
      </div>
    )
  );
}

export default widgets;
