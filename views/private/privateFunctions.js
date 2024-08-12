function realTimeEdit(inputString, outputString) {
    const inputForm = document.getElementById(inputString)
    inputForm.addEventListener("change", () => {
        const previewElement = document.getElementById(outputString)
        if(inputForm.value != "") {
            previewElement.textContent = inputForm.value
        }
    })
}

function imageUpdate() {
    const imageForm = document.getElementById("file-upload")
    imageForm.addEventListener("change", (event) => {
        const previewImage = document.getElementById("previewImage")
        const archivo = event.target.files[0]
        if(archivo){
            const lector = new FileReader()
            lector.onload = (e) => {
                previewImage.src = e.target.result
            }
            lector.readAsDataURL(archivo)
        }
    })
}

function changePreview() {
    const frontPreview = document.getElementById("imageSelector")
    const backPreview = document.getElementById("backPreview")
    if(frontPreviewActive){
        frontPreview.style.display = "none"
        backPreview.style.display = "flex"
        frontPreviewActive = false
    }
    else{
        frontPreview.style.display = "flex"
        backPreview.style.display = "none"
        frontPreviewActive = true
    }
}

function updatePrecio(inputString, outputString, back = false){
    const inputForm = document.getElementById(inputString)
    inputForm.addEventListener("change", () => {
        const previewElement = document.getElementById(outputString)
        if(inputForm.value != ""){
            if(back){
                previewElement.textContent = "Precio: $" + inputForm.value
            }
            else{
                previewElement.textContent = "$" + inputForm.value
            }
        }
        
    })
}

let frontPreviewActive = true
const myUrl = "http://127.0.0.1:3000/Views/private/"
const parameters = new URLSearchParams(window.location.search);
const mode = parameters.get("mode")

realTimeEdit("name", "previewName")
updatePrecio("precio", "previewPrecio")
updatePrecio("precio", "backPrecio", true)
realTimeEdit("name", "backName")
realTimeEdit("desc", "backDesc")
imageUpdate()

if(mode == "add"){

}
else if(mode == "edit"){
    const id = parameters.get("id")
    
}
else{
    window.location.assign(myUrl + "edit.html?mode=add")
}
