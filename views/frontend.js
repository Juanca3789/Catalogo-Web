function usPage() {
    location.assign("./us.html")
}

function catalogPage(){
    location.assign("./products.html")
}

function mainPage() {
    location.assign("./index.html")
}

function cartPage() {
    location.assign("./cart.html")
}

function displayNotifier(){
    const notifier = document.getElementById("notifier")
    if(sessionStorage.length != 0){
        if(notifier != null){
            notifier.style.display = "block"
            notifier.textContent = sessionStorage.length
        }
    }
    else{
        if(notifier != null){
            notifier.style.display = "none"
        }
    }
}

displayNotifier()
desplegableActive = false
let telephoneNumber, whatsapp, tienda
const button = document.getElementById("contacto")
if (button != null) {
    button.addEventListener('click', () => {
        const desplegable = document.getElementById("desplegable")
        if(desplegable != null){
            if(desplegableActive){
                let id = null
                let opc = 100
                clearInterval(id)
                id = setInterval(hide, 3)
                function hide() {
                    if(opc == 0){
                        clearInterval(id)
                        desplegable.removeChild(telephoneNumber)
                        desplegable.removeChild(whatsapp)
                        desplegable.removeChild(tienda)
                        desplegableActive = false
                    }
                    else{
                        opc--
                        desplegable.style.opacity = opc + '%'
                    }
                }
            }
            else{
                telephoneNumber = document.createElement('div')
                whatsapp = document.createElement('button')
                tienda = document.createElement('button')
                telephoneNumber.className = "telNumber"
                telephoneNumber.innerHTML = "<p>Telefono</p> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-telephone-forward' viewBox='0 0 16 16'><path d='M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zm10.762.135a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L14.293 4H9.5a.5.5 0 0 1 0-1h4.793l-1.647-1.646a.5.5 0 0 1 0-.708'/></svg>"
                whatsapp.className = "whatsapp"
                whatsapp.innerHTML = "<p>Whatsapp</p> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-whatsapp' viewBox='0 0 16 16'><path d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232'/></svg>"
                tienda.className = "tienda"
                tienda.innerHTML = "<p>Direccion</p> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-shop' viewBox='0 0 16 16'><path d='M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z'/></svg>"
                desplegable.appendChild(telephoneNumber)
                desplegable.appendChild(whatsapp)
                desplegable.appendChild(tienda)
                let id = null
                let opc = 0
                clearInterval(id)
                id = setInterval(show, 3)
                function show(){
                    if(opc == 100){
                        clearInterval(id)
                    }
                    else{
                        opc++;
                        desplegable.style.opacity = opc + '%'
                    }
                }
                desplegableActive = true
            }
        }
        else{
            window.alert("No se detecta el desplegable")
        }
    })
} else {
    window.alert("No se detecta el botón")
}

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and update content
    const fetchAndUpdate = (url, elementId) => {
        return fetch(url, { cache: 'no-cache' })
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => {
                console.error(`Error fetching ${url}:`, error);
            });
    };

    // Fetch nav and footer content concurrently
    Promise.all([
        fetchAndUpdate("./Common/nav.html", "nav"),
        fetchAndUpdate("./Common/footer.html", "foot")
    ])
    .then(() => {
        const event = new CustomEvent("resourcesLoaded")
        document.dispatchEvent(event)
    })
    .catch(error => {
        console.error("Error loading nav or footer:", error);
    });
});

document.addEventListener("resourcesLoaded", () => {
    const currentPage = location.pathname.split("/").pop();
    if(currentPage == "index.html" || currentPage == ""){
        document.getElementById("mainButton").disabled = true
    }
    else if(currentPage == "us.html"){
        document.getElementById("usButton").disabled = true
    }
})