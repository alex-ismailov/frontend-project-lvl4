import React from 'react';
import { Row, Col, Button, Nav } from 'react-bootstrap';

export default () => {
  return (
    <Row className="h-100 pb-3">
      <Col xs={3} className="border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="ml-auto p-0 btn btn-link">+</button>
        </div>
        <Nav className="flex-column nav-pills nav-fill">
          {/* Надо взять список каналов из gon и вывести через map */}
          <Nav.Item>
            <button type="button" className="nav-link btn-block mb-2 text-left btn btn-primary">
              general
            </button>
          </Nav.Item>
        </Nav>
      </Col>
      <Col className="h-100">
        Here is Chat and Input
      </Col>
    </Row>
  );
};
