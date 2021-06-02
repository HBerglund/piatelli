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
  getAllProducts: () => void;
}

export const ProductsContext = createContext<ContextValue>({
  products: [],
  categories: [],
  addNewProduct: () => {},
  updateProduct: () => {},
  removeProduct: () => {},
  getAllProducts: () => {},
});

function ProductProvider(props: IProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const getAllProducts = () => {
    fetch("/products", { method: "GET" }).then((res) =>
      res.json().then((result) => {
        setProducts(result);
        getAllCategories(result);
        console.log(result);
      })
    );
  };

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
        // No need to set products again, just update the products array from DB
        getAllProducts();
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
      .then((result) => {
        if (result.errorCode) {
          // Catch error
          console.log(result);
        } else {
          // No need to set products again, just update the products array from DB
          getAllProducts();
        }
      });
  }

  function removeProduct(product: Product) {
    const id = product._id;
    fetch(`/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errorCode) {
          console.log(result.errorCode);
        } else {
          // No need to set products again, just update the products array from DB
          getAllProducts();
        }
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
        getAllProducts,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export const ProductConsumer = ProductsContext.Consumer;
export default ProductProvider;
