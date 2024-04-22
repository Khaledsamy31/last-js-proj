let login_div = document.querySelector("#login_div")
let user_info = document.querySelector("#user_info")
let user = document.querySelector("#user")

console.log(user)

if(localStorage.getItem("email")){
    login_div.remove()
    setTimeout(()=>{

        user_info.style.display = "flex"
        // user_info.style.opacity = "1"
        
        user.innerHTML = "welcome " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")

    },)// disabled setTimeOut
}

let logOutBtn = document.querySelector("#LogOut")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})