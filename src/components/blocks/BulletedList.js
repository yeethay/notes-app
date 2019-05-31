import React from "react";

const BulletedList = props => <ul {...props.attributes}>{props.children}</ul>;

export default BulletedList;
