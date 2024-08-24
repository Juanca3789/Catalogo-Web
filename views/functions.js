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
    back.appendChild(backName)
    back.appendChild(descTitle)
    back.appendChild(description)
    back.appendChild(backPrice)
    back.appendChild(unidades)
    container.appendChild(back)
    main.appendChild(container)
}

async function getProducts() {
    let callFunction = new FormData();
    const parameters = new URLSearchParams(window.location.search)
    const pattern = parameters.get("aBuscar");
    let response = null;
    if(pattern == null){
        const products = document.getElementById("productsButton");
        products.disabled = true;
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
    json.forEach(element => {
        addFrontendCard(element)
    });
}