import React, { useEffect } from "react";
import { Card } from "../components/card/card";
import { Image } from "../components/image/image";
import { Skeleton } from "../components/skeleton/skeleton";
import DemoPageRenderer from "./demo-page-renderer";
import useMedia from "./useMedia";

function card() {
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
      setWidth(750);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <DemoPageRenderer
        tabTitles={["card", "properties"]}
        demoWidget={
          <div className="rc-demo-widgets">
            <div
              style={{ width: `${width}px`, marginTop: "2rem" }}
              className="rc-demo-widget"
            >
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
            <div
              style={{ margin: "1rem 0", width: `${width}px` }}
              className="rc-demo-widget"
            >
              <Card alignHeader="left" minHeight={400} shadow={false}>
                <Image src="https://mmc.tirto.id/image/otf/500x0/2016/07/26/TIRTO-20140522_batman_warner-bros_ratio-16x9.jpg" />
              </Card>
            </div>
          </div>
        }
        data={[
          {
            name: "header",
            description: "Renders the passed element inside the header section",
            default: "",
            optional: "Yes",
          },
          {
            name: "footer",
            description: "Renders the passed element inside the footer section",
            default: "",
            optional: "Yes",
          },
          {
            name: "minHeight",
            description: "Minimum height of the card",
            default: "200",
            optional: "Yes",
          },
          {
            name: "maxHeight",
            description: "Maximum height of the card",
            default: "400",
            optional: "Yes",
          },
          {
            name: "alignHeader",
            description:
              "aligns the header element to 'left' | 'right' | 'center",
            default: "left",
            optional: "Yes",
          },
          {
            name: "alignHeader",
            description:
              "aligns the footer element to 'left' | 'right' | 'center",
            default: "left",
            optional: "Yes",
          },
          {
            name: "shadow",
            description: "Enables the shadow for the card",
            default: "False",
            optional: "Yes",
          },
        ]}
      ></DemoPageRenderer>
    )
  );
}

export default card;
