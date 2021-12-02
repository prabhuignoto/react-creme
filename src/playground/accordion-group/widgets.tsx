import React, { useEffect } from "react";
import { AccordionGroup, Image, Section } from "../../components";
import useMedia from "../useMedia";

function Widgets() {
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
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(450);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets" style={{ minHeight: "1200px" }}>
        <Section title="Default Render">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <AccordionGroup titles={["one", "two"]}>
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia. Nam
                  in maximus quam. Pellentesque dignissim risus sed tellus
                  fringilla vehicula. Quisque dapibus ex in eros iaculis
                  ullamcorper. Nulla cursus tortor vitae rutrum tincidunt. Nunc
                  sit amet lectus ac arcu suscipit bibendum. Nam eu aliquam
                  dolor. Nam in gravida ipsum. In et urna laoreet, placerat erat
                  in, tempor lacus.
                </p>
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                  }}
                >
                  <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
                </div>
              </AccordionGroup>
            </div>
          </div>
        </Section>
        <Section title="Initial state">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two"]}
                autoClose={false}
                border={false}
                initialState="open"
              >
                <p>
                  Nam faucibus ac magna ac hendrerit. Aenean pulvinar tempus
                  hendrerit. Proin vitae posuere lectus. Maecenas convallis enim
                  sit amet sem gravida, eu cursus lacus placerat. Nunc a
                  venenatis quam. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. In vel ipsum augue. Etiam blandit, erat a
                  lacinia dapibus, risus ex molestie erat, eget sagittis est
                  turpis id lorem. Nunc bibendum pretium velit eget ornare.
                  Donec sollicitudin odio nec odio posuere egestas. Pellentesque
                  eu rhoncus massa. Etiam id urna lacus. Integer ante diam,
                  volutpat non condimentum a, lobortis non eros.
                </p>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <Image src="https://images.unsplash.com/photo-1635449586099-3ecb7ef8374d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"></Image>
                </div>
              </AccordionGroup>
            </div>
          </div>
        </Section>
        <Section title="Autoclosing Sections">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two", "three"]}
                autoClose
                border={false}
              >
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
              </AccordionGroup>
            </div>
          </div>
        </Section>
        <Section title="Custom Icons and Alignment">
          <div className="rc-demo-widget">
            <div style={{ width: `${width}px` }}>
              <AccordionGroup
                titles={["one", "two", "three"]}
                border={false}
                alignIconRight
                iconType="plus"
              >
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
                <p>
                  Aenean aliquam dignissim pretium. Ut nulla nunc, euismod sit
                  amet justo vel, convallis volutpat neque. Morbi semper odio
                  sed diam tristique, nec tempor neque tempus. Praesent quis
                  ultrices odio. Nulla vestibulum nulla sed massa molestie, quis
                  vulputate risus semper. Phasellus elementum, metus in iaculis
                  sollicitudin, risus elit pulvinar neque, eget pulvinar odio
                  libero eu mi. Vivamus id leo facilisis, tincidunt lacus
                  semper, condimentum est. Nam euismod non eros a lacinia.
                </p>
              </AccordionGroup>
            </div>
          </div>
        </Section>
      </div>
    )
  );
}

export default Widgets;
