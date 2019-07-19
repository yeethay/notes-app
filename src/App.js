import React, { Fragment } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextEditor from "./components/editor/TextEditor";

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
