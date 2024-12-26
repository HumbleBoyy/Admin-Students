let elAdminName = document.querySelector(".admin_name")
let user = JSON.parse(localStorage.getItem("user"))
elAdminName.innerHTML = user.username
const HTTP = "http://localhost:3000/students"

let elModalWrapper = document.querySelector(".modal_wrapper")
let elModalInner = document.querySelector(".modal_inner")
let elStudentsList = document.querySelector(".students_list")


// Add Function start
elModalWrapper.addEventListener("click", (e)=> {
    if(e.target.id === "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})

function handleAddBtn(){
    elModalWrapper.classList.remove("scale-0")

    elModalInner.innerHTML = `
        <form class="addStudents flex flex-col justify-center gap-5">
              <label class="block  mx-auto w-[200px]">
                  <input type="file" class="input_file hidden">
                  <img src="./images/example.jpg" alt="altImage" width="200" height="200" class="image w-full">
              </label>

              <div>
                <label class="text-[20px] text-slate-500 font-bold">Name</label>
                <input required type="text" name="username" placeholder="Name" class="w-full h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Email</label>
                <input required type="email" name="email" placeholder="Email" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Phone</label>
                <input required type="tel" name="phone" placeholder="Phone" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Enroll Number</label>
                <input required type="number" name="enrollNumber" placeholder="Enroll Number" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Date admission</label>
                <input type="date" name="dateAdmisson" placeholder="Date admission" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
              </div>
              <button type="submit" class="addBtn w-full bg-yellow-500 h-[50px] rounded-xl font-bold text-white text-[20px]">Add</button>
           </form>
    `

    let elInputFile = document.querySelector(".dateAdmisson")
    let elImage = document.querySelector(".image")

    elInputFile.addEventListener("change", (e)=> {
        elImage.src = URL.createObjectURL(e.target.files[0])
    })

    let elStudentsForm = document.querySelector(".addStudents")

    elStudentsForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const data = {
            username:e.target.username.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            enrollNumber:e.target.enrollNumber.value,
            dateAdmisson:e.target.dateAdmisson.value,
            image:elImage.src
        }
        console.log(studentsData)

        axios.post(HTTP, data).then(res => {
            alert("Success")
            e.target.reset()
        })
    })
}
// Add Function end

// Get users start
function renderUsers(list){
    axios.get(HTTP)
    .then(res => {
        res.data.map((item, index) => {
            let elTr = document.createElement("tr")
            elTr.className = "bg-slate-100 w-full p-5 rounded-md"
            elTr.innerHTML = `
                <td class="py-[7px]"><img src="${item.image}" alt="altImage" width="65" height="55" class="rounded-md"></td>
                           <td class="py-[7px] text-[15px] leading-[17px]"><strong>${item.username}</strong></td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.email}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.phone}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.enrollNumber}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.dataAdmisson}</td>
                           <td class="py-[7px] leading-[17px]">
                           <button class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-circle-info"></i></button>
                           <button class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-pen-to-square"></i></button>
                           <button class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-trash"></i></button>
                </td>
            `
            list.append(elTr)
        })
    })
}
renderUsers(elStudentsList)
// Get users end






// Logout function start
function handleLogut(){
    location.pathname = "./index.html"
}
// Logout function end