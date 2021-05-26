import { Component } from "react";
import "./overrides.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./components/context/ProductsContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./navigation/Router";
import CartProvider from "./components/context/CartContext";
import LoggedInProvider from "./components/context/LoginContext";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <LoggedInProvider>
          <ProductProvider>
            <CartProvider>
              <ErrorBoundary>
                <Router />
              </ErrorBoundary>
            </CartProvider>
          </ProductProvider>
        </LoggedInProvider>
      </BrowserRouter>
    );
  }
}

export default App;
