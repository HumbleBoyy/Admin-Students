let elAdminName = document.querySelector(".admin_name")
let user = JSON.parse(localStorage.getItem("user"))
elAdminName.innerHTML = user.username
// Logout function start
function handleLogut(){
    location.pathname = "./index.html"
}
// Logout function start