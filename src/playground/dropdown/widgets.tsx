import React from "react";
import { Dropdown } from "../../components";

function Widgets() {
  return (
    <div style={{ width: "450px", margin: "0 auto" }}>
      <div className="rc-demo-widget">
        <Dropdown
          onSelected={(val) => console.log(val)}
          placeholder="choose a country"
          allowMultiSelection
          maxMenuHeight={400}
          virtualize
          options={[
            { name: "germany", value: "germany", disabled: true },
            { name: "india", value: "india" },
            { name: "usa", value: "usa" },
            { name: "uk", value: "uk", selected: true },
            { name: "srilanka", value: "srilanka", selected: false },
            { name: "brazil", value: "brazil", selected: false },
            { name: "france", value: "france", selected: false },
            { name: "japan", value: "japan", selected: true },
            { name: "singapore", value: "singapore", selected: false },
            { name: "brazil", value: "brazil", selected: false },
            { name: "venezuala", value: "venezuala", selected: false },
            {
              name: "united kingdom",
              value: "united kingdom",
              selected: true,
            },
            { name: "australia", value: "australia", selected: false },
          ]}
        />
      </div>
      <div className="rc-demo-widget">
        <Dropdown
          maxMenuHeight={400}
          placeholder="choose another country"
          onSelected={(val) => console.log(val)}
          options={[
            { name: "germany", value: "germany", disabled: true },
            { name: "india", value: "india" },
            { name: "usa", value: "usa", selected: true },
            { name: "uk", value: "uk" },
            { name: "srilanka", value: "srilanka" },
          ]}
        />
      </div>
    </div>
  );
}

export default Widgets;
