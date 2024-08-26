<?php
    session_start();
    if($_POST){
        if($_POST["close"]){
            $_SESSION = array();
            session_destroy();
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            $result = new stdClass();
            $result->respuesta = "Sesión cerrada correctamente";
            echo json_encode($result);
        }
    }
?>