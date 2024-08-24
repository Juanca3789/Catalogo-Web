<?php
    require_once __DIR__."/../../Models/ModeloUsuario.php";
    session_start();
    if($_POST){
        if($_POST["correo"] && $_POST["password"]){
            $usuario = new Usuario;
            $correo = trim($_POST["correo"]);
            $password = hash('sha256', $_POST["password"]);
            $usuario = $usuario->loginSeller($correo, $password);
            if($usuario != false && isset($usuario->Rol) && $usuario->Rol == "SELLER"){
                $_SESSION["id"] = $usuario->id;
                $_SESSION["correo"] = $usuario->Correo;
                $_SESSION["rol"] = $usuario->Rol;
                echo json_encode($usuario);
            }
            else if(!isset($usuario->Rol)){
                echo json_encode("Usuario y contraseña incorrectos");
            }
            else{
                echo json_encode("No es un vendedor");
            }
        }
    }
?>