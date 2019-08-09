import React from "react";

const NumberedList = props => {
  return <ol {...props.attributes}>{props.children}</ol>;
};

export default NumberedList;
