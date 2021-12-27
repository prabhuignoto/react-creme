import React, { useEffect } from "react";
import { Accordion, BlockQuote, Section } from "../../../components";
import { DemoWidget } from "../../common/demo-widget";
import useMedia from "../../common/useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }

    if (media.isExtraLargeScreen) {
      setWidth(700);
    } else if (media.isBigScreen) {
      setWidth(450);
    } else if (media.isDesktop) {
      setWidth(450);
    } else if (media.isTablet) {
      setWidth(450);
    } else if (media.isMobile) {
      setWidth(320);
    }
  }, [media]);

  return (
    width > 0 && (
      <div style={{ minHeight: "1200px" }} className="rc-demo-widgets">
        <Section title="Default render">
          {/* <Code code="<span>This is a test</span>"></Code> */}
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
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
          </DemoWidget>
        </Section>
        <Section title="Custom Icon alignment">
          <BlockQuote>The icon can be aligned to the right</BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Accordion title="Lorem Ipsum" noBorder alignIconRight>
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
          </DemoWidget>
        </Section>
        <Section title="Expanded by default">
          <BlockQuote>
            Accordions can be expanded or collapsed by default
          </BlockQuote>
          <DemoWidget>
            <div style={{ width: `${width}px` }}>
              <Accordion title="Lorem Ipsum" noBorder expanded>
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
          </DemoWidget>
        </Section>
      </div>
    )
  );
}

export default widgets;
