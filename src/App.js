import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import NavBar from './components/navbar/NavBar';
import Navigator from './components/navigator/Navigator';
import TextEditor from './components/editor/TextEditor';

function App() {
  return (
    <Fragment>
      <div className="main">
        <NavBar />
        <Row>
          <Col sm={3} md={3} lg={3}>
            <div className="navigator">
              <Navigator />
            </div>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <div className="text-editor">
              <TextEditor />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default App;
