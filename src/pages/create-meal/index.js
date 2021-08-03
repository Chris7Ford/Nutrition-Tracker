import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewMealMaker from "../../components/new-meal-maker/index";
//import { MemoryRouter, Switch, Route } from 'react-router-dom';
//import { LinkContainer } from 'react-router-bootstrap';

class NewMealPage extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <>
        <Row className="mb-2">
          <Col>
            <h1 className="center-text">
              Create a new meal
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <NewMealMaker />
          </Col>
        </Row>
      </>
    );
  }
}

export default NewMealPage;
