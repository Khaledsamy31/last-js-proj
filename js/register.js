let fName = document.getElementById("fName")
let lName = document.getElementById("lName")
let email = document.getElementById("email")
let pwd = document.getElementById("pwd")
let re_pwd = document.getElementById("re_pwd")
let sing_up = document.getElementById("sing_up")

sing_up.addEventListener("click", function(e){
    e.preventDefault()//this to stop refresh the page after click siginup/ or after submit, so we should do it when we use submit or forms
    
    if(fName.value === ""|| lName.value === "" || email.value ==="" || pwd.value === "" || re_pwd.value ===""){

        fName.setAttribute("placeholder", "first name is required!")
        fName.classList.add("ph")
    

        lName.setAttribute("placeholder", "last name is required!")
        lName.classList.add("ph")

        email.setAttribute("placeholder", "email is required!")
        email.classList.add("ph")

        pwd.setAttribute("placeholder", "password is required!")
        pwd.classList.add("ph")

        re_pwd.setAttribute("placeholder", "password is required!")
        re_pwd.classList.add("ph")
    }else if(pwd.value !== re_pwd.value){
        pwd.style.border = '2px solid red'
        re_pwd.style.border = '2px solid red'
        pwd.value = ""
        re_pwd.value = ""
        
        pwd.setAttribute("placeholder","invalid password")
        pwd.classList.add("ph")
        
        re_pwd.setAttribute("placeholder","invalid password")
        re_pwd.classList.add("ph")
    }else{
        localStorage.setItem("firstName", fName.value )// to save/push this item in local storage
        localStorage.setItem("lastName", lName.value )// to save/push this item in local storage
        localStorage.setItem("email", email.value )// to save/push this item in local storage
        localStorage.setItem("password", pwd.value )// to save/push this item in local storage
               
        //to go back to login page after register data
        setTimeout(()=>{
            window.location = "login.html"
        }, 1000)// it means after register the data go to login page after 1 sec
    }
})

