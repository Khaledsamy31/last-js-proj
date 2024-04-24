let allProducts = document.querySelector(".productContent")
let bdg_counter = document.querySelector(".bdg_counter")
let bdg = document.querySelector(".bdg")

let cardsproductsDiv = document.querySelector(".carts_products div") //select cards_products then first div

//===========================SHOPING CARD ICON===================
let shopping_card_icon = document.querySelector('.shopping_cart')
let cardProducts = document.querySelector(".carts_products")
shopping_card_icon.addEventListener("click", opencard)


function opencard(){
    if(cardsproductsDiv.innerHTML != ""){ //if shopping icon not empty check if it display bloc do it none when click and if it none do t block when click
        if(cardProducts.style.display == "block"){
            cardProducts.style.display = "none"
        }else {
            cardProducts.style.display= "block"
        }
    }
}

//====================== add & remove btn ==========================




let favourite=[];
let product=[]
product.push('nothing')
let userProducts=[]


class products{
    constructor({title,price,category,img,id}){
        this.title=title;
        this.price=price;
        this.category=category,
        this.img=img
        this.id=id
       this.count=1
        product.push(this);
    }
}

const product1=new products({title: "phone",price:'180 L.E',category:'fashion',img:'images/category-banner1.jpg',id:1});
const product2=new products({title: "car",price:'180 L.E',category:'fashion',img:'images/category-banner2.jpg',id:2});
const product3=new products({title: "bike",price:'180 L.E',category:'fashion',img:'images/category-banner3.jpg',id:3});
const product4=new products({title: "home",price:'180 L.E',category:'fashion',img:'images/category-banner4.jpg',id:4});



function drawProducts(){
for(let i = 1; i< product.length; i++){
    allProducts.innerHTML+=`
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
            <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" id="${product[i].id}favo" style="font-size: 24px; color: #B9B8B8;"></i></a>
        </div> 
        </div><!-- //card-body -->
          </div><!-- //card -->
           </div><!-- //productItem -->
    `
}
    
    }
drawProducts()
function addItems(id){
   
    let addItem = document.getElementById(id)

    let removeItem= document.getElementById(id+"0000")
     if(localStorage.getItem('email')  && localStorage.getItem('firstName')){
         addItem.style.display= 'none';
         removeItem.style.display='block';
         userProducts.push(product[id])
         localStorage.setItem('items',JSON.stringify(userProducts));
         cartDraw()
         bdg_counter.innerHTML=userProducts.length
     }else{
         setTimeout(()=>{
                location.assign('login.html')
         },1000)
      
     }
 }

 function removeItems(id){
    let removeItem= document.getElementById(id)
    let addItem= document.getElementById(id/10000);
    addItem.style.display='block';
    removeItem.style.display='none';

    let id2=id/10000

    var ele= userProducts.findIndex((x)=>{
        return x.id==id2
    })
    userProducts.splice(ele,1)
        if(userProducts.length==0){
            bdg.style.display='none';
        }
    localStorage.setItem('items',JSON.stringify(userProducts));
    cartDraw()
    bdg_counter.innerHTML=userProducts.length

} 

function cartDraw(){
    bdg_counter.innerHTML=userProducts.length
    if(userProducts.length != 0){
            if(userProducts.length !=0){
                // cart.style.display='block';
                cardProducts.innerHTML=''
                        for(let i=0;i<userProducts.length;i++){
                            cardProducts.innerHTML += `
              <div class="cart_list">
                
                <div class="cart_list_title">
                  <span">${userProducts[i].title}+ ${userProducts[i].price}</span>
                </div>
                <div class="cart_list_plus_minus">
                  <span >${userProducts[i].count}</span>
                  <a href="#" class="pluss ms-2"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold; "onclick="plusBtn(${userProducts[i].id})"></i></a>
                  <a href="#" class="minus ms-4"><i class="fas fa-minus text-danger"></i></a>
                </div>
                </div>  <!-- // cart_list -->

                

                        `
                        }
            }else{
                cardProducts.style.display='none';
            }
    }else if(localStorage.getItem('items')){
        userProducts=JSON.parse(localStorage.getItem('items'))
        if(userProducts.length!=0){
                    cartDraw()

        }
        
        let btns=userProducts.map((arr)=>{
            return arr.id;
        })
        btns.forEach(ele => {
            document.getElementById(ele).style.display='none'
            document.getElementById(ele+'btn_remove').style.display='block'
        });
    }else{

    }
}
cartDraw()

function plusBtn(id){
    ele=userProducts.find((x)=>{
       return x.id==id
    })
    ele.count++;
    localStorage.setItem('items',JSON.stringify(userProducts))
    cartDraw()
}