import React from "react";
import { Menu } from "../components";

function menu() {
  return (
    <div>
      <Menu items={[{ name: "prabhu" }, { name: "testet" }]}>
        <span>test</span>
      </Menu>
    </div>
  );
}

export default menu;
