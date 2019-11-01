import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import './App.css';
import NavBar from '../NavBar';
import Navigator from '../Navigator';
import NoteEditor from '../NoteEditor';

const App = () => (
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
          <div className="note-editor">
            <NoteEditor />
          </div>
        </Col>
      </Row>
    </div>
  </Fragment>
);

export default App;
