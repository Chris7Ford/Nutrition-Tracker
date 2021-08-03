import NewFoodPage from "./pages/new-food/index";
import NewMealPage from "./pages/create-meal/index";
import Page from "./layouts/page/index";

import './App.css';

const App = () => (
  <Page content={ <NewMealPage /> } />
);

export default App;
