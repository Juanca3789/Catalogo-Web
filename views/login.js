const formLogin = document.getElementById("loginForm");
const backend_url = "https://www.tiendaonlinema.000.pe/Backend/"
let isShowed = false

async function loginSeller() {
    let formContent = new FormData(formLogin);
    let response = await fetch(
        backend_url + "Controllers/Usuarios/loginSeller.php",
        {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            body: formContent
        }
    );
    json = await response.json()
    if(json.Rol == "SELLER"){
        alert("Sesión iniciada correctamente")
        location.assign("./private/products.php");
    }
    else if(json == "Usuario y contraseña incorrectos"){
        alert(json);
    }
    else if(json == "No es un vendedor"){
        alert("El usuario ingresado " + json);
    }
}

function showPassword(){
    const campo = document.getElementById("password")
    if(isShowed){
        campo.type = "password"
    }
    else{
        campo.type = "text"
    }
    isShowed = !isShowed
}

if(formLogin != null){
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        loginSeller();
    })
}
