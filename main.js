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
}

// ALlow To Update Item Data
updateItem();

// ALlow To Delete Item From Dom And LocalStorage
deleteItem();

// To Update Products Count And Hide And Show Delete All Button
delAllBtnToggle();

// Add Product Into Page And LocalStorage
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
    // Generate ProductData Object And Push it into localStorage And into products Array
    productData();

    // Create Product And Push It into Page
    createProduct(products);

    // ALlow To Update Item Data
    updateItem();

    // ALlow To Delete Item From Dom And LocalStorage
    deleteItem();

    // To Update Products Count And Hide And Show Delete All Button
    delAllBtnToggle();

    totalPriceLabel.innerText = "0$";
  }
};

// Reset Every thing
deleteAllBtn.onclick = (e) => {
  e.preventDefault();
  localStorage.clear();
  productsTable.innerHTML = "";
  delAllBtnToggle();
};

// show Total Price Dynamic
productPrice.onchange = showTotalPrice;
ads.onchange = showTotalPrice;
productTaxes.onchange = showTotalPrice;
discount.onchange = showTotalPrice;

// Filter Products By Title Or Category
searchByCatBtn.onclick = (e) => {
  e.preventDefault();
  filterProducts("category");
};

searchByTitleBtn.onclick = (e) => {
  e.preventDefault();
  filterProducts("title");
};

// To Reset Filter on Products
searchProduct.onchange = () => {
  let allProducts = productsTable.querySelectorAll("tr");
  allProducts.forEach((el) => {
    el.style.display = "table-row";
  });
};

// Generate ProductData Object And Push it into localStorage And into products Array
function productData() {
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

// Create Product And Push It into Page

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

    product.setAttribute("title", productData.title);
    product.setAttribute("data-category", productData.category);

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
  discount.value = "";
}

// ALlow To Update Item Data
function updateItem() {
  let productsDom = productsTable.querySelectorAll("tr");
  productsDom.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.classList.contains("update-item")) {
        let parent = e.target.parentNode.parentNode;
        let targetId = parent.children[0].innerText;

        productTitle.value = parent.children[1].innerText;
        productPrice.value = parent.children[2].innerText;
        productTaxes.value = parent.children[3].innerText;
        ads.value = parent.children[4].innerText;
        discount.value = parent.children[5].innerText;
        productCategory.value = parent.children[7].innerText;

        productCount.setAttribute("disabled", "");

        showTotalPrice();

        // ReEvent To Be Updater button
        addProductBtn.innerText = "Update Product";
        addProductBtn.onclick = (e) => {
          e.preventDefault();
          let updatedProducts = products.map((product) => {
            if (targetId == +product.id) {
              product.title = productTitle.value;
              product.price = productPrice.value;
              product.taxes = productTaxes.value;
              product.ads = ads.value;
              product.discount = discount.value;
              product.category = productCategory.value;
              product.total =
                +productPrice.value +
                +productTaxes.value +
                +ads.value -
                (+discount.value || 0);
              el.category = productCategory.value;
            }
            return product;
          });

          // Update Products Into LocalStorage
          localStorage.setItem("products", JSON.stringify(updatedProducts));

          products = updatedProducts;

          // ReAdd Products After Update
          productsTable.innerHTML = "";

          createProduct(updatedProducts);

          // Reset To Default

          productCount.removeAttribute("disabled");

          addProductBtn.innerText = "Add Product";
          // ALlow To Update Item Data
          updateItem();

          // ALlow To Delete Item From Dom And LocalStorage
          deleteItem();

          // To Update Products Count And Hide And Show Delete All Button
          delAllBtnToggle();

          productTitle.value = "";
          productPrice.value = "";
          productTaxes.value = "";
          ads.value = "";
          productCategory.value = "";
          productCount.value = "";
          discount.value = "";
        };
      }
    });
  });
}

// ALlow To Delete Item From Dom And LocalStorage
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

        // Get filteredProducts Into Array
        products = filteredProducts;

        console.log(filteredProducts.length);

        // To Clear LocalStorage
        if (filteredProducts.length == 0) {
          localStorage.clear();
          console.log("DOne");
        }

        // To update Product Count
        delAllBtnToggle();
      }
    });
  });
}

// To Update Products Count And Hide And Show Delete All Button
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

function filterProducts(filterBy) {
  let allProducts = productsTable.querySelectorAll("tr");
  if (searchProduct.value.trim() != "") {
    allProducts.forEach((product) => {
      if (filterBy == "title") {
        if (searchProduct.value != product.getAttribute("title")) {
          product.style.display = "none";
        }
      } else if (filterBy == "category") {
        if (searchProduct.value != product.getAttribute("data-category")) {
          product.style.display = "none";
        }
      }
    });
  }
}
