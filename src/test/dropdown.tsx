import React from "react";
import { Dropdown } from "../components";

function dropdown() {
  return (
    <div>
      <Dropdown
        onSelected={(val) => console.log(val)}
        allowMultipleSelection
        options={[
          { name: "germany", value: "germany", disabled: true },
          { name: "pakistan", value: "pakistan" },
          { name: "india", value: "india" },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk" },
          { name: "srilanka", value: "srilanka" },
        ]}
      />
      <br></br>
      <br></br>
      <Dropdown
        onSelected={(val) => console.log(val)}
        options={[
          { name: "germany", value: "germany", disabled: true },
          { name: "pakistan", value: "pakistan" },
          { name: "india", value: "india" },
          { name: "usa", value: "usa" },
          { name: "uk", value: "uk" },
          { name: "srilanka", value: "srilanka" },
        ]}
      />
    </div>
  );
}

export default dropdown;
