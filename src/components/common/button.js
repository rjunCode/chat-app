import React from "react";
import classnames from "classnames";

const Button = ({ view, type, label }) => {
  const classes = classnames("button", {
    primary: view === "primary",
    secondary: view === "secondary"
  });

  return (
    <button className={classes} type={type}>
      {label}
    </button>
  );
};

export default Button;
