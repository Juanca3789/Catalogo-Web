const formLogin = document.getElementById("loginForm");
const backend_url = "http://localhost/catalogo/Backend/"

async function loginSeller() {
    let formContent = new FormData(formLogin);
    let response = await fetch(
        backend_url + "Controllers/Usuarios/loginSeller.php",
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            body: formContent
        }
    );
    json = await response.json()
    if(json.Rol == "SELLER"){
        location.assign("./private/edit.php");
    }
    else if(json == "Usuario y contraseña incorrectos"){
        console.log(json);
    }
    else if(json == "No es un vendedor"){
        console.log(json);
    }
}

if(formLogin != null){
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        loginSeller();
    })
}
