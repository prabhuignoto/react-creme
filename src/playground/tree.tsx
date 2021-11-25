import React from "react";
import { Tree } from "../components";
import DemoPageRenderer from "./demo-page-renderer";

function tree() {
  return (
    <DemoPageRenderer
      data={[]}
      tabTitles={["Tree", "properties"]}
      demoWidget={
        <div className="rc-demo-widgets">
          <div
            style={{ width: "300px", height: "500px" }}
            className="rc-demo-widget"
          >
            <Tree
              height={400}
              allowSelection
              items={[
                {
                  name: "one",
                  child: [
                    {
                      name: "two is a biggest number you will ever come across",
                    },
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
        </div>
      }
    ></DemoPageRenderer>
  );
}

export default tree;
