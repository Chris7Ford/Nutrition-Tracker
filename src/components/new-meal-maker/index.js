import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Typeahead } from "react-bootstrap-typeahead";
import { products } from "../../testing/products";

class NewMealMaker extends React.Component {
  constructor() {
    super();
    this.state = {
      mealFoods: [],
    };
    this.totals = {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
    }
    this.addFoodRef = React.createRef();
  }

  setSingleSelections = (e) => {
    if (e.length && this.state.mealFoods.some(food => food.id === e[0].id) === false) {
      e[0].qty = 1;
      this.setState({
        mealFoods: [...this.state.mealFoods, e[0]],
      });
    }
    this.addFoodRef.current.clear();
  }

  updateFoodQuantity = (e) => {
    var foodIndex = this.state.mealFoods.findIndex(food => food.id == e.target.dataset.foodId);
    var foodsCopy = JSON.parse(JSON.stringify(this.state.mealFoods));
    foodsCopy[foodIndex].qty = parseInt(e.target.value);
    this.setState({
      mealFoods: foodsCopy,
    });
  }

  resetTotals = () => {
    this.totals = {
      "calories": 0,
      "protein": 0,
      "carbs": 0,
      "fat": 0,
    }
  }

  renderRows = () => {
    this.resetTotals();
    const rows = this.state.mealFoods.map((food) => {
      this.totals["calories"] += parseFloat(food.calories) * food.qty;
      this.totals["protein"] += parseFloat(food.protein) * food.qty;
      this.totals["carbs"] += parseFloat(food.carbs) * food.qty;
      this.totals["fat"] += parseFloat(food.fat) * food.qty;
      return (
        <tr key={ food.id }>
          <td>{ food.title }</td>
          <td>{ food.calories }</td>
          <td>{ food.protein }</td>
          <td>{ food.carbs }</td>
          <td>{ food.fat }</td>
          <td>
            <input type="number" min="1" value={ food.qty } data-food-id={ food.id } onChange={ this.updateFoodQuantity }>
            </input>
          </td>
          <td>{ food.servingSize }</td>
          <td>x</td>
        </tr>
      );
    });
    return rows;
  }

  render() {
    return(
      <>
        <Form id="new-food-form">
          <Form.Group className="mb-3" controlId="newFoodName">
            <Form.Label>New Meal Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Calories</th>
                  <th>Protein</th>
                  <th>Carbs</th>
                  <th>Fat</th>
                  <th>Number Of Servings</th>
                  <th>Serving Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { this.renderRows() }
                <tr>
                  <td>Totals</td>
                  <td>{ this.totals.calories }</td>
                  <td>{ this.totals.protein }</td>
                  <td>{ this.totals.carbs }</td>
                  <td>{ this.totals.fat }</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="newFoodCalories">
            <Form.Label>Calories per serving</Form.Label>
            <Form.Control type="number" placeholder="Calories" />
            </Form.Group>*/}
            <Form.Group>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="title"
              onChange={this.setSingleSelections}
              options={products}
              placeholder="Enter food name"
              selected={this.singleSelections}
              ref={this.addFoodRef}
            />
            </Form.Group>
          </Form>
      </>
    );
  }
}

export default NewMealMaker;
