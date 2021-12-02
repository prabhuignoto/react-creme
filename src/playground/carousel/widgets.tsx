import React, { useEffect, useMemo } from "react";
import { Carousel, Image, Section } from "../../components";
import useMedia from "../useMedia";

function widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState<string | number>(null);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth("90%");
    } else if (media.isMobile) {
      setWidth("90%");
    } else if (media.isBigScreen) {
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  const resolvedWidth = useMemo(
    () => (typeof width === "string" ? width : `${width}px`),
    [width]
  );

  return (
    width && (
      <div className="rc-demo-widgets">
        <Section title="Horizontal layout">
          <div
            style={{
              height: "400px",
              width: resolvedWidth,
            }}
            className="rc-demo-widget"
          >
            <Carousel direction="horizontal">
              <Image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1474&q=80" />
              <Image src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1274&q=80" />
              <Image src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1476&q=80" />
              <Image src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1275&q=80" />
              <span>1233</span>
            </Carousel>
          </div>
        </Section>
        <br></br>
        <Section title="Vertical layout">
          <div
            style={{ height: "400px", width: resolvedWidth }}
            className="rc-demo-widget"
          >
            <Carousel direction="vertical">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
                tempor nunc, quis gravida justo. Proin sed pellentesque odio. In
                congue leo lacus, ac fringilla arcu gravida a. Ut ac interdum
                risus. Maecenas lacinia vulputate lorem, in dignissim magna
                faucibus quis. Phasellus augue erat, maximus non turpis eget,
                egestas venenatis turpis. Sed elementum porttitor eleifend.
                Nulla tincidunt lobortis libero eu fringilla. Curabitur congue
                ac libero ac porta. Proin quam risus.
              </p>
              <p>
                Proin cursus nisl libero, scelerisque finibus felis mattis nec.
                Sed porta nunc vitae augue semper maximus. In euismod fermentum
                leo eget rutrum. Mauris rutrum, dui non venenatis blandit,
                tortor velit finibus urna, in ultrices lectus sapien sit amet
                sapien. Orci varius natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Phasellus vel metus eget quam
                mollis porta. Integer at nisi elementum, varius mauris eget,
                consectetur neque. Integer id turpis non nisi posuere venenatis.
              </p>
              <p>
                Nulla lacinia nibh sit amet tortor rhoncus, et fringilla diam
                scelerisque. Nullam diam elit, malesuada in tincidunt id,
                interdum non urna. Nullam libero neque, egestas non facilisis
                et, egestas vel mi. Aenean volutpat velit id lectus venenatis
                tincidunt. Vestibulum et nisl dolor. Suspendisse vel ipsum ut
                neque laoreet auctor id varius magna. Donec in nisl rutrum,
                facilisis leo id, ultrices ex.
              </p>
            </Carousel>
          </div>
        </Section>
      </div>
    )
  );
}

export default widgets;
