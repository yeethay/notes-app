import React from "react";

const HeadingOne = props => {
  return <h1 {...props.attributes}>{props.children}</h1>;
};

export default HeadingOne;
