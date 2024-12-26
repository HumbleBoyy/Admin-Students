let elAdminName = document.querySelector(".admin_name")
let user = JSON.parse(localStorage.getItem("user"))
elAdminName.innerHTML = user.username
const HTTP = "http://localhost:3000/students"

let elModalWrapper = document.querySelector(".modal_wrapper")
let elModalInner = document.querySelector(".modal_inner")
let elStudentsList = document.querySelector(".students_list")
let elSearch = document.querySelector(".search_input")



let date = new Date()
const signedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

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
              <label class="block  mx-auto w-[400px]">
                  <input type="file" class="input_file hidden">
                  <img src="./images/imageD.png" alt="altImage" width="400" height="200" class="image w-full">
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
              </div>
              <button type="submit" class="addBtn w-full bg-yellow-500 h-[50px] rounded-xl font-bold text-white text-[20px]">Add</button>
           </form>
    `

    let elInputFile = document.querySelector(".input_file")
    let elImage = document.querySelector(".image")

    elInputFile.addEventListener("change", (e)=> {
        elImage.src = URL.createObjectURL(e.target.files[0])
    })

    const elStudentsForm = document.querySelector(".addStudents")
    
    elStudentsForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const data = {
            username:e.target.username.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            enrollNumber:e.target.enrollNumber.value,
            dateAdmisson:signedDate,
            image:elImage.src
        }
        axios.post(HTTP, data).then(res => {
            alert("Success")
            e.target.reset()
        })
    })
}
// Add Function end

// Get users start
function renderUsers(list,data){
    if(!data) {
        axios.get(HTTP).then(res => {
            res.data.map((item) => {
                let elTr = document.createElement("tr")
                elTr.className = "bg-slate-100 w-full p-5 rounded-md"
                elTr.innerHTML = `
                    <td class="py-[7px]"><img src="${item.image}" alt="altImage" width="65" height="55" class="rounded-md"></td>
                               <td class="py-[7px] text-[15px] leading-[17px]"><strong>${item.username}</strong></td>
                               <td class="py-[7px] text-[15px] leading-[17px]">${item.email}</td>
                               <td class="py-[7px] text-[15px] leading-[17px]">${item.phone}</td>
                               <td class="py-[7px] text-[15px] leading-[17px]">${item.enrollNumber}</td>
                               <td class="py-[7px] text-[15px] leading-[17px]">${item.dateAdmisson}</td>
                               <td class="py-[7px] leading-[17px]">
                               <button class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-circle-info"></i></button>
                               <button onclick="handleEdit('${item.id}')" class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-pen-to-square"></i></button>
                               <button onclick="handleDelete('${item.id}')" class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `
                list.append(elTr)
            })
        })
    }
    else{
        list.innerHTML = null
        data.map((item) => {
            let elTr = document.createElement("tr")
            elTr.className = "bg-slate-100 w-full p-5 rounded-md"
            elTr.innerHTML = `
                <td class="py-[7px]"><img src="${item.image}" alt="altImage" width="65" height="55" class="rounded-md"></td>
                           <td class="py-[7px] text-[15px] leading-[17px]"><strong>${item.username}</strong></td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.email}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.phone}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.enrollNumber}</td>
                           <td class="py-[7px] text-[15px] leading-[17px]">${item.dateAdmisson}</td>
                           <td class="py-[7px] leading-[17px]">
                           <button class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-circle-info"></i></button>
                           <button onclick="handleEdit('${item.id}')" class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-pen-to-square"></i></button>
                           <button onclick="handleDelete('${item.id}')" class="text-[25px] text-[#FEAF00] mr-3"><i class="fa-solid fa-trash"></i></button>
                </td>
            `
            list.append(elTr)
        })
    }
}
renderUsers(elStudentsList)
// Get users end




// Delete Function start
function handleDelete(id){
    axios.delete(`${HTTP}/${id}`)
}
// Delete Function start



// Edit Part start
function handleEdit(id){
    elModalWrapper.classList.remove("scale-0")

    axios.get(`${HTTP}/${id}`)
    .then(res => {
        elModalInner.innerHTML = `
        <form class="edit_form flex flex-col justify-center gap-5">
              <label class="block  mx-auto w-[400px]">
                  <input type="file" class="input_file_edit hidden">
                  <img src="${res.data.image}" alt="altImage" width="400" height="200" class="image_Edit error_image w-full">
              </label>

              <div>
                <label  class="text-[20px] text-slate-500 font-bold">Name</label>
                <input value="${res.data.username}" required type="text" name="username" placeholder="Name" class="w-full h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Email</label>
                <input value="${res.data.email}" required type="email" name="email" placeholder="Email" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Phone</label>
                <input value="${res.data.phone}" required type="tel" name="phone" placeholder="Phone" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
                <label class="text-[20px] text-slate-500 font-bold">Enroll Number</label>
                <input value="${res.data.enrollNumber}" required type="number" name="enrollNumber" placeholder="Enroll Number" class="w-full border h-[50px] rounded-md text-[20px] p-2 border-[2px] outline-none focus:border-yellow-500">
              </div>
              <button type="submit" class="addBtn w-full bg-yellow-500 h-[50px] rounded-xl font-bold text-white text-[20px]">Edit</button>
           </form>
    `
    })
    

    let elInputEditFile = document.querySelector(".input_file_edit")
    let elEditImage = document.querySelector(".image_Edit")

    elInputEditFile.addEventListener("change", (e)=> {
        elEditImage.src = URL.createObjectURL(e.target.files[0])
    })

    const elStudentsForm = document.querySelector(".edit_form")

    elStudentsForm.addEventListener("submit", (e)=> {
        e.preventDefault()
        const editdata = {
            id:id,
            username:e.target.username.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            enrollNumber:e.target.enrollNumber.value,
            dateAdmisson:signedDate,
            image:elEditImage.src
        }

        axios.put(HTTP, editdata).then(res => {
            alert("Success")
            e.target.reset()
        })
    })

    let elErrorImage = document.querySelector(".error_image")
    elErrorImage.addEventListener("error", (e)=> {
      e.target.src = "./images/imageD.png"
   })
}
// Edit Partd end


// Sort function start
let isAscending = true
function handleSortBtn(){
    axios.get(HTTP)
    .then(res => {
       let sortdData = res.data.sort((a, b) => {
          if(isAscending){
             return a.username.localeCompare(b.username)
          }
       });
        renderUsers(elStudentsList, sortdData)
        isAscending = !isAscending
    })
}
// Sort function end



// Logout function start
function handleLogut(){
    localStorage.removeItem("user")
    setTimeout(()=> {
        location.pathname = "./index.html"
    },1000)
}
// Logout function end
