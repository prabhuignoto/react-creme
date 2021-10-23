import React from "react";
import { BreadCrumb, Link } from "../components";

function breadcrumb() {
  return (
    <div>
      <BreadCrumb>
        <Link href="http://www.google.com">one</Link>
        <Link href="http://www.google.com">two</Link>
        <Link href="http://www.google.com">three</Link>
      </BreadCrumb>
    </div>
  );
}

export default breadcrumb;
