import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AdminPage from "./AdminPage";
import Checkout from "./Checkout";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import NewCollection from "./NewCollection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "./LoginPage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:name" component={ProductDetails} />
        <Route path="/new-collection" component={NewCollection} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
