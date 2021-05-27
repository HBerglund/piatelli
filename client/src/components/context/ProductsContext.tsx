import { createContext, useEffect, useState } from "react";

// TODO - Update product type to match product schema
export interface Product {
  name: string;
  price: number;
  img: string;
  category: string[];
  description: string;
  details: string;
  care: string;
  stock: number;
}

interface IState {
  products: Product[];
}

interface IProps {
  children: Object;
}
interface ContextValue extends IState {
  addNewProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
}

export const ProductsContext = createContext<ContextValue>({
  products: [],
  addNewProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
});

function ProductProvider(props: IProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products", { method: "GET" }).then((res) =>
      res.json().then((result) => {
        setProducts(result);
      })
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  });

  function randomID() {
    return Math.random() * (99999 - 1) + 1;
  }

  function addNewProduct(product: Product) {
    // product.id = randomID();
    // const updateProductView = [...products, product];
    // setProducts(updateProductView);
  }

  function updateProduct(product: Product) {
    // let updatedProducts = products.map((item) => {
    //   if (item.id === product.id) {
    //     return { ...item, product };
    //   }
    //   return item;
    // });
    // setProducts(updatedProducts);
  }

  function removeProduct(product: Product) {
    // setProducts((prev) =>
    //   prev.reduce((ack, item) => {
    //     if (item.id === product.id) {
    //       return ack;
    //     } else {
    //       return [...ack, item];
    //     }
    //   }, [] as Product[])
    // );
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addNewProduct,
        updateProduct,
        removeProduct,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export const ProductConsumer = ProductsContext.Consumer;
export default ProductProvider;
