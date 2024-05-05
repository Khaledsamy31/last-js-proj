

let allProducts = document.querySelector(".productContent");
let bdg_counter = document.querySelector(".bdg_counter");
let bdg = document.querySelector(".bdg");
let searchInput = document.querySelector(".searchInput");
let searchType = document.querySelector(".searchType");
// to get items from local storage
const items =JSON.parse(localStorage.getItem('items'));
let cardsproductsDiv = document.querySelector(".carts_products div"); //select cards_products then first div
//===========================SHOPING CARD ICON===================
let shopping_card_icon = document.querySelector(".shopping_cart");
let cardProducts = document.querySelector(".carts_products");

// to show/hide cart list
shopping_card_icon.addEventListener("click", opencard);
function opencard() {
  const items =JSON.parse(localStorage.getItem('items'));
  // if there is items in local storage check if it's block change it to none when click, else if cart list is none change it to block when click & change the bdg (parent of cart list) to block
  if (items != 0) {
    //if shopping icon not empty check if it display bloc do it none when click and if it none do t block when click
    if (cardProducts.style.display == "block") {
      cardProducts.style.display = "none";
    } else {
      bdg.style.display = "block";
      cardProducts.style.display = "block";
    }
  }
}

//====================== add & remove btn ==========================
// 3 empty array 1 for favo, 1 for product, 1 for user choice
let favourite = [];
let product = [];
// too make product array != null push("nothing")
product.push("nothing");
let userProducts = [];

// constructor carry title..price..sumPrice (this for cart list).. category.. img.. id
class products {
  constructor({ title, price, sumPrice, category, img, id }) {
    this.title = title;
    this.price = price;
    this.sumPrice = sumPrice;
    this.category = category;
    this.img = img;
    this.id = id;
    this.totalPrice = 0;
    //count is counter for number of items in cart list
    this.count = 1;
    // this here for class products, so this to add class content in product array, so producat array now carry all this data
    product.push(this);
  }
}

// to take copy of classt products
const product1 = new products({
  title: "bus",
  price: 200,
  sumPrice: 0,
  category: "accessories",
  img: "images/category-banner1.jpg",
  id: 1,
});
const product2 = new products({
  title: "car",
  price: 200,
  sumPrice: 0,
  category: "accessories",
  img: "images/category-banner2.jpg",
  id: 2,
});
const product3 = new products({
  title: "bike",
  price: 300,
  sumPrice: 0,
  category: "phones",
  img: "images/category-banner3.jpg",
  id: 3,
});
const product4 = new products({
  title: "home",
  price: 400,
  sumPrice: 0,
  category: "cars",
  img: "images/category-banner4.jpg",
  id: 4,
});

//===================================TO DRAW PRODUCTS===========================================
function drawProducts() {
  // product array now carry all data existed in class product, so it will keep draw copied products untill product.lenth == i
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
// on line 104 (remove btn) we add 0000 for id to make id of remove different than id of add to cart and for favo icon added 0000 after id
}
drawProducts();

//===============================function of add items ===========================================

// we use this func OnClick event when click on add to cart or remove item
function addItems(id) {

  let addItem = document.getElementById(id);
// to identification id of remove and add to it 0000
  let removeItem = document.getElementById(id + "0000");
 

 // if user already logged and user clicked on add to cart make add product none and remove item block
  if (localStorage.getItem("email") && localStorage.getItem("firstName")) {
    addItem.style.display = "none";
    removeItem.style.display = "block";
    // product array carry all data in class products
    // userproducts.push(product[id]) to add the product we clicked on it, in userProducts array, so userProducts carry all items we clicked on it
    userProducts.push(product[id]);
    // to save products we clicked on it in local storage
    localStorage.setItem("items", JSON.stringify(userProducts));
    cartDraw();
    successAnimate()
    // to make counter number == items we added on cart
    bdg_counter.innerHTML = userProducts.length;
  } else {
    // if user wasn't logged in go back to login page
    setTimeout(() => {
      location.assign("login.html");
    }, 1000);
  }
}

function removeItems(id) {
  // removeItem btn id = the id of clicked product (when click on remove)
  let removeItem = document.getElementById(id);
  // addItem btn = id of removed btn / 10000 cuz we added on removed btn 0000 so removed btn id / 10000 = id of addItem

  let addItem = document.getElementById(id / 10000);
  // to show add item btn & hide remove btn when we click on remove btn
  addItem.style.display = "block";
  removeItem.style.display = "none";
  // id2 = id / 10000 to get the id number of remove item without 0000 cuz we will remove the product by the id of product
  // so id2 = main id of product
  let id2 = id / 10000;
  
  // ele = the id of the product we need to delete
  var ele = userProducts.findIndex((x) => {
    //here return the id of product that == id2 (the id of remove item after we removed 0000 number from the id)
    return x.id == id2;
  });
  userProducts.splice(ele, 1);
  if (userProducts.length == 0) {
    // if userProduct is empty hide the cart list and save in local storage (items) & make the counter number = user product.length
    bdg.style.display = "none";
  }
  localStorage.setItem("items", JSON.stringify(userProducts));
  cartDraw();
  bdg_counter.innerHTML = userProducts.length;
}
let total_price = document.querySelector("#total_price");









//============cart draw===============================

function cartDraw() {
  // to make counter number == user product.length
  bdg_counter.innerHTML = userProducts.length;
  if (userProducts.length != 0) {
    if (userProducts.length != 0) {
      // cart.style.display='block';
      cardProducts.innerHTML = "";

      for (let i = 0; i < userProducts.length; i++) {
        if(userProducts[i].sumPrice == 0){
          
          cardProducts.innerHTML += `
          <div class="cart_list">
                      
          <div class="cart_list_title">
                        <span">${userProducts[i].title}</span>
                        <span" class="real_price">${userProducts[i].price}</span>
                        
                      
                      </div>
                      <div class="cart_list_plus_minus">
                      <a style=" cursor: pointer;" class="minus"><i class="fas fa-minus text-danger" onclick="minusBtn(${userProducts[i].id})"></i></a>
                      <span >${userProducts[i].count}</span>
                      <a  class="pluss"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold;  cursor: pointer; "onclick="plusBtn(${userProducts[i].id})"></i></a>
                       
                      </div>
                  
                      </div>  <!-- // cart_list -->
      
                      
      
                              `
                             
        }else{
          cardProducts.innerHTML += `
          <div class="cart_list">
            
            <div class="cart_list_title">
              <span">${userProducts[i].title}</span>
             
              <span" class="sum_price">${userProducts[i].sumPrice}</span>
            
              </div>
              <div class="cart_list_plus_minus">
            <a style=" cursor: pointer;" class="minus"><i class="fas fa-minus text-danger" onclick="minusBtn(${userProducts[i].id})"></i></a>
            <span >${userProducts[i].count}</span>
            <a  class="pluss"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold;  cursor: pointer; "onclick="plusBtn(${userProducts[i].id})"></i></a>
             
            </div>
        
            </div>  <!-- // cart_list -->
            
            

                    `
                  
        }
      }
      
      cardProducts.innerHTML += `
      
                  
                        <div style="display: block; height: 30px; margin-left: 15px;" id="totalPrice"> Total Price: </div>
                        
                        `;
                        let totalPrice = document.querySelector("#totalPrice");
                        
                        totalPrice.innerHTML = "Total price: " + getTotalPrice() + " L.E"
                         
                    
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
      // to hide add to cart when click on it and show remove product
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

  const quantity = ele.count

  const unitePrice_String = ele.price
  
 

  const unitePrice_Parse = parseInt(unitePrice_String)

  const quantity_price =  quantity * unitePrice_Parse

 ele.sumPrice = quantity_price


console.log(ele.price)


  // let result = unitePrice_Parse  * quantity

  // ele.totalPrice = result

  localStorage.setItem("items", JSON.stringify(userProducts));
  getTotalPrice()
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

      const quantity = ele.count

      const unitePrice_String = ele.price
      
     
    
      const unitePrice_Parse = parseInt(unitePrice_String)
    
      const quantity_price =  quantity * unitePrice_Parse
    
     ele.sumPrice = quantity_price
      localStorage.setItem("items", JSON.stringify(userProducts));
      
      cartDraw();
    } else {
      

      let index = userProducts.indexOf(ele);
      

      
      userProducts.splice(index, 1);
      
      localStorage.setItem("items", JSON.stringify(userProducts));
      //to switch from remove btn to add item btn in the product cart
      removeItem_btn.style.display = "none";
      addItem_btn.style.display = "block";
      
      cartDraw();
    }
  }else{
    
    if (ele.count != 1){
      ele.count--;

      const quantity = ele.count

      const unitePrice_String = ele.price
      
     
    
      const unitePrice_Parse = parseInt(unitePrice_String)
    
      const quantity_price =  quantity * unitePrice_Parse
    
     ele.sumPrice = quantity_price
      localStorage.setItem("items", JSON.stringify(userProducts));
      cartDraw();
    
    }else{
      let index= userProducts.indexOf(ele)
      userProducts.splice(index,1)
      localStorage.setItem('items',JSON.stringify(userProducts))
      cardProducts.style.display= 'none';
      
      removeItem_btn.style.display = "none";
      addItem_btn.style.display = "block";
      bdg_counter.innerHTML=0
      
      cartDraw();
    }
    
  }
}

    //===============TOTAL PRICE ================
    function getTotalPrice(){
      // to get data from local storage
      const items =JSON.parse(localStorage.getItem('items'));
      let totalPrice = document.querySelector("#totalPrice");

      let sum=0;
     // prices carry the price of removed item and turn it to number data type
      let prices= items.map((ele) =>{
        // price carry the price of removed item but as string data type
        let price = ele.price.toString().split(" ")
        // here we return price in data type number and save it in prices variable
        return parseInt(price)
        
      })
      // sum now = prices of clicked product (the price with data type number) * the counter number
      for(let i in items){
        sum += prices[i] * parseInt(items[i].count) 
        
        
      }
     
      return sum

    
  }
  
    getTotalPrice()

//======================FAVOURITE ICON==================

function addFavourite(id) {
  // ele is carry the id of clicked product (when click on favo)
  const ele = document.getElementById(id);
  console.log(ele)
  // mainId = id of favo icon after we remove 00000 number from the id, so main id = the real id of product
  mainId = id / 100000;
  // to check is there a user
  if (localStorage.getItem("email") && localStorage.getItem("firstName")) {
    // if the color of favo is red change it to gray then delete the item from favo
    if (ele.style.color == "red") {
   // gray color
      ele.style.color = "rgb(185, 184, 184)";
// to delete the item from favo
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
      // to add the product we clicked on favo in favo array [].. id /100000 = the main id or the real id of product
      favourite.push(product[id / 100000]); //add in favourite array [] this id
      // save favo in local storage
      localStorage.setItem("favourite", JSON.stringify(favourite));
    }
  } else {
    // if there is no user and click on favo go to login page
    setTimeout(() => {
      location.assign("login.html");
    }, 500);
  }
// to stop auto page refresh
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
        if (product[i].title.toLowerCase().includes(searchInput.value.toLowerCase())) {
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
        if (product[i].category.toLowerCase().includes(searchInput.value.toLowerCase())) {
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
//===============sweet alert2 libery===============
// success animate


function successAnimate(){

  swal({
    position: "top-end",
icon: "success",
title: "The product has been successfully added to the cart",
timer: 1500,
button: false,

  })
}