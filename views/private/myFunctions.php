<?php
    session_start();
    if(!isset($_SESSION["rol"]) || $_SESSION["rol"] != "SELLER"){
        header("Location: /catalogo/views/index.html");
    }

    header('Content-Type: application/javascript');
?>


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

function addFrontendCard(element) {
    const main = document.getElementById("productsContainer")
    const container = document.createElement("div")
    container.className = "containerProduct"
    const front = document.createElement("div")
    front.className = "product"
    const back = document.createElement("div")
    back.className = "back"
    const img = document.createElement("img")
    const [prefix, base64] = (element.imagen).split(",")
    const mimeType = prefix.match(/:(.*?);/)[1]
    const blob = base64ToBlob(base64, mimeType)
    const imageUrl = URL.createObjectURL(blob)
    img.src = imageUrl
    img.onload = () => {URL.revokeObjectURL(imageUrl)}
    img.className = "img"
    const name = document.createElement("h3")
    name.className = "pr"
    name.textContent = element.nombre
    const precio = document.createElement("h3")
    precio.className = "pr"
    precio.textContent = "$ " + element.precio
    front.appendChild(img)
    front.appendChild(name)
    front.appendChild(precio)
    container.appendChild(front)
    const backName = document.createElement("h3")
    backName.className = "pr"
    backName.textContent = element.nombre
    const descTitle = document.createElement("h5")
    descTitle.textContent = "Descripción:"
    const description = document.createElement("p")
    description.textContent = element.descripcion
    const backPrice = document.createElement("h3")
    backPrice.className = "pr"
    backPrice.textContent = "Precio: $ " + element.precio
    const unidades = document.createElement("span")
    unidades.textContent = "Unidades disponibles: " + element.cantidad
    const contButton = document.createElement("section")
    contButton.className = "cardButton"
    const editButton = document.createElement("button")
    editButton.textContent = "Editar"
    editButton.className = "buttonBack"
    const addInventor = document.createElement("button")
    addInventor.textContent = "Añadir inventario"
    addInventor.className = "buttonBack"
    addInventor.addEventListener("click", () => {
        const modals = document.getElementsByClassName("modal")
        const overlay = document.getElementById("overlay")
        for(let i = 0; i < modals.length; i++){
            modals.item(i).style.display = "flex"
        }
        overlay.style.display = "block"
        for(let i = 0; i < modals.length; i++){
            modals.item(i).addEventListener("submit", (e) => {
                e.preventDefault()
                addInventory(element.id).then(
                    () => {
                        modals.item(i).style.display = "none"
                        overlay.style.display = "none"
                        location.reload()
                    }
                )
            })
        }
    })
    editButton.addEventListener("click", () => {
        location.assign("./edit.php?mode=edit&id=" + element.id)
    })
    contButton.appendChild(editButton)
    contButton.appendChild(addInventor)
    back.appendChild(backName)
    back.appendChild(descTitle)
    back.appendChild(description)
    back.appendChild(backPrice)
    back.appendChild(unidades)
    back.appendChild(contButton)
    container.appendChild(back)
    main.appendChild(container)
}

async function getProducts() {
    const callFunction = new FormData()
    callFunction.append("call", "true")
    let response = await fetch(
        backend_url + "Controllers/Productos/getProducts.php",
        {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            body: callFunction
        }
    )
    json = await response.json()
    json.forEach(element => {
        addFrontendCard(element)
    });
}

const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", () => {
    const modals = document.getElementsByClassName("modal")
    const overlay = document.getElementById("overlay")
    for(let i = 0; i < modals.length; i++){
        modals.item(i).style.display = "none"
    }
    overlay.style.display = "none"
})

async function addInventory(id) {
    let formInventory = document.getElementById("inventoryForm")
    const formDat = new FormData(formInventory)
    formDat.append("id", id)
    let response = await fetch(
        backend_url + "Controllers/Productos/addInventory.php",
        {
            method : "POST",
            mode : "cors",
            cache : "no-cache",
            body : formDat
        }
    )
    json = await response
    if(json){
        alert("Productos añadidos correctamente")
    }
}