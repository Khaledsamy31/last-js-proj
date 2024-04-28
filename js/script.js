let allProducts = document.querySelector(".productContent");
let bdg_counter = document.querySelector(".bdg_counter");
let bdg = document.querySelector(".bdg");
let searchInput = document.querySelector(".searchInput");
let searchType = document.querySelector(".searchType");

let cardsproductsDiv = document.querySelector(".carts_products div"); //select cards_products then first div

//===========================SHOPING CARD ICON===================
let shopping_card_icon = document.querySelector(".shopping_cart");
let cardProducts = document.querySelector(".carts_products");

shopping_card_icon.addEventListener("click", opencard);
function opencard() {
  if (cardsproductsDiv.innerHTML != "") {
    //if shopping icon not empty check if it display bloc do it none when click and if it none do t block when click
    if (cardProducts.style.display == "block") {
      cardProducts.style.display = "none";
    } else {
      cardProducts.style.display = "block";
    }
  }
}

//====================== add & remove btn ==========================

let favourite = [];
let product = [];
product.push("nothing");
let userProducts = [];

class products {
  constructor({ title, price, sumPrice, category, img, id }) {
    this.title = title;
    this.price = price;
    this.sumPrice = sumPrice;
    this.category = category;
    this.img = img;
    this.id = id;
    this.totalPrice = 0;
    this.count = 1;
    product.push(this);
  }
}


const product1 = new products({
  title: "bus",
  price: "200",
  sumPrice: "0",
  category: "accessories",
  img: "images/category-banner1.jpg",
  id: 1,
});
const product2 = new products({
  title: "car",
  price: "200",
  sumPrice: "0",
  category: "accessories",
  img: "images/category-banner2.jpg",
  id: 2,
});
const product3 = new products({
  title: "bike",
  price: "300",
  sumPrice: "0",
  category: "phones",
  img: "images/category-banner3.jpg",
  id: 3,
});
const product4 = new products({
  title: "home",
  price: "400",
  sumPrice: "0",
  category: "cars",
  img: "images/category-banner4.jpg",
  id: 4,
});

function drawProducts() {
  for (let i = 1; i < product.length; i++) {
    allProducts.innerHTML += `
    <div class="productItem col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-4 mt-2">
    <div class="card ProdcutCart">
        <img src="${product[i].img}" class="card-img-top" alt="product image">
        <div class="card-body text-start">
          <h5 class="card-title">Title: ${product[i].title}</h5>
          <h5 class="card-text">Price: ${product[i].price} L.E</h5>
          <h5 class="card-Category">Category: ${product[i].category}</h5>
          <div class="d-flex" style="justify-content: space-between;"> 
            <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
            <button class="btn btn-danger btn_remove" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove item</button>
            <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" id="${product[i].id}00000" style="font-size: 24px; color: #B9B8B8;" onclick='addFavourite(this.id)'></i></a>
        </div> 
        </div><!-- //card-body -->
          </div><!-- //card -->
           </div><!-- //productItem -->
    `
  }

}
drawProducts();
function addItems(id) {
  let addItem = document.getElementById(id);

  let removeItem = document.getElementById(id + "0000");
  if (localStorage.getItem("email") && localStorage.getItem("firstName")) {
    addItem.style.display = "none";
    removeItem.style.display = "block";
    userProducts.push(product[id]);
    localStorage.setItem("items", JSON.stringify(userProducts));
    cartDraw();
    
    bdg_counter.innerHTML = userProducts.length;
  } else {
    setTimeout(() => {
      location.assign("login.html");
    }, 1000);
  }
}

function removeItems(id) {
  let removeItem = document.getElementById(id);
  let addItem = document.getElementById(id / 10000);
  addItem.style.display = "block";
  removeItem.style.display = "none";

  let id2 = id / 10000;

  var ele = userProducts.findIndex((x) => {
    return x.id == id2;
  });
  userProducts.splice(ele, 1);
  if (userProducts.length == 0) {
    bdg.style.display = "none";
  }
  localStorage.setItem("items", JSON.stringify(userProducts));
  cartDraw();
  bdg_counter.innerHTML = userProducts.length;
}
let total_price = document.querySelector("#total_price");
//============cart draw===============================
function cartDraw() {
  bdg_counter.innerHTML = userProducts.length;
  if (userProducts.length != 0) {
    if (userProducts.length != 0) {
      // cart.style.display='block';
      cardProducts.innerHTML = "";

      for (let i = 0; i < userProducts.length; i++) {
        cardProducts.innerHTML += `
                  <div class="cart_list">
                    
                    <div class="cart_list_title">
                      <span">${userProducts[i].title}</span>
                      <span" class="real_price">${userProducts[i].price}</span>
                    
                    </div>
                    <div class="cart_list_plus_minus">
                    <a href="#" class="minus"><i class="fas fa-minus text-danger" onclick="minusBtn(${userProducts[i].id})"></i></a>
                    <span >${userProducts[i].count}</span>
                    <a href="#" class="pluss"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold; "onclick="plusBtn(${userProducts[i].id})"></i></a>
                     
                    </div>
                
                    </div>  <!-- // cart_list -->
    
                    
    
                            `;
      }
      cardProducts.innerHTML += `
                        
                  
                        <a style="display: block; height: 30px; margin-left: 15px;"> Total Price: ${userProducts[0].totalPrice} </a>
                        
                        `;
      cardProducts.innerHTML += `
                            
                        <div class="viewProduct">
                        
                        
                        <a href="card.html" >View All Products</a>
                        </div>`;
    } else {
      cardProducts.style.display = "none";
    }
  } else if (localStorage.getItem("items")) {
    userProducts = JSON.parse(localStorage.getItem("items"));
    if (userProducts.length != 0) {
      cartDraw();
    }

    let btns = userProducts.map((arr) => {
      return arr.id;
    });
    btns.forEach((ele) => {
      document.getElementById(ele).style.display = "none";
      document.getElementById(ele+"0000").style.display = "block";
    });
  } else {
  }
}
cartDraw();
//===================PLUS & MINUS BUTTONS====================

//================ 1- Plus btn===============
function plusBtn(id) {
  let real_price = document.querySelector(".real_price");
  let sum_price = document.querySelector(".sum_price");

  ele = userProducts.find((x) => {
    return x.id == id;
  });

  ele.count++;

  // let quantity = ele.count

  // const unitePrice = ele.price

  // const unitePrice_Parse = parseInt(unitePrice)

  // let result = unitePrice_Parse  * quantity

  // ele.totalPrice = result

  localStorage.setItem("items", JSON.stringify(userProducts));

  cartDraw();
}

//================ 2- minus btn===============

function minusBtn(id) {
  const removeItem_btn = document.getElementById(id + "0000");
  const addItem_btn = document.getElementById(id);
  ele = userProducts.find((x) => {
    return x.id == id;
  });
  if (userProducts.length != 1) {
    if (ele.count != 1) {
      ele.count--;
      localStorage.setItem("items", JSON.stringify(userProducts));
      cartDraw();
    } else {
      let index = userProducts.indexOf(ele);
      userProducts.splice(index, 1);
      console.log(userProducts)
      localStorage.setItem("items", JSON.stringify(userProducts));
      //to switch from remove btn to add item btn in the product cart
      removeItem_btn.style.display = "none";
      addItem_btn.style.display = "block";

      cartDraw();
    }
  }
}
//======================FAVOURITE ICON==================

function addFavourite(id, e) {
  const ele = document.getElementById(id);
  mainId = id / 100000;
  if (localStorage.getItem("email") && localStorage.getItem("firstName")) {
    // to check is there a user
    if (ele.style.color == "red") {
      ele.style.color = "rgb(185, 184, 184)"; // to change color to gray color if it was red when click

      favourite.splice(
        favourite.findIndex((x) => {
          return favourite.id == id;
        }),
        1
      ); //to delete date from favo if fave color was red and clicked to remove  from favo
      localStorage.setItem("favourite", JSON.stringify(favourite));
    } else {
      //if user registered and clicked on favo
      ele.style.color = "red"; //change color to red
      favourite.push(product[id / 100000]); //add in favourite array [] this id
      localStorage.setItem("favourite", JSON.stringify(favourite));
    }
  } else {
    // if there is no user and click on favo go to login page
    setTimeout(() => {
      location.assign("login.html");
    }, 500);
  }

  addEventListener("click", (e) => e.preventDefault());
}
// =============FAVO ICON COLOR if there is data ==============
if (localStorage.getItem("favourite")) {
  let fav = JSON.parse(localStorage.getItem("favourite"));
  // if there is data of an favo item in local storage change the color if item id to red to make selected favo item on red color
  for (let i = 0; i < fav.length; i++) {
    let x = document.getElementById(fav[i].id + "00000");
    x.style.color = "red";
  }
}

//=======================SEARCHING========================

//==================search by name ==================
searchInput.addEventListener("keyup", () => {
  allProducts.innerHTML = "";

  if (searchInput.value) {
    if (searchType.value == "Search by Name") {
      for (let i = 1; i < product.length; i++) {
        // we use includes() to check if the value existed in the array or not
        if (product[i].title.toLowerCase().includes(searchInput.value)) {
          allProducts.innerHTML += `
    <div class="productItem col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-4 mt-2">
    <div class="card ProdcutCart">
        <img src="${product[i].img}" class="card-img-top" alt="product image">
        <div class="card-body text-start">
          <h5 class="card-title">Title: ${product[i].title}</h5>
          <h5 class="card-text">Price: ${product[i].price} L.E</h5>
          <h5 class="card-Category">Category: ${product[i].category}</h5>
          <div class="d-flex" style="justify-content: space-between;"> 
            <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
            <button class="btn btn-danger btn_remove" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
            <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" id="${product[i].id}00000" style="font-size: 24px; color: #B9B8B8;" onclick='addFavourite(this.id)'></i></a>
        </div> 
        </div><!-- //card-body -->
          </div><!-- //card -->
           </div><!-- //productItem -->
    `;
        }
      }
    } else {
      //search by category
      for (let i = 1; i < product.length; i++) {
        if (product[i].category.toLowerCase().includes(searchInput.value)) {
          allProducts.innerHTML += `
                        <div class="productItem col col-6 col-sm-6 col-md-4 col-lg-3 col-xl-4 mt-2">
                        <div class="card ProdcutCart">
                            <img src="${product[i].img}" class="card-img-top" alt="product image">
                            <div class="card-body text-start">
                              <h5 class="card-title">Title: ${product[i].title}</h5>
                              <h5 class="card-text">Price: ${product[i].price} L.E</h5>
                              <h5 class="card-Category">Category: ${product[i].category}</h5>
                              <div class="d-flex" style="justify-content: space-between;"> 
                                <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
                                <button class="btn btn-danger btn_remove" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
                                <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" id="${product[i].id}00000" style="font-size: 24px; color: #B9B8B8;" onclick='addFavourite(this.id)'></i></a>
                            </div> 
                            </div><!-- //card-body -->
                              </div><!-- //card -->
                               </div><!-- //productItem -->
                        `;
        }
      }
    }
  } else {
    drawProducts();
  }
});

//=====================OWL CAROUSEL================

$(document).ready(function () {
  $(".owl-carousel").owlCarousel();
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 1000,
  autoplayHoverPause: true,

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});
