import { nanoid } from "nanoid";
import React, { useRef } from "react";
import { ChevronRightIcon } from "../../icons";
import { BreadCrumbModel } from "./breadcrumb-model";
import "./breadcrumb.scss";

const BreadCrumb: React.FunctionComponent<BreadCrumbModel> = ({
  children,
  onClick,
}) => {
  const items = useRef(
    Array.isArray(children)
      ? children.map(() => ({
          id: nanoid(),
        }))
      : []
  );
  return (
    <ul className="bread-crumbs-wrapper">
      {items.current.map((item, index) => (
        <li className="bread-crumb" key={item.id} onClick={onClick}>
          <span className="bread-crumb-node">
            {(children as React.ReactNode[])[index]}
          </span>
          {index < items.current.length - 1 ? (
            <span className="bread-crumb-icon">
              <ChevronRightIcon />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export { BreadCrumb };
