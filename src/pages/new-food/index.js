import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UPCModal from "./upc-modal/index";
//import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import { LinkContainer } from 'react-router-bootstrap';

class NewFoodPage extends React.Component {
  constructor() {
    super();
    this.foodNameInput = null;
    this.caloriesInput = null;
    this.proteinInput = null;
    this.carbsInput = null;
    this.fatInput = null;
    this.numServingsInput = null;
    this.servingSizeInput = null;
    this.form = null;
    this.state = {
      "showModal": false,
    };
  }

  createFood = (e) => {
    e.preventDefault();
    let product = {
      "title": this.foodNameInput.getAttribute("value"),
      "calories": this.caloriesInput.getAttribute("value"),
      "protein": this.proteinInput.getAttribute("value"),
      "carbs": this.carbsInput.getAttribute("value"),
      "fat": this.fatInput.getAttribute("value"),
      "numServings": this.numServingsInput.getAttribute("value"),
      "servingSize": this.servingSizeInput.getAttribute("value"),
      "upc": "",
    };
    let upc = this.form.getAttribute("upc");
    if (upc) {
      product.upc = upc;
    }
    console.log(product);
    //Make a fetch request to save the product
  }

  openLookupModal = (e) => {
    e.preventDefault();
    this.setShowModal(true);
  }

  setShowModal = (state) => {
    this.setState({
      "showModal": state
    });
  }

  populateScannedProduct = (product) => {
    this.foodNameInput.setAttribute("value", product["title"]);
    this.caloriesInput.setAttribute("value", product["calories"]);
    this.proteinInput.setAttribute("value", product["protein"]);
    this.carbsInput.setAttribute("value", product["carbs"]);
    this.fatInput.setAttribute("value", product["fat"]);
    this.numServingsInput.setAttribute("value", product["numServings"]);
    this.servingSizeInput.setAttribute("value", product["servingSize"]);
    if (product.hasOwnProperty("upc")) {
      this.form.setAttribute("upc", product.upc);
    }
    this.setShowModal(false);
  }

  componentDidMount() {
    this.foodNameInput = document.querySelector("#newFoodName");
    this.caloriesInput = document.querySelector("#newFoodCalories");
    this.proteinInput = document.querySelector("#newFoodProtein");
    this.carbsInput = document.querySelector("#newFoodCarbs");
    this.fatInput = document.querySelector("#newFoodFat");
    this.numServingsInput = document.querySelector("#newFoodServings");
    this.servingSizeInput = document.querySelector("#newFoodServingSize");
    this.form = document.querySelector("#new-food-form");
  }

  render() {
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
            <Form id="new-food-form">
              <Form.Group className="mb-3" controlId="newFoodName">
                <Form.Label>Food Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodCalories">
                <Form.Label>Calories per serving</Form.Label>
                <Form.Control type="number" placeholder="Calories" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodProtein">
                <Form.Label>Protein (g) per serving</Form.Label>
                <Form.Control type="number" placeholder="Protein" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodCarbs">
                <Form.Label>Carbs (g) per serving</Form.Label>
                <Form.Control type="number" placeholder="Carbs" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodFat">
                <Form.Label>Fat (g) per serving</Form.Label>
                <Form.Control type="number" placeholder="Fat" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodServings">
                <Form.Label>Number of servings per container</Form.Label>
                <Form.Control type="number" placeholder="Servings/Container" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newFoodServingSize">
                <Form.Label>Serving Size/Unit</Form.Label>
                <Form.Control type="text" placeholder="Serving Size" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="createNewFood">
                <Button variant="primary" type="submit" onClick={ this.createFood }>
                  Create
                </Button>
                <Button className="ml-3" variant="secondary" type="submit" onClick={ this.openLookupModal }>
                  Or Lookup By UPC
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <UPCModal
          showModal={this.state.showModal}
          setShowModal={this.setShowModal}
          populateScannedProduct={this.populateScannedProduct}
        />
      </>
    );
  }
}

export default NewFoodPage;
