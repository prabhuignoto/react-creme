import React, { useEffect } from "react";
import { List } from "../../components/list/list";
import useMedia from "../useMedia";

function Widgets() {
  const media = useMedia();
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    if (!media) {
      return;
    }
    if (media.isTablet) {
      setWidth(400);
    } else if (media.isMobile) {
      setWidth(300);
    } else if (media.isBigScreen) {
      setWidth(650);
    } else if (media.isDesktop) {
      setWidth(650);
    }
  }, [media]);

  return (
    width > 0 && (
      <div
        style={{ minHeight: "400px", width: `${width}px`, margin: "0 auto" }}
      >
        <br />
        <List
          enableSearch
          maxHeight={400}
          virtualized
          onSelection={(val) => console.log(val)}
          options={Array.from({ length: 500 }, (_, i) => ({
            name: `Item ${i}`,
            value: `Item ${i}`,
          }))}
        />
        <br />
        <List
          onSelection={(val) => console.log(val)}
          allowMultiSelection
          options={[
            {
              name: "india is a huge country with a enormous land and rivers india is a huge country with a enormous land and rivers",
              value: "india",
            },
            { name: "usa", value: "usa" },
            { name: "uk", value: "uk" },
            { name: "France", value: "france" },
            { name: "germany", value: "germany", disabled: true },
          ]}
        />
      </div>
    )
  );
}

export default Widgets;
