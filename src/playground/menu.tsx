import React from "react";
import { Button, Menu } from "../components";
import { CheckCircleIcon } from "../icons";

function menu() {
  return (
    <>
      <Menu
        items={[
          { name: "prabhu" },
          { name: "tester" },
          { name: "tester 2" },
          { name: "tester 3" },
        ]}
      >
        <Button label="Open Menu" />
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
      >
        <Button type="icon">
          <CheckCircleIcon />
        </Button>
      </Menu>
    </>
  );
}

export default menu;
