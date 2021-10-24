import React, { useState } from "react";
import { RadioGroup, Tooltip } from "../components";
import { ToolTipPosition } from "../components/tooltip/tooltip-model";

function tooltip() {
  const [position, setPosition] = useState<ToolTipPosition>("top center");

  return (
    <div
      style={{
        height: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tooltip message="test tooltip" position={position} width={100} isStatic>
        <div
          style={{
            width: "450px",
            border: "1px solid red",
            padding: "1rem",
          }}
        >
          Fusce eu magna nec arcu ultrices ultricies in nec ex. Aenean molestie
          velit quis volutpat vestibulum. Donec facilisis est ac condimentum
          aliquet. Nam semper dui eget sagittis sagittis. Aenean sodales
          vulputate magna vitae sodales. Phasellus dignissim, diam id
          ullamcorper imperdiet, lacus nibh aliquam diam, at pulvinar neque
          magna sed lectus. Vestibulum consequat augue ac urna porta, eu aliquet
          mi molestie. Donec lacinia elit id euismod vehicula. In tempor
          convallis mauris. Aliquam scelerisque massa et molestie efficitur.
          Pellentesque viverra rhoncus accumsan. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae;
        </div>
      </Tooltip>
      <div style={{ marginTop: "5rem" }}>
        <RadioGroup
          onSelected={(val) => setPosition(val as ToolTipPosition)}
          items={[
            { label: "top center", value: "top center", checked: true },
            { label: "top left", value: "top left" },
            { label: "top right", value: "top right" },
            { label: "bottom center", value: "bottom center" },
            { label: "bottom left", value: "bottom left" },
            { label: "bottom right", value: "bottom right" },
            { label: "left center", value: "left center" },
            { label: "right center", value: "right center" },
          ]}
        ></RadioGroup>
      </div>
    </div>
  );
}

export default tooltip;
