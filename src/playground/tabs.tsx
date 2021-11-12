import React from "react";
import { Tabs } from "../components/tabs/tabs";

function tabs() {
  return (
    <div style={{ width: "500px" }}>
      <Tabs labels={["one", "two", "three"]}>
        <span>one</span>
        <span>two</span>
        <span>three</span>
      </Tabs>
    </div>
  );
}

export default tabs;
