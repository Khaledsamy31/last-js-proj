

  //======================
  const items_content = document.querySelector(".items_content")
  const items =JSON.parse(localStorage.getItem('items'));
  const totalPrice = document.querySelector("#totalPrice")
  const all_products_list = document.querySelector(".all_products_list")
  const favourite =JSON.parse(localStorage.getItem('favourite'));
  const owl_carousel = document.querySelector(".owl-carousel")
 
  
  function drawUserProduct(){
    items_content.innerHTML=''
    for(let i in items){

      items_content.innerHTML+=`
      <div class="productItem col col-10 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2 m-auto">
      <div class="card ProdcutCart" style="max-width: 540px; background-color: #E6E6E6; text-align: start;">
        <div class="row g-0">
          <div class="col col-8 col-sm-3 col-md-3 col-lg-3 col-xl-4 m-auto mt-3">
            <img src="images/category-banner1.jpg" class="img-fluid rounded-4" alt="...">
          </div>
          <div class=" col-sm-8 col-md-8  col-12">
            <div class="card-body">
              <h5 class="card-title">Title: ${items[i].title} </h5>
              <h5 class="card-text">Price: ${items[i].price} L.E</h5>
              <h5 class="card-Category">Category: ${items[i].category}</h5>
            </div>
            <div class="d-flex justify-content-evenly mb-3">
    
              <div class="me-5"> <button class="btn btn-danger" id="${items[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
              </div>
              <div class="cart_list_plus_minus ms-5 ">
                <a href="#" class="minus"><i class="fas fa-minus text-danger" style="font-size: 20px; font-weight: bold;" onclick="minusBtn(${items[i].id})"></i></a>
                <span style="font-size: 25px; font-weight: bold;">${items[i].count}</span>
                <a href="#" class="pluss"><i class="fas fa-plus text-success" style="font-size: 25px; font-weight: bold; "onclick="plusBtn(${items[i].id})"></i></a>
              </div>
            </div>
          </div>
        </div>
             </div><!-- //ProdcutCart -->
  </div><!-- //productItem -->
        `
    }
}
drawUserProduct()

  function drawCartDetails(){
    all_products_list.innerHTML=''

    all_products_list.innerHTML+=`
    <div>
    <h2 class="text-center cart_details_title">Cart details</h2>
  </div>
    `
    for(let i in items){

        all_products_list.innerHTML+=`
        <div class="cart_list" style="background-color: #F1EBEB;">
                        
        <div class="cart_list_title">
          <span">${items[i].title}</span>
          <span" class="real_price">${items[i].price} L.E</span>
        
        </div>
        <div class="cart_list_plus_minus">
          <a href="#" class="minus"><i class="fas fa-minus text-danger" onclick="minusBtn(${items[i].id})"></i></a>
          <span >${items[i].count}</span>
        <a href="#" class="pluss"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold; "onclick="plusBtn(${items[i].id})"></i></a>
        </div>
        </div>  <!-- // cart_list -->
          `

    }
}
drawCartDetails()


//========================TOTAL PRICE==========================
const real_price = document.querySelector(".real_price")
function getTotalPrice(){
  let sum=0;
 
  let prices= items.map((ele) =>{
    let price = ele.price.toString().split(" ")
    return parseInt(price[0])
  })
  for(let i in items){
    sum += prices[i] * parseInt(items[i].count) 
}
totalPrice.innerHTML=sum+'$';

}
getTotalPrice()

function removeItems(id){
  var index= items.findIndex((x)=>{
   return x.id==id
})
items.splice(index,1)
localStorage.setItem('items',JSON.stringify(items))
drawUserProduct()
getTotalPrice()
drawCartDetails()
}

function plusBtn(id , e){
  ele=items.find((x)=>{
     return x.id==id
  })
  ele.count++;
  localStorage.setItem('items',JSON.stringify(items))
  drawUserProduct()
  getTotalPrice()
  drawCartDetails()

}

function minusBtn(id){
  ele=items.find((x)=>{
     return x.id==id
  })
          if(ele.count !=1){
            // to minus item count if it more than 1
              ele.count--;
              localStorage.setItem('items',JSON.stringify(items))
              drawUserProduct()
              getTotalPrice()
              drawCartDetails()
          }else{
            //to remove item if count is 1
              let index= items.indexOf(ele)
              items.splice(index,1)
              localStorage.setItem('items',JSON.stringify(items))
              drawUserProduct()
              getTotalPrice()
              drawCartDetails()
          }
  }

//favo draw

function drawFav(){
  owl_carousel.innerHTML='';
  for(let i in favourite){
    owl_carousel.innerHTML+=`
    <div class="items imgs">
    <div class="productItem col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2 m-auto">
  <div class="card ProdcutCart" style="max-width: 540px; background-color: #E6E6E6; text-align: start;">
    <div class="row g-0">
      <div class="col col-12 col-sm-10 col-md-6 col-lg-3 col-xl-6 m-auto mt-3">
        <img src="images/category-banner1.jpg" class="img-fluid rounded-4" alt="...">
      </div>
      <div class=" col-sm-12 col-md-8 col-xl-12 col-12">
        <div class="card-body">
          <h5 class="card-title">Title: 1</h5>
          <h5 class="card-text">Price: 200,000 L.E</h5>
          <h5 class="card-Category">Category: phones</h5>
          <a href="#" style=" text-align: end; display: block;" ><i class="fas fa-heart" style="font-size: 24px; color: red;" onclick='removeFavourite(${favourite[i].id})' ></i></a>
        </div>
          
        </div>
      </div>
    </div>
      </div><!-- //ProdcutCart -->
     </div><!-- carousel END -->
      `
  }
}
drawFav()

//===================remove favo item
function removeFavourite(id){
  let index =favourite.findIndex((x)=>{
    return  x.id==id
  })
  console.log(index)
  favourite.splice(index,1)
  localStorage.setItem('favourite',JSON.stringify(favourite))
  

  addEventListener('click',(e)=> e.preventDefault())
  location.reload()
  drawFav()
}

//============== OWL CAROUSEL========================
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
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });