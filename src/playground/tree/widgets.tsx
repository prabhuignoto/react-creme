import React from "react";
import { BlockQuote, Section, Tree } from "../../components";
import { DemoWidget } from "../common/demo-widget";

const data = [
  {
    name: "one",
    child: [
      {
        name: "two",
      },
      {
        name: "three",
        child: [
          {
            name: "This is a long text that should be truncated",
          },
          { name: "four" },
          { name: "five" },
          { name: "six" },
          { name: "seven" },
        ],
      },
    ],
  },
  {
    name: "sixteen",
    disabled: true,
  },
  { name: "twenty", child: [{ name: "twenty one" }] },
  { name: "twenty two" },
];

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <DemoWidget>
          <div style={{ width: "300px" }}>
            <Tree
              height={400}
              items={data}
              onChange={(selected) => console.log(selected, name)}
            />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Selection Mode">
        <BlockQuote>
          In selection mode, individual nodes with its children can be selected
          through the checkbox
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "300px" }}>
            <Tree height={400} allowSelection items={data} />
          </div>
        </DemoWidget>
      </Section>
      <Section title="Custom Icon">
        <BlockQuote>
          Use a custom icon for the expand and collapse actions.
        </BlockQuote>
        <DemoWidget>
          <div style={{ width: "300px" }}>
            <Tree height={400} items={data} iconType="plus" />
          </div>
        </DemoWidget>
      </Section>
    </div>
  );
}

export default Widgets;
