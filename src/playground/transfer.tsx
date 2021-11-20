import React from "react";
import { Transfer } from "../components";

function transfer() {
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Transfer
        list1={["one", "two", "five", "six"]}
        list2={["three", "four", "seven", "eight"]}
        onChange={(val, val2) => console.log(val, val2)}
        enableSearch
      />
    </div>
  );
}

export default transfer;
