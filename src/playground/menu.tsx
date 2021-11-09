import React from "react";
import { Button, Menu } from "../components";
import { CheckCircleIcon } from "../icons";

function menu() {
  return (
    <>
      <Menu
        position="right"
        items={[
          { name: "prabhu" },
          { name: "tester", disabled: true },
          { name: "tester 2" },
          { name: "tester 3" },
        ]}
        focusable={false}
      >
        <Button label="Menu"></Button>
      </Menu>
      <br></br>
      <br></br>
      <Menu
        items={[
          { name: "prabhu" },
          { name: "tester" },
          { name: "tester 2" },
          { name: "tester 3" },
        ]}
        position="center"
        focusable={false}
      >
        <Button type="icon" size="lg">
          <CheckCircleIcon />
        </Button>
      </Menu>
    </>
  );
}

export default menu;
