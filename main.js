let productTitle = document.querySelector("#product-title");
let productCategory = document.querySelector("#product-category");
let productCount = document.querySelector("#product-count");
let productPrice = document.querySelector("#product-price");
let productTaxes = document.querySelector("#product-taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let searchProduct = document.querySelector("#search-product");
let totalPriceLabel = document.querySelector("#total-price-label");
let productCountLabel = document.querySelector("#product-count-label");
let addProductBtn = document.querySelector("#add-product");
let searchByTitleBtn = document.querySelector("#search-by-title");
let searchByCatBtn = document.querySelector("#search-by-category");
let DeleteAllBtn = document.querySelector("#del-all");

let productTable = document.querySelector("table");

let products = [];

if (localStorage.getItem("products")) {
  products = localStorage.getItem("products");
}

// Add Products Into Local Storage

addProductBtn.onclick = (e) => {
  e.preventDefault();
  if (
    productTitle.value != "" &&
    productPrice.value != "" &&
    productTaxes.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    productCategory.value != "" &&
    productTitle.value != "" &&
    productCount.value != ""
  ) {
    addProductTolS();
  }
};

function addProductTolS() {
  let productData = {
    id: Date.now(),
    title: productTitle.value,
    price: productPrice.value,
    taxes: productTaxes.value,
    ads: ads.value,
    discount: discount.value,
    total:
      +productPrice.value + +productTaxes.value + +ads.value - +discount.value,
    category: productCategory.value,
  };

  for (let i = 0; i < +productCount.value; i++) {
    products.push(productData);
  }

  console.log(products);
  let jsonObj = JSON.stringify(products);

  console.log(jsonObj);

  localStorage.setItem("products", jsonObj);
}

function createProduct() {
  let tablerow = document.createElement("tr");
  let id = document.createElement("td");
  let title = document.createElement("td");
  let price = document.createElement("td");
  let taxes = document.createElement("td");
  let ads = document.createElement("td");
  let discount = document.createElement("td");
  let total = document.createElement("td");
  let category = document.createElement("td");
  let updateBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");

  updateBtn.id = "update-item";
  deleteBtn.id = "del-item";
}
