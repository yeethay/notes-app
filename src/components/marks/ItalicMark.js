import React from "react";

const ItalicMark = props => (
  <em property="italic" {...props.attributes}>
    {props.children}
  </em>
);

export default ItalicMark;
