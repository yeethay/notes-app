import React from "react";

const BlockQuote = props => {
  return <blockquote {...props.attributes}>{props.children}</blockquote>;
};

export default BlockQuote;
