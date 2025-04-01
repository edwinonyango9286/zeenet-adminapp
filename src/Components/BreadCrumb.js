import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ items }) => {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadCrumbItems">
          <Link className="breadCrumbItems" to={item.path}>
            {item.label}
          </Link>
          {index < items.length - 1 && "  /  "}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumb;
