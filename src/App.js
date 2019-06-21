import React, { Fragment } from "react";
import "./App.css";
import { TextEditor } from "./components";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <div className="rich-text-editor">
        <TextEditor />
      </div>
    </Fragment>
  );
}

export default App;
