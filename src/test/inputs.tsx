import React, { CSSProperties } from "react";
import { CheckBox, Input, RadioGroup, Switch } from "../components";
import { Radio } from "../components/radio/radio";
import { ChevronRightIcon } from "../icons";

const style: CSSProperties = {
  width: "100px",
  margin: "1rem 0",
};

function inputs() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={style}>
        <Radio label="check" />
      </div>
      <div style={style}>
        <RadioGroup
          items={[
            { label: "prabhu", disabled: true },
            { label: "tester" },
            { label: "prabhu", disabled: false },
            { label: "tester" },
          ]}
          onSelected={(val) => console.log(val)}
        />
      </div>
      <div style={{ width: "200px" }}>
        <Input enableClear>
          <ChevronRightIcon />
        </Input>
      </div>
      <div style={style}>
        <CheckBox
          label="select"
          onChange={(ele) => console.log(ele)}
          isChecked
        />
      </div>
      <div style={{ width: "140px" }}>
        <Switch label="Are you adult" />
      </div>
      <div style={style}>
        <Switch label="setting" disabled />
      </div>
    </div>
  );
}

export default inputs;
