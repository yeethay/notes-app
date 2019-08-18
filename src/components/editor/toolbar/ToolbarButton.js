import React from "react";
import Icon from "react-icons-kit";
import classNames from "classnames";

const ToolbarButton = props => {
  let classes = classNames("tooltip-icon-button", {
    active: props.active
  });
  return (
    <button className={classes} onPointerDown={props.onPointerDown}>
      <Icon icon={props.icon} />
    </button>
  );
};

export default ToolbarButton;
