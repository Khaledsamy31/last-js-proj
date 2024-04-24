let email = document.getElementById("email")
let pwd = document.getElementById("pwd")
let sing_in = document.getElementById("sing_in")

//to get data from local storage
let getFirstName = localStorage.getItem("firstName")
let getLastName = localStorage.getItem("lastName")
let getEmail_storage = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

sing_in.addEventListener("click", function(e){
    e.preventDefault() //this to stop refresh the page after click siginup/ or after submit, so we should do it when we use submit or forms
    if(email.value === "" || pwd.value === ""){
        email.style.border = '2px solid red'
        pwd.style.border = '2px solid red'

        email.setAttribute("placeholder","Enter your email")
        email.classList.add("ph")

        pwd.setAttribute("placeholder","Enter your password")
        pwd.classList.add("ph")
    }else if(getEmail_storage.trim() === email.value.trim() && getPassword.trim() === pwd.value.trim()){
        email.style.border = 'none'
        pwd.style.border = 'none'
        

        setTimeout(()=>{

            window.location = "index.html"
            alert(`welcome ${getFirstName} ${getLastName}`)
        }, 1000)

    }else if(email.value !== getEmail_storage){
        email.value = ""
        email.style.border = "2px solid red"
        email.setAttribute("placeholder", "email not existed!")
        email.classList.add('ph')
    }else{
        pwd.value = ""
        pwd.setAttribute("placeholder", "password isn't correct")
        pwd.classList.add('ph')
        pwd.style.border = "2px solid red"
    }
})






function cartDraw(){
    bdg_counter.innerHTML=userProducts.length
    if(userProducts.length != 0){
            if(userProducts.length !=0){
                // cart.style.display='block';
                cardProducts.innerHTML=''
                        for(let i=0;i<userProducts.length;i++){
                            cardProducts.innerHTML+=`
                            <div>
                
                            <ul>
                              <li style="list-style: none; transform: translate(-20px,0px);">
                                <span">${userProducts[i].title}+ ${userProducts[i].price}</span>
                            
                                <div class="plus" style="display: inline-block; transform: translate(25px,0px);">
                                     <span >${userProducts[i].count}</span>
                                     <a href="#" class="pluss ms-1"><i class="fas fa-plus text-success" style="font-size: 20px; font-weight: bold;"></i></a>
                                     <a href="#" class="minus ms-1"><i class="fas fa-minus text-danger"></i></a>
                                    </div>
                                  </div> 

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

