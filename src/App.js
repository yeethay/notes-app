import React, { Fragment } from "react";
import "./App.css";
import { TextEditor } from "./components";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Fragment>
      <SignIn />
      <div className="rich-text-editor">
        <TextEditor />
      </div>
    </Fragment>
  );
}

export default App;
