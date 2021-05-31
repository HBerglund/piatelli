import { Component } from "react";
import "./overrides.css";
import { BrowserRouter } from "react-router-dom";
import ProductProvider from "./components/context/ProductsContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./navigation/Router";
import CartProvider from "./components/context/CartContext";
import UsersProvider from "./components/context/UsersContext";
import OrderProvider from "./components/context/OrderContext";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UsersProvider>
          <ProductProvider>
            <CartProvider>
              <OrderProvider>
                <ErrorBoundary>
                  <Router />
                </ErrorBoundary>
              </OrderProvider>
            </CartProvider>
          </ProductProvider>
        </UsersProvider>
      </BrowserRouter>
    );
  }
}

export default App;
