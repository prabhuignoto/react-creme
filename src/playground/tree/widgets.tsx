import React from "react";
import { Section, Tree } from "../../components";

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
            name: "three to the three to the four, three to the three to the four",
          },
          { name: "pop" },
          { name: "pop" },
          { name: "pop" },
          { name: "pop" },
          {
            name: "pop",
            child: [
              { name: "pop" },
              { name: "pop" },
              {
                name: "pop",
                disabled: true,
                child: [{ name: "pop" }, { name: "pop" }, { name: "pop" }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "five",
    disabled: true,
    child: [{ name: "pop" }, { name: "pop" }, { name: "pop" }],
  },
  { name: "six", child: [{ name: "prabhu" }] },
  { name: "seven" },
];

function Widgets() {
  return (
    <div className="rc-demo-widgets">
      <Section title="Default render">
        <div style={{ width: "300px" }} className="rc-demo-widget">
          <Tree
            height={400}
            items={data}
            onChange={(selected) => console.log(selected, name)}
          />
        </div>
      </Section>
      <Section title="Selection Mode">
        <div style={{ width: "300px" }} className="rc-demo-widget">
          <Tree height={400} allowSelection items={data} />
        </div>
      </Section>
    </div>
  );
}

export default Widgets;
