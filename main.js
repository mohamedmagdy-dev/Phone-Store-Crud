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
let deleteAllBtn = document.querySelector("#del-all");

let productsTable = document.querySelector("table tbody");

let products = [];

if (localStorage.getItem("products")) {
  // Get Products From localStorage Add Into Arr
  products = JSON.parse(localStorage.getItem("products"));
  createProduct(products);
  deleteItem();
}

delAllBtnToggle();

addProductBtn.onclick = (e) => {
  e.preventDefault();
  if (
    productTitle.value != "" &&
    productPrice.value != "" &&
    productTaxes.value != "" &&
    ads.value != "" &&
    productCategory.value != "" &&
    productTitle.value != "" &&
    productCount.value != ""
  ) {
    addProductTolS();
    createProduct(products);
    deleteItem();
    delAllBtnToggle();

    totalPriceLabel.innerText = "0$";
  }
};

deleteAllBtn.onclick = (e) => {
  e.preventDefault();
  localStorage.clear();
  productsTable.innerHTML = "";
  delAllBtnToggle();
};

// show Total Price Dynamic

productPrice.onchange = () => {
  showTotalPrice();
};

ads.onchange = () => {
  showTotalPrice();
};

productTaxes.onchange = () => {
  showTotalPrice();
};

discount.onchange = () => {
  showTotalPrice();
};

function addProductTolS() {
  // Add product Into Arr
  for (let i = 0; i < +productCount.value; i++) {
    let productData = {
      id: Date.now() + i,
      title: productTitle.value,
      price: productPrice.value,
      taxes: productTaxes.value,
      ads: ads.value,
      discount: discount.value || 0,
      total:
        +productPrice.value +
        +productTaxes.value +
        +ads.value -
        (+discount.value || 0),
      category: productCategory.value,
    };

    products.push(productData);
  }

  // Add products From Arr Into localStorage

  let jsonObj = JSON.stringify(products);
  localStorage.setItem("products", jsonObj);
}

function createProduct(products) {
  for (let productData of products) {
    let product = document.createElement("tr");
    let id = document.createElement("td");
    let title = document.createElement("td");
    let price = document.createElement("td");
    let taxes = document.createElement("td");
    let ads = document.createElement("td");
    let discount = document.createElement("td");
    let total = document.createElement("td");
    let category = document.createElement("td");
    let updateBtnTd = document.createElement("td");
    let deleteBtnTd = document.createElement("td");

    // Controls Buttons
    let updateBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    updateBtn.id = "update-item";
    updateBtn.className = "update-item";
    deleteBtn.id = "del-item";
    deleteBtn.className = "del-item";

    updateBtn.innerText = "Update";
    deleteBtn.innerText = "Delete";

    updateBtnTd.appendChild(updateBtn);
    deleteBtnTd.appendChild(deleteBtn);

    // Add Data Into Td
    id.innerText = productData.id;
    title.innerText = productData.title;
    price.innerText = productData.price;
    taxes.innerText = productData.taxes;
    ads.innerText = productData.ads;
    discount.innerText = productData.discount;
    total.innerText = productData.total == 0 ? "Free" : productData.total;
    category.innerText = productData.category;
    // Append Tds Into Tr

    product.appendChild(id);
    product.appendChild(title);
    product.appendChild(price);
    product.appendChild(taxes);
    product.appendChild(ads);
    product.appendChild(discount);
    product.appendChild(total);
    product.appendChild(category);
    product.appendChild(updateBtnTd);
    product.appendChild(deleteBtnTd);

    // Append Product Into Table
    productsTable.appendChild(product);
  }

  // Reset Input For New Product
  productTitle.value = "";
  productPrice.value = "";
  productTaxes.value = "";
  ads.value = "";
  productCategory.value = "";
  productTitle.value = "";
  productCount.value = "";
}

function deleteItem() {
  let productsDom = productsTable.querySelectorAll("tr");
  productsDom.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      if (e.target.classList.contains("del-item")) {
        let parent = e.target.parentNode.parentNode;
        let parentId = parent.children[0].innerText;
        // remove Element From Dom;
        parent.remove();
        //remove Element From localStorage
        let filteredProducts = JSON.parse(
          localStorage.getItem("products")
        ).filter((el) => {
          return el.id != +parentId;
        });

        // Add filteredProducts  Into localStorage
        localStorage.setItem("products", JSON.stringify(filteredProducts));

        console.log(filteredProducts);

        // Get filteredProducts Into Arr
        products = filteredProducts;

        // To Clear LocalStorage
        if (productsDom.length - 1 == index) {
          localStorage.clear();
        }

        // To update Product Count
        delAllBtnToggle();
      }
    });
  });
}

function delAllBtnToggle() {
  if (localStorage.getItem("products")) {
    deleteAllBtn.classList.remove("hidden");
    productCountLabel.innerText = products.length;
  } else {
    deleteAllBtn.classList.add("hidden");
  }
}

function showTotalPrice() {
  if (productPrice.value != "" && productTaxes.value != "" && ads.value != "") {
    totalPriceLabel.innerText =
      +productPrice.value +
      +productTaxes.value +
      +ads.value -
      (+discount.value || 0);
  }
}

function filterProducts(filterBy) {}
