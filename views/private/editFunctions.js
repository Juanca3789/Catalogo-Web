let base64Selected = null

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

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
                const img = new Image();
                img.onload = (e) => {
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")
                    const maxHeight = 163
                    const scaleSize = maxHeight / img.height
                    canvas.width = img.width * scaleSize
                    canvas.height = maxHeight
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    const base64 = canvas.toDataURL("image/webp", 0.5)
                    base64Selected = base64
                    previewImage.src = base64
                }
                img.onerror = () => {
                    console.error("Error al cargar la imagen");
                };
                img.src = e.target.result
            }
            lector.onerror = () => {
                console.error("Error al leer el archivo");
            };
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

function changeInformationValue(idInput, value){
    const inputForm = document.getElementById(idInput)
    inputForm.value = value
    let event = new Event("change")
    inputForm.dispatchEvent(event)
}

let frontPreviewActive = true
const myUrl = "https://www.tiendaonlinema.000.pe/views/private/"
const parameters = new URLSearchParams(window.location.search);
const mode = parameters.get("mode")
const backend_url = "https://www.tiendaonlinema.000.pe/Backend/"

realTimeEdit("name", "previewName")
updatePrecio("precio", "previewPrecio")
updatePrecio("precio", "backPrecio", true)
realTimeEdit("name", "backName")
realTimeEdit("desc", "backDesc")
imageUpdate()

if(mode == "add"){
    const form = document.getElementById("editProduct")
    form.addEventListener("keydown", (event) =>{
        if(event.key == "Enter"){
            event.preventDefault();
        }
    })
    async function addProduct() {
        const formData = new FormData(form)
        formData.delete("img")
        formData.append("img", base64Selected)
        let response = await fetch(
            backend_url + "Controllers/Productos/addProduct.php",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: formData
            }
        )
        let result = await response.status
        if(result == 200){
            window.alert("Producto añadido correctamente")
        }
        window.location.reload()
    }
    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        if(base64Selected != null){
            addProduct()
        }
        else{
            window.alert("No has seleccionado una imagen")
        }
    })
    const head = document.getElementById("header")
    head.textContent = "Añadiendo Producto"
}
else if(mode == "edit"){
    const form = document.getElementById("editProduct")
    form.addEventListener("keydown", (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
        }
    })
    const id = parameters.get("id")
    if(id != null){
        async function selectProduct() {
            const formData = new FormData()
            formData.append("id", id)
            let response = await fetch(
                backend_url + "Controllers/Productos/selectProduct.php",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    body: formData
                }
            )
            let result = await response.json()
            changeInformationValue("name", result.nombre)
            changeInformationValue("precio", result.precio)
            changeInformationValue("desc", result.descripcion)
            const img = document.getElementById("previewImage")
            base64Selected = result.imagen
            const [prefix, base64] = (result.imagen).split(",")
            const mimeType = prefix.match(/:(.*?);/)[1]
            const blob = base64ToBlob(base64, mimeType)
            const imageUrl = URL.createObjectURL(blob)
            img.src = imageUrl
            img.onload = () => {URL.revokeObjectURL(imageUrl)}
        }
        async function editProduct() {
            const formData = new FormData(form)
            formData.delete("img")
            formData.append("img", base64Selected)
            formData.append("id", id)
            let response = await fetch(
                backend_url + "Controllers/Productos/editProduct.php",
                {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    body: formData
                }
            )
            let result = await response.status
            if(result == 200){
                window.alert("Producto editado correctamente")
            }
            window.location.reload()
        }
        document.addEventListener("DOMContentLoaded", () =>{
            selectProduct()
        })
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            editProduct()
        })
    }
    else{
        window.location.assign(myUrl + "edit.php?mode=add")
    }
}
else{
    window.location.assign(myUrl + "edit.php?mode=add")
}

