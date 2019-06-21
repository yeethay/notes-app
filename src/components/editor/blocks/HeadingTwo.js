import React from "react";

const HeadingTwo = props => {
  return <h2 {...props.attributes}>{props.children}</h2>;
};

export default HeadingTwo;
