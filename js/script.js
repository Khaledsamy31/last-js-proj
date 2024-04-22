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


