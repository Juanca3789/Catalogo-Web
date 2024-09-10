const backend_url = "https://www.tiendaonlinema.000.pe/Backend/"

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

function addFrontendCard(element){
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
    img.width = 270
    img.height = 145
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
    const formCart = document.createElement("form")
    formCart.className = "cardButton"
    const cantSelect = document.createElement("input")
    cantSelect.name = "cantidad"
    cantSelect.className = "cantSelect"
    cantSelect.type = "number"
    cantSelect.max = element.cantidad
    cantSelect.min = 0
    cantSelect.value = 0
    if(element.cantidad != 0) {
        cantSelect.value = 1
    }
    const addButton = document.createElement("button")
    addButton.type = "submit"
    addButton.className = "buttonBack"
    addButton.textContent = "Añadir al carrito"
    formCart.addEventListener(("keydown"), (e) => {
        if(e.key == "Enter"){
            e.preventDefault()
        }
    })
    formCart.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(formCart)
        if(sessionStorage.getItem(element.id) == null){
            sessionStorage.setItem(element.id, formData.get("cantidad"))
            alert("Producto añadido al carrito")
        }
        else{
            const cantTotal = (sessionStorage.getItem(element.id) - 0) + (formData.get("cantidad") - 0)
            if(cantTotal <= element.cantidad){
                sessionStorage.setItem(element.id, cantTotal)
                alert("Unidades sumadas al carrito")
            }
            else {
                sessionStorage.setItem(element.id, element.cantidad)
                alert("Ya tienes en el carrito el maximo de unidades disponibles")
            }
        }
        displayNotifier()
    })
    formCart.appendChild(addButton)
    formCart.appendChild(cantSelect)
    back.appendChild(backName)
    back.appendChild(descTitle)
    back.appendChild(description)
    back.appendChild(backPrice)
    back.appendChild(unidades)
    back.appendChild(formCart)
    container.appendChild(back)
    main.appendChild(container)
}

async function getProducts() {
    let callFunction = new FormData();
    const parameters = new URLSearchParams(window.location.search)
    const pattern = parameters.get("aBuscar");
    let response = null;
    if(pattern == null){
        document.addEventListener("resourcesLoaded", () => {
            const products = document.getElementById("productsButton");
            products.disabled = true;
        })
        callFunction.append("call", "true");
        response = await fetch(
            backend_url + "Controllers/Productos/getProducts.php",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: callFunction
            }
        );
    }
    else{
        callFunction.append("aBuscar", pattern);
        response = await fetch(
            backend_url + "Controllers/Productos/searchProducts.php",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: callFunction
            }
        )
        const main = document.getElementById("textHeader");
        const head = document.createElement("h2");
        head.className = "searcHeader";
        head.textContent = "Resultados para la busqueda: '" + pattern + "'";
        main.appendChild(head);
    }
    json = await response.json()
    const spinner = document.getElementById("loading-spinner")
    spinner.style.display = "none"
    json.forEach(element => {
        addFrontendCard(element)
    });
}