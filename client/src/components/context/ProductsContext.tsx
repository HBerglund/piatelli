import { createContext, useEffect, useState } from "react";
import { Product } from "../../helpers/typings";

interface IState {
  products: Product[];
  categories: string[];
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
  categories: [],
  addNewProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
});

function ProductProvider(props: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const getAllCategories = (products: Product[]) => {
    const categories: string[] = [];
    products.forEach((product) => {
      if (product.category.length > 1) {
        product.category.forEach((category: string) => {
          categories.push(category);
        });
      } else {
        categories.push(product.category[0] as string);
      }
      setCategories(Array.from(new Set(categories)));
    });
  };

  useEffect(() => {
    fetch("/products", { method: "GET" }).then((res) =>
      res.json().then((result) => {
        setProducts(result);
        getAllCategories(result);
      })
    );
  }, []);

  function addNewProduct(product: Product) {
    fetch("/products", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        const updateProductView = [...products, product];
        setProducts(updateProductView);
      });
  }

  function updateProduct(product: Product) {
    const id = product._id;
    fetch(`/products/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        let updatedProducts = products.map((item) => {
          if (item._id === product._id) {
            return { ...item, product };
          }
          return item;
        });
        setProducts(updatedProducts);
      });
  }

  function removeProduct(product: Product) {
    const id = product._id;
    console.log(id);
    fetch(`/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts((prev) =>
          prev.reduce((ack, item) => {
            if (item._id === product._id) {
              return ack;
            } else {
              return [...ack, item];
            }
          }, [] as Product[])
        );
      });
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
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
