import { Route, BrowserRouter, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import NewCollection from "./NewCollection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "./LoginPage";
import Registration from "./Registration";
import Admin from "./Admin";
import PageNotFound from "../components/PageNotFound";

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
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={Registration} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
