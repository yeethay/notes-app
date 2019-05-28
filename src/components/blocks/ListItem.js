import React from "react";

const ListItem = props => <li {...props.attributes}>{props.children}</li>;

export default ListItem;
