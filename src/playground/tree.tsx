import React from "react";
import { Tree } from "../components";

function tree() {
  return (
    <div style={{ width: "300px", height: "500px" }}>
      <Tree
        height={400}
        allowSelection
        items={[
          {
            name: "one",
            child: [
              { name: "two" },
              {
                name: "three",
                child: [
                  { name: "pop" },
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
                        child: [
                          { name: "pop" },
                          { name: "pop" },
                          { name: "pop" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "five",
            child: [{ name: "pop" }, { name: "pop" }, { name: "pop" }],
          },
          { name: "six", child: [{ name: "prabhu" }] },
          { name: "seven" },
        ]}
      />
    </div>
  );
}

export default tree;
