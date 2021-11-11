import React from "react";
import { MenuButton } from "../components/menu-button/menu-button";

function menuButton() {
  return (
    <div>
      <MenuButton
        items={["save", "cancel", "delete"]}
        label="Choose an option"
        position="right"
        width={150}
      />
    </div>
  );
}

export default menuButton;
