// selector variables
let modelInput = document.getElementById("model");
let priceInput = document.getElementById("price");
let categoryInput = document.getElementById("category");
let featuresInput = document.getElementById("features");
let qtyInput = document.getElementById("qty");
let addButton = document.getElementById("addBtn");
let tbody = document.getElementById("tbody");
let searchInput = document.getElementById("searchInput");
let deleteAll = document.getElementById("deleteAll");
let modelAlert = document.getElementById("modelAlert");

let ProductsList;
let updateIndex;

// get local storage after set-item

if (localStorage.getItem("products")) {
  ProductsList = JSON.parse(localStorage.getItem("products"));
  displayProducts(ProductsList);
  deleteAll.classList.replace("d-none", "d-block")
} else {
  ProductsList = [];
}


// function to add-products to array from object after writing it in input space
function addProducts() {
  if (modelInput.value != "" && priceInput.value != "" && qtyInput.value != "" && categoryInput.value != "" && featuresInput.value != "") {
    if (addButton.innerHTML === "Add Products") {
      let Products = {
        model: modelInput.value,
        quantity: qtyInput.value,
        price: priceInput.value,
        category: categoryInput.value,
        features: featuresInput.value,
      };
      ProductsList.push(Products);
    } else if (addButton.innerHTML === "Update Products") {
      ProductsList[updateIndex].model = modelInput.value;
      ProductsList[updateIndex].quantity = qtyInput.value;
      ProductsList[updateIndex].price = priceInput.value;
      ProductsList[updateIndex].category = categoryInput.value;
      ProductsList[updateIndex].features = featuresInput.value;
    }
    addButton.innerHTML = "Add Products";
  }
  deleteAll.classList.replace("d-none", "d-block")
  displayProducts(ProductsList);
  clear();
  addToLocalStorage(ProductsList);
}

// function to display-products to inner-html after adding it to function add-products

function displayProducts(plist) {
  let content = ``;
  for (let i = 0; i < plist.length; i++) {
    content += `<tr> 
    <td>${i + 1}</td>
    <td>${plist[i].model} </td>
    <td>${plist[i].quantity} </td>
    <td class="text-nowrap">${plist[i].price} EG</td>
    <td class="text-nowrap">${plist[i].category}</td>
    <td class="text-nowrap">${plist[i].features}</td>
    <td><button class="btn btn-success" id="updateBtn" onclick={updateProducts(${i})} >Update</button></td>
    <td><button class="btn btn-danger" id="deleteBtn" class="text-nowrap" onclick= {deleteProducts(${i})}>Delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = content;
}

// function to clear data from input space after adding and display products

function clear() {
  modelInput.value = "";
  qtyInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  featuresInput.value = "";
}

// function add to local storage as when refresh data be saved after entry

function addToLocalStorage(plist) {
  localStorage.setItem("products", JSON.stringify(plist));
}

// function delete products with btn delete
function deleteProducts(i) {
  ProductsList.splice(i, 1);
  displayProducts(ProductsList);
  addToLocalStorage(ProductsList);
  if (ProductsList.length <= 0) {
    deleteAll.classList.replace("d-block", "d-none")
  }
}

// function  delete All products with btn delete all

function deleteAllProducts(i) {
  ProductsList.splice(i);
  displayProducts(ProductsList);
  addToLocalStorage(ProductsList);
  deleteAll.classList.replace("d-block", "d-none")
}



// function update products with btn update
function updateProducts(i) {
  updateIndex = i;
  modelInput.value = ProductsList[updateIndex].model;
  qtyInput.value = ProductsList[updateIndex].quantity;
  priceInput.value = ProductsList[updateIndex].price;
  categoryInput.value = ProductsList[updateIndex].category;
  featuresInput.value = ProductsList[updateIndex].features;
  addButton.innerHTML = "Update Products";
}

// function search products with search input
function searchProduct() {
  searchArray = [];
  let searchName = searchInput.value;
  for (let i = 0; i < ProductsList.length; i++) {
    if (
      ProductsList[i].model.toLowerCase().includes(searchName.toLowerCase())
    ) {
      searchArray.push(ProductsList[i]);
    }
  }
  displayProducts(searchArray);
}

