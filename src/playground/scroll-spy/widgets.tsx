import React, { useEffect } from "react";
import { ScrollSpy } from "../../components";
import useMedia from "./../useMedia";

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
      setWidth(500);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div className="rc-demo-widgets">
        <div
          className="rc-demo-widget"
          style={{ width: `${width}px`, height: "600px" }}
        >
          <ScrollSpy links={["one", "two", "three", "four", "five", "six"]}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              luctus neque ante, vel viverra velit dignissim sed. Vivamus
              blandit fringilla ligula, sit amet scelerisque risus eleifend sed.
              Nam laoreet, sem sed tristique dapibus, risus magna molestie orci,
              eget porta lectus elit vitae sapien. Integer non tempus turpis, at
              pharetra nibh. Nam vestibulum bibendum neque ac mollis. Nam sit
              amet erat quis turpis egestas sollicitudin. Mauris tincidunt
              tristique erat et semper. Morbi sit amet ligula eu nibh elementum
              ultrices. Cras tincidunt metus tortor, sit amet elementum diam
              volutpat vitae. Nullam finibus quam vitae mattis imperdiet. Cras
              vitae augue fringilla, malesuada neque sed, convallis velit.
              Quisque efficitur venenatis diam. Praesent id luctus arcu.
              Phasellus ac velit quis lacus condimentum tristique et eget
              ligula. erat quis turpis egestas sollicitudin. Mauris tincidunt
              tristique erat et semper. Morbi sit amet ligula eu nibh elementum
              ultrices. Cras tincidunt metus tortor, sit amet elementum diam
              volutpat vitae. Nullam finibus quam vitae mattis imperdiet. Cras
              vitae augue fringilla, malesuada neque sed, convallis velit.
              Quisque efficitur venenatis diam. Praesent id luctus arcu.
              Phasellus ac velit quis lacus condimentum tristique et eget
              ligula.
            </p>
            <p>
              Nulla congue efficitur massa, at tempor enim mattis vitae.
              Suspendisse dictum tincidunt felis, vel convallis velit volutpat
              quis. Suspendisse auctor nibh ac purus commodo lacinia. Etiam
              ornare sodales risus, quis vulputate nisl dapibus sed. Quisque
              gravida viverra sagittis. Fusce hendrerit ante sed dictum commodo.
              Mauris a nulla suscipit, dapibus nulla vitae, semper neque. Nullam
              mattis et odio vel tincidunt. Donec bibendum purus orci, sed
              porttitor quam porta in. sodales risus, quis vulputate nisl
              dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit
              ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
              vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec
              bibendum purus orci, sed porttitor quam porta in.
            </p>
            <p>
              Nulla congue efficitur massa, at tempor enim mattis vitae.
              Suspendisse dictum tincidunt felis, vel convallis velit volutpat
              quis. Suspendisse auctor nibh ac purus commodo lacinia. Etiam
              ornare sodales risus, quis vulputate nisl dapibus sed. Quisque
              gravida viverra sagittis. Fusce hendrerit ante sed dictum commodo.
              Mauris a nulla suscipit, dapibus nulla vitae, semper neque. Nullam
              mattis et odio vel tincidunt. Donec bibendum purus orci, sed
              porttitor quam porta in. sodales risus, quis vulputate nisl
              dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit
              ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
              vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec
              bibendum purus orci, sed porttitor quam porta in.
            </p>
            <p>
              Nulla congue efficitur massa, at tempor enim mattis vitae.
              Suspendisse dictum tincidunt felis, vel convallis velit volutpat
              quis. Suspendisse auctor nibh ac purus commodo lacinia. Etiam
              ornare sodales risus, quis vulputate nisl dapibus sed. Quisque
              gravida viverra sagittis. Fusce hendrerit ante sed dictum commodo.
              Mauris a nulla suscipit, dapibus nulla vitae, semper neque. Nullam
              mattis et odio vel tincidunt. Donec bibendum purus orci, sed
              porttitor quam porta in. sodales risus, quis vulputate nisl
              dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit
              ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
              vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec
              bibendum purus orci, sed porttitor quam porta in.
            </p>
            <p>
              Nulla congue efficitur massa, at tempor enim mattis vitae.
              Suspendisse dictum tincidunt felis, vel convallis velit volutpat
              quis. Suspendisse auctor nibh ac purus commodo lacinia. Etiam
              ornare sodales risus, quis vulputate nisl dapibus sed. Quisque
              gravida viverra sagittis. Fusce hendrerit ante sed dictum commodo.
              Mauris a nulla suscipit, dapibus nulla vitae, semper neque. Nullam
              mattis et odio vel tincidunt. Donec bibendum purus orci, sed
              porttitor quam porta in. sodales risus, quis vulputate nisl
              dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit
              ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
              vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec
              bibendum purus orci, sed porttitor quam porta in.
            </p>
            <p>
              Nulla congue efficitur massa, at tempor enim mattis vitae.
              Suspendisse dictum tincidunt felis, vel convallis velit volutpat
              quis. Suspendisse auctor nibh ac purus commodo lacinia. Etiam
              ornare sodales risus, quis vulputate nisl dapibus sed. Quisque
              gravida viverra sagittis. Fusce hendrerit ante sed dictum commodo.
              Mauris a nulla suscipit, dapibus nulla vitae, semper neque. Nullam
              mattis et odio vel tincidunt. Donec bibendum purus orci, sed
              porttitor quam porta in. sodales risus, quis vulputate nisl
              dapibus sed. Quisque gravida viverra sagittis. Fusce hendrerit
              ante sed dictum commodo. Mauris a nulla suscipit, dapibus nulla
              vitae, semper neque. Nullam mattis et odio vel tincidunt. Donec
              bibendum purus orci, sed porttitor quam porta in.
            </p>
          </ScrollSpy>
        </div>
      </div>
    )
  );
}

export default Widgets;
