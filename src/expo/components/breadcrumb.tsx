import React from "react";
import { BreadCrumb, Link } from "../../components";
function breadcrumb() {
  return (
    <div>
      <div>
        <BreadCrumb icon="arrow">
          <Link href="http://www.google.com">one</Link>
          <Link href="http://www.google.com">two</Link>
          <Link href="http://www.google.com">three</Link>
        </BreadCrumb>
      </div>
      <div>
        <BreadCrumb size="md">
          <Link href="http://www.google.com">one</Link>
          <Link href="http://www.google.com">two</Link>
          <Link href="http://www.google.com">three</Link>
        </BreadCrumb>
      </div>
      <div>
        <BreadCrumb icon="slash" size="lg">
          <Link href="http://www.google.com">one</Link>
          <Link href="http://www.google.com">two</Link>
          <Link href="http://www.google.com">three</Link>
        </BreadCrumb>
      </div>
    </div>
  );
}

export default breadcrumb;
