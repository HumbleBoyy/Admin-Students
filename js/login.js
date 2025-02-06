let elLoginForm = document.querySelector(".login_form")
let elFormBtn = document.querySelector(".form_btn")


elLoginForm.addEventListener("submit", (e)=> {
    e.preventDefault()


    const userData = {
        username: e.target.username.value,
        password: e.target.password.value
    }
    elFormBtn.innerHTML = `<img src="./images/loader.png" alt="loader" width="50" height="50">`

    if(userData.username === "Asadulloh" && userData.password === "1234"){
        setTimeout(()=> {
            elFormBtn.innerHTML = `SIGN IN`
            localStorage.setItem("user", JSON.stringify(userData))
            location.pathname = "./mainPage.html"
        },1000)
    }else{
        setTimeout(()=> {
            elFormBtn.classList.add("error_warning")
            elFormBtn.innerHTML = `Wrong Password`
        },1000)
        setTimeout(()=> {
             elFormBtn.classList.remove("error_warning")
            elFormBtn.innerHTML = `SIGN IN`
        },4500)
    }

})