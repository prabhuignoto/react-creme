import React from "react";
import { Dropdown } from "../components";

function dropdown() {
  return (
    <div style={{ width: "300px" }}>
      <Dropdown
        onSelected={(val) => console.log(val)}
        placeholder="choose a country"
        allowMultiSelection
        enableSearch
        options={[
          { name: "germany", value: "germany", disabled: true },
          { name: "india", value: "india" },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk", selected: true },
          { name: "srilanka", value: "srilanka", selected: true },
        ]}
      />
      <br></br>
      <br></br>
      <Dropdown
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
  );
}

export default dropdown;
