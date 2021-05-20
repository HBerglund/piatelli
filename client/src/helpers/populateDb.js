const mockedProducts2 = require("../components/context/mockedProducts2");
const fetch = require("node-fetch");

const postProduct = (product) => {
  fetch("http://localhost:4000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...product }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
};

for (const product of mockedProducts2) {
  postProduct(product);
}
