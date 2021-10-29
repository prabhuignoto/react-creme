import React, { CSSProperties } from "react";
import { CheckBox, Input, RadioGroup, Switch } from "../components";
import { Radio } from "../components/radio/radio";
import { ChevronRightIcon } from "../icons";

const wrap: CSSProperties = {
  margin: "0.5rem 0",
};

const style: CSSProperties = {
  minWidth: "50px",
  margin: "1rem 0",
  // ...wrap,
};

function inputs() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={style}>
        <Radio label="check" />
      </div>
      <div style={style}>
        <Radio label="check1" size="md" />
      </div>
      <div style={style}>
        <Radio label="check2" size="lg" />
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
      <div style={{ width: "200px", ...wrap }}>
        <Input enableClear state="default">
          <ChevronRightIcon />
        </Input>
      </div>
      <div style={style}>
        <CheckBox label="select" onChange={(ele) => console.log(ele)} />
      </div>
      <div>
        <CheckBox
          label="select the value its too lg"
          onChange={(ele) => console.log(ele)}
          size="md"
        />
      </div>
      <div style={style}>
        <CheckBox
          label="select"
          onChange={(ele) => console.log(ele)}
          isChecked
          size="lg"
        />
      </div>
      <div style={{ width: "100px", ...wrap }}>
        <Switch label="Settings" />
      </div>
      <div style={{ width: "180px", ...wrap }}>
        <Switch label="Are you authorized" size="md" />
      </div>
      <div style={{ width: "200px", ...wrap }}>
        <Switch label="Are you authorized" size="lg" />
      </div>
      <div style={{ width: "100px", ...wrap }}>
        <Switch label="setting" disabled />
      </div>
    </div>
  );
}

export default inputs;
