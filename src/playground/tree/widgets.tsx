import React from "react";
import { BlockQuote, Section, Tree } from "../../components";

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
          {
            name: "eight",
            child: [
              { name: "nine" },
              { name: "ten" },
              {
                name: "eleven",
                child: [
                  { name: "twelve" },
                  { name: "thirteen" },
                  { name: "fourteen" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "sixteen",
    disabled: true,
    child: [{ name: "seventeen" }, { name: "eighteen" }, { name: "nineteen" }],
  },
  { name: "twenty", child: [{ name: "twenty one" }] },
  { name: "twenty two" },
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
        <BlockQuote>
          In selection mode, individual nodes with its children can be selected
          through the checkbox
        </BlockQuote>
        <div style={{ width: "300px" }} className="rc-demo-widget">
          <Tree height={400} allowSelection items={data} />
        </div>
      </Section>
    </div>
  );
}

export default Widgets;
