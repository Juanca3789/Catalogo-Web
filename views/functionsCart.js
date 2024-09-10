const backend_url = "http://localhost/catalogo/Backend/"

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

function updateSub(){
    const cants = document.getElementsByClassName("priceElement")
    const subT = document.getElementById("subCant")
    subT.textContent = "Subtotal: $"
    let sub = 0
    for(let i = 0; i < cants.length; i++){
        let elem = cants.item(i)
        num = Number(elem.textContent.replace("$", ""))
        sub += num
    }
    subT.textContent += sub
}

function addCartCard(element, cantidad){
    const cardProducts = document.getElementById("cartProducts")
    const cardProduct = document.createElement("div")
    cardProduct.className = "cartProduct"
    const prodInfo = document.createElement("section")
    prodInfo.className = "prodInfo"
    const img = document.createElement("img")
    const [prefix, base64] = (element.imagen).split(",")
    const mimeType = prefix.match(/:(.*?);/)[1]
    const blob = base64ToBlob(base64, mimeType)
    const imageUrl = URL.createObjectURL(blob)
    img.src = imageUrl
    img.onload = () => {URL.revokeObjectURL(imageUrl)}
    img.className = "cartImage"
    img.width = 120
    const details = document.createElement("section")
    details.className = "details"
    const productName = document.createElement("h4")
    productName.className = "pr"
    productName.textContent = element.nombre
    const unitPrice = document.createElement("h5")
    unitPrice.className = "pr"
    unitPrice.textContent = "Precio Unitario: $"+ element.precio
    const unities = document.createElement("h6")
    unities.className = "pr"
    unities.textContent = "Unidades Disponibles: " + element.cantidad
    const total = document.createElement("section")
    total.className = "total"
    const totalPrice = document.createElement("h3")
    totalPrice.className = "pr"
    totalPrice.textContent = "Total:"
    const totalNumber = document.createElement("h3")
    totalNumber.textContent = "$" + (element.precio * cantidad)
    totalNumber.classList = "priceElement pr"
    const form = document.createElement("form")
    const input = document.createElement("input")
    input.className = "cantSelect"
    input.type = "number"
    input.value = cantidad
    input.addEventListener("change", () => {
        if(input.value > element.cantidad){
            alert("Maximo de unidades superado")
            input.value = element.cantidad
        }
        if(input.value != 0){
            totalNumber.textContent = "$" + (element.precio * input.value)
            sessionStorage.setItem(element.id, input.value)
        }
        else{
            sessionStorage.removeItem(element.id)
            alert("Desea eliminar el elemento?")
            location.reload()
        }
        updateSub();
    })
    input.min = 0
    input.max = element.cantidad
    details.appendChild(productName)
    details.appendChild(unitPrice)
    details.appendChild(unities)
    prodInfo.appendChild(img)
    prodInfo.appendChild(details)
    cardProduct.appendChild(prodInfo)
    total.appendChild(totalPrice)
    total.appendChild(totalNumber)
    form.appendChild(input)
    form.addEventListener("keydown", (e) => {
        if(e.key == "Enter"){
            e.preventDefault()
            input.dispatchEvent(new Event("change"))
        }
    })
    total.appendChild(form)
    cardProduct.appendChild(total)
    cardProducts.appendChild(cardProduct)
    updateSub()
}

function getCart(){
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        getProduct(key, sessionStorage.getItem(key));
    }
    const spinner = document.getElementById("loading-spinner")
    spinner.style.display = "none"
}

async function getProduct(id, cantidad) {
    let form = new FormData()
    form.append("id", id);
    let response = await fetch(
        backend_url + "Controllers/Productos/selectProduct.php",
        {
            method : "POST",
            mode : "cors",
            cache : "no-cache",
            body : form
        }
    )
    json = await response.json()
    addCartCard(json, cantidad)
}

const payForm = document.getElementById("formPay")
payForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(payForm)
    let message = "Hola!, quiero realizar un pedido: \n"
    total = 0
    const cartElements = document.getElementsByClassName("cartProduct")
    for (let i = 0; i < cartElements.length; i++) {
        const element = cartElements[i];
        const nombreProducto = element.childNodes[0].childNodes[1].childNodes[0].textContent
        const precioUnitario = element.childNodes[0].childNodes[1].childNodes[1].textContent.replace("Precio Unitario: $", "")
        const cantidad = element.childNodes[1].childNodes[2].childNodes[0].value
        message += `${nombreProducto} - ${cantidad} x $${precioUnitario}\n`
        total += precioUnitario * cantidad
    }
    message += `\nTotal: $${total} \n`
    message += `Mi nombre es: ${formData.get("nombreClient")}\n`
    message += `Mi dirección es: ${formData.get("dirClient")}\n`
    message += "Muchas gracias!"
    payForm.reset()
    sessionStorage.clear()
    alert("Serás redirigido a whatsapp para finalizar tu compra\nMuchas gracias por preferirnos!")
    const whatsappUrl = `https://wa.me/573143024438?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank')
    location.assign("./index.html")
})