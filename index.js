const url = "https://fake-3nts.onrender.com/products";
let arr = [];
let cartbag = [];
let favourites = [];
let priceArr =[];
let data;
async function getData() {
  try {
    let apifetch = await fetch(url);
    data = await apifetch.json();
    for (i = 1; i <= 4; i++) {
      let randomId = Math.floor(Math.random() * data.length);
      if (!arr.includes(randomId)) {
        arr.push(randomId);
      }
    }
    recommandationsProducts(data);
    allproducts(data);
  } catch (error) {
    console.log(error);
  }
}

// recommandations products on home page
function recommandationsProducts(data) {
  let productContainer = document.getElementById("productContainer");
  let recommandationsContainer = document.getElementById("recommandationsContainer");
  let productCards = "";
  arr.forEach((e) => {
    data.forEach((product) => {
      if (product.id == e) {
        const productCard = `
                <div class="col-12 col-sm-6 col-md-3 mb-4 position-relative" ondblclick = "productDetails(${product.id})">
                    <div class="card h-100" onclick ="productDetails(${product.id})">
                        <div class="position-relative">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <i class="far fa-heart position-absolute top-0 end-0 m-2" 
                               style="font-size: 1.8rem; cursor: pointer;" 
                               onclick="toggleFavorite(this, '${product.id}')"></i>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">₹${product.price}</p>
                            <button class="btn btn-primary mt-auto" onclick="addToCart('${product.id}')">Add to Cart</button>
                        </div>
                    </div>
                </div>`;
        productCards += productCard;
      }
    });
  });
  productContainer.innerHTML = productCards;
  recommandationsContainer.innerHTML = productCards;
}


// display all products using full
let womenfilterbtn = document.getElementById("womenfilterbtn");
let homebtn = document.getElementById("homebtn");
let menfilterbtn = document.getElementById("mensfilterbtn");
let kidsfilterbtn = document.getElementById("kidsfilterbtn");
let sportsfilterbtn = document.getElementById("sportsfilterbtn");
let main = document.getElementsByTagName("main");
const logoImg = document.getElementsByClassName("logoImg");
const toggleButton = document.getElementById("toggleButton");
let allproductsdiplay = document.getElementById("allproductsdiplay");
const searchInput = document.getElementById("searchInput");
const favouritesbtn = document.getElementById("favourites");
let cart = document.getElementById("cartSection");
let productsDisplaySection = document.getElementById("productsection");
let favouriteDisplay = document.getElementById("favouriteDisplay");
let favouriteSection = document.getElementById("favouriteSection");
const signup = document.getElementsByClassName("signup");
const formsubmit = document.getElementsByClassName("formsubmit");
const signbtn = document.getElementsByClassName("signbtn");
const productsection = document.getElementById("productsection");
let cartIcon = document.getElementsByClassName("bag-item-count");
let kidsoffer=document.querySelector("#kidsoffer");
let mensOffer = document.querySelector("#mensoffer");
let productdetails = document.getElementById("productdetails");
let exclusiveoffer = document.getElementById("exclusiveoffer")
logoImg[0].addEventListener("click", () => {
  main[0].style.display = "block";
  allproductsdiplay.style.display = "none";
  window.location.reload();
});

// filtering products onclick
function allproducts(data) {
  exclusiveoffer.addEventListener("click", ()=>{
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none";
    productsDisplaySection.style.display ="block";
    displayProducts(data);
  })
  homebtn.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none";
    productsDisplaySection.style.display ="block";
    displayProducts(data);
  });
  womenfilterbtn.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none";
    productsDisplaySection.style.display = "block";
    filterProducts(data, womenfilterbtn.innerText);
  });
  menfilterbtn.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none";
    productsDisplaySection.style.display = "block";
    filterProducts(data, menfilterbtn.innerText);
  });
 
  mensOffer.addEventListener("click", 
    () => {
      main[0].style.display = "none";
      cart.style.display = "none";
      favouriteSection.style.display = "none";
      productdetails.style.display = "none";
      productsDisplaySection.style.display = "block";
      filterProducts(data, menfilterbtn.innerText);
    });

  kidsfilterbtn.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none"
    productsDisplaySection.style.display = "block";
    filterProducts(data, kidsfilterbtn.innerText);
  });
  kidsoffer.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none"
    productsDisplaySection.style.display = "block";
    filterProducts(data, kidsfilterbtn.innerText);
  });
  sportsfilterbtn.addEventListener("click", () => {
    main[0].style.display = "none";
    cart.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none"
    productsDisplaySection.style.display = "block";
    filterProducts(data, sportsfilterbtn.innerText);
  });
  // searching functionailty
  toggleButton.addEventListener("click", (e) => {
    e.preventDefault();
    main[0].style.display = "none";
    cart.style.display ="none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none"
    productsDisplaySection.style.display = "block";
    const searchTerm = searchInput.value.toLowerCase();
    let find = data.filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm) ||
        e.details.toLowerCase().includes(searchTerm)
    );
    if (find.length > 0) {
      displayProducts(find);
    } else {
      allproductsdiplay.innerHTML = `<p style="text-align:center;font-size:xx-large; color:red;"> Products not found!
            Search for another Item</p>`;
    }
  });
  // cartbtn
  cartbtn.addEventListener("click", () => {
    main[0].style.display = "none";
    productsDisplaySection.style.display = "none";
    favouriteSection.style.display = "none";
    productdetails.style.display = "none"
    cart.style.display = "block";
    displayCart(data, cartbag);
  });
  favouritesbtn.addEventListener("click", (e) => {
    // debugger;
    e.preventDefault();
    main[0].style.display = "none";
    productsDisplaySection.style.display = "none";
    cart.style.display = "none";
    productdetails.style.display = "none"
    favouriteSection.style.display = "block";
    updateFavourites(data, favourites);
  });
}


// // favourites button
function toggleFavorite(element, productId) {
  debugger
  if (element.classList.contains("far")) {
    element.classList.remove("far");
    element.classList.add("fas");
    element.style.color = "#dc3545";
    if (!favourites.includes(productId)) {
      favourites.push(productId);
    } else {
      alert("product is already in the favourites");
    }
  } else {
    element.classList.remove("fas");
    element.classList.add("far");
    element.style.color = "";

    let index = favourites.indexOf(productId);
    if (index !== -1) {
      favourites.splice(index, 1);
    }
  }
  updateFavourites(data, favourites);
}

// favourites function
function updateFavourites(data, favourites) {
  favouriteDisplay.innerHTML = "";
  if (favourites.length > 0) {
    let productCards = "";
    favourites.forEach((e) => {
      data.forEach((product) => {
        if (product.id == e) {
          const productCard = `
                <div class="col-12 col-sm-6 col-md-3 mb-4 position-relative" ondblclick ="productDetails('${product.id}')">
                    <div class="card h-100">
                        <div class="position-relative">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <i class="fas fa-heart position-absolute top-0 end-0 m-2" 
                               style="color:#dc3545;font-size: 1.8rem; cursor: pointer;" 
                               onclick="toggleFavorite(this, '${product.id}')"></i>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">₹${product.price}</p>
                            <button class="btn btn-primary mt-auto" onclick="addToCart('${product.id}')">Add to Cart</button>
                        </div>
                    </div>
                </div>`;
          productCards += productCard;
        }
      });
    });
    favouriteDisplay.innerHTML = productCards;
  } else {
    // Loop through favorites and display them
    favouriteDisplay.innerHTML = `<p style="text-align:ce
      nter;font-size:xx-large; color:red;">No Favorite items added Yet!</p>`;
  }
}

// display products;
function displayProducts(data) {
  let productCards = "";
  data.forEach((product) => {
    const productCard = `
                <div class="col-12 col-sm-6 col-md-3 mb-4 position-relative" ondblclick = "productDetails('${product.id}')">
                    <div class="card h-100">
                        <div class="position-relative">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            <i class="far fa-heart position-absolute top-0 end-0 m-2" 
                               style="font-size: 1.8rem; cursor: pointer;" 
                               onclick="toggleFavorite(this, '${product.id}')"></i>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">₹${product.price}</p>
                            <button class="btn btn-primary mt-auto" onclick="addToCart('${product.id}')">Add to Cart</button>
                        </div>
                    </div>
                </div>`;
    productCards += productCard;
  });
  allproductsdiplay.innerHTML = productCards;
}
// filters products
function filterProducts(data, category) {
  let productCards = "";
  data.forEach((product) => {
    if (product.category == category) {
      const productCard = `
        <div class="col-12 col-sm-6 col-md-3 mb-4 position-relative" ondblclick = "productDetails('${product.id}')">
            <div class="card h-100">
                <div class="position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <i class="far fa-heart position-absolute top-0 end-0 m-2" 
                       style="font-size: 1.8rem; cursor: pointer;" 
                       onclick="toggleFavorite(this, '${product.id}')"></i>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">₹${product.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
        </div>`;
      productCards += productCard;
    }
    allproductsdiplay.innerHTML = productCards;
  });
}

// complete product details
function productDetails(productItemId){
  main[0].style.display = "none";
  productsection.style.display = "none";
  favouriteSection.style.display = "none";
  cart.style.display = "none";
  productdetails.style.display = "block";
  let productdisplaydescription = document.getElementById("productdisplaydescription");
  let productCards = "";
  data.forEach((product) => {
    if(product.id== productItemId){
    const productCard = `
    <div class="container-fluid vh-100 d-flex align-items-center">
    <div class="row w-100">

        <!-- Product Image Section -->

        <div class="col-md-6 d-flex justify-content-center">
            <img src="${product.image}" alt="Product Image" class="img-fluid rounded" id="productDeatilsImage" style="object-fit: cover; max-height: 80vh; width: auto; height:auto;"/>
        </div>

        <!-- Product Details Section -->
        <div class="col-md-6 d-flex flex-column justify-content-center">
            <h1 class="display-5 font-weight-bold">${product.name}</h1>
            <p class="h4 text-muted mb-4">${product.details}</p>
             <p class="h4 text-muted mb-4">Rs ₹${product.price}</p>
            <!-- Color Options -->
            <div class="mb-3">
                <h5>Color:</h5>
                <div class="btn-group" role="group" aria-label="Color options">
                    <button type="button" class="btn btn-outline-secondary" style="background-color: ${product.color}; color: whiteproductContainer;">${product.color}</button>
                </div>
            </div>

            <!-- Size Options -->
            <div class="mb-4">
                <h5>Size:</h5>
                <div class="btn-group" role="group" aria-label="Size options">
                    <button type="button" class="btn btn-outline-secondary">XS</button>
                    <button type="button" class="btn btn-outline-secondary">S</button>
                    <button type="button" class="btn btn-outline-secondary">M</button>
                    <button type="button" class="btn btn-outline-secondary">L</button>
                    <button type="button" class="btn btn-outline-secondary">XL</button>
                    <button type="button" class="btn btn-outline-secondary">XXL</button>
                </div>
            </div>

            <!-- Add to Cart Button -->
            <button class="btn btn-dark btn-lg btn-block" onclick= "addToCart('${product.id}')">Add to Cart</button>
        </div>
    </div>
</div>`;
productCards += productCard
}
});
productdisplaydescription.innerHTML = productCards;
}


const signupform = document
  .getElementById("signupform")
  .addEventListener("click", () => {
    signup[0].style.display = "flex";
    main[0].style.display = "none";
    productsection.style.display = "none";
    favouriteSection.style.display = "none";
    cart.style.display = "none";
  });
const btnclose = document
  .getElementById("closesignform")
  .addEventListener("click", () => {
    signup[0].style.display = "none";
    main[0].style.display = "block";
    cart.style.display = "none";
    productsection.style.display = "block";
  }); 
formsubmit[0].addEventListener("click", (e) => {
  e.preventDefault();
  let customeremail = document.getElementById("customeremail");
  let customerpassword = document.getElementById("customerpassword");
  const person = {
    name: customeremail,
    password: customerpassword
  };
  let persons = JSON.parse(localStorage.getItem('persons')) || [];
  persons.push(person);
  localStorage.setItem('persons', JSON.stringify(persons));
  alert('signed in enjoy the shopping');
  signup[0].style.display = "none";
  main[0].style.display = "block";
});

// Add to cart functionality
function addToCart(itemId) {
  if (!cartbag.includes(itemId)) {
    cartbag.push(itemId);
    let productPriceId = Number(itemId) - 1;
    priceArr.push(data[productPriceId]);
    displayBagIcon();
  } else {
    confirm("Item is already in cart! want to add one more");
    cartbag.push(itemId);
  }
}

// Display bag icon count
function displayBagIcon() {
  cartIcon[0].style.visibility = cartbag.length > 0 ? "visible" : "hidden";
  cartIcon[0].innerText = cartbag.length;
}

// remove product from cart
function removeFromCart(data, itemId) {
  const index = cartbag.indexOf(itemId);
  if (index > -1) {
    priceArr.splice(index , 1)
    cartbag.splice(index, 1);
    displayBagIcon();
    displayCart(data, cartbag);
  }
}

function displayCart(data, cartbag) {
  let favouritesBag = document.getElementById("favouritesBag");
  let productCards = "";
 
  if (cartbag.length === 0) {
    favouritesBag.innerHTML = `<p style="text-align:center;font-size:xx-large; color:red;">No Favourite items added Yet!</p>`;
  } else {
    cartbag.forEach((e) => {
      data.forEach((product) => {
        if (product.id == e) {
          const productCard = `
                  <div class="cart-item" ondblclick = "productDetails('${product.id}')">
                      <img src="${product.image}" alt="${product.name}">
                      <div class="cart-item-details">
                          <h5 class="cart-item-name">${product.name}</h5>
                          <p class="cart-item-price">₹${
                            product.price
                          } (15% OFF)</p>
                          <p class="cart-item-delivery">Delivery by <span>${Math.floor(
                            Math.random() * 30
                          )} Oct 2024</span></p>
                      </div>
                      <button class="remove-cart-item-btn" onclick="removeFromCart(data, '${
                        product.id
                      }')">&times;</button>
                  </div>`;
          productCards += productCard;
        }
      });
    });
    favouritesBag.innerHTML = productCards;
  }
  updateCartSummary()
}

function updateCartSummary() {
  const totalItems = priceArr.length;
  const subtotal = priceArr.reduce((acc, item) => acc + item.price, 0);
  const discount = subtotal< 5000 ? 0 : (subtotal > 5000 && subtotal<=10000) ? 1000 : (subtotal>10000 && subtotal<=15000) ? 2000 : 3000;
  const totalPrice = subtotal -discount;
  document.getElementById('total-items').innerText = totalItems;
  document.getElementById('discount-price').innerText = discount.toFixed(2);
  document.getElementById('subtotal-price').innerText = subtotal.toFixed(2);
  document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function checkout() {
    signup[0].style.display = "flex";
    main[0].style.display = "none";
    productsection.style.display = "none";
    favouriteSection.style.display = "none";
    cart.style.display = "none";
}


getData();
