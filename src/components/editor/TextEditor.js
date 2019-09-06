import React, { Fragment } from "react";
import Toolbar from "./toolbar/Toolbar";
import Title from "./Title";
import Slate from './Slate';
import "./TextEditor.css";

const TextEditor = () => (
  <Fragment>
    <Toolbar />
    <Title />
    <Slate />
  </Fragment>
);

export default TextEditor;
