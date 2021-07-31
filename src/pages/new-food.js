import { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
//import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import { LinkContainer } from 'react-router-bootstrap';

const createFood = (e) => {
  e.preventDefault();
  console.log("Create food");
}

const openLookupModal = (e, setShow) => {
  e.preventDefault();
  setShow(true)
}

const NewFoodPage = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row className="mb-2">
        <Col>
          <h1 className="center-text">
            Add a new food
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="newFoodName">
              <Form.Label>Food Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newFoodCalories">
              <Form.Label>Calories per serving</Form.Label>
              <Form.Control type="number" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newFoodProtein">
              <Form.Label>Protein (g) per serving</Form.Label>
              <Form.Control type="number" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newFoodCarbs">
              <Form.Label>Carbs (g) per serving</Form.Label>
              <Form.Control type="number" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newFoodFat">
              <Form.Label>Fat (g) per serving</Form.Label>
              <Form.Control type="number" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newFoodServings">
              <Form.Label>Number of servings per container</Form.Label>
              <Form.Control type="number" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createNewFood">
              <Button variant="primary" type="submit" onClick={ createFood }>
                Create
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="LookupFood">
              <Button variant="secondary" type="submit" onClick={ (e) => openLookupModal(e, setShow) }>
                Or Lookup By UPC
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lookup Food by UPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="newFoodName">
              <Form.Label>UPC Code</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Lookup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NewFoodPage;
