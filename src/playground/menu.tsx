import React from "react";
import { Button, Menu } from "../components";

function menu() {
  return (
    <Menu items={[{ name: "prabhu" }, { name: "testet" }]}>
      <Button label="Open Menu" />
    </Menu>
  );
}

export default menu;
