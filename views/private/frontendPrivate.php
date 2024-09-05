<?php
    session_start();
    if(!isset($_SESSION["rol"]) || $_SESSION["rol"] != "SELLER"){
        header("Location: /catalogo/views/index.html");
    }

    header('Content-Type: application/javascript');
?>

if (typeof backend_url === 'undefined') {
    const backend_url = "http://localhost/catalogo/Backend/"
}

function catalogPage(){
    location.assign("./products.php")
}

async function closeSession() {
    const tempForm = new FormData();
    tempForm.append("close", "true");
    let response = await fetch(
        backend_url + "Controllers/Usuarios/closeSession.php",
        {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            body: tempForm
        }
    )
    json = await response.json()
    if(json.respuesta == "Sesión cerrada correctamente"){
        alert(json.respuesta)
        location.assign("../index.html")
    }
}

function addPage(){
    location.assign("./edit.php")
}

const currentPage = location.pathname.split("/").pop();
if(currentPage == "index.php" || currentPage == ""){
    document.getElementById("mainButton").disabled = true
}
else if(currentPage == "us.php"){
    document.getElementById("usButton").disabled = true
}
else if(currentPage == "products.php"){
    document.getElementById("productsButton").disabled = true
}