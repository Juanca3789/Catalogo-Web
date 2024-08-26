<?php
    require_once __DIR__."/../Libraries/Connection.php";
    class Usuario{
        private $connection;
        public function __construct()
        {
            $this->connection = new Connection;
            $this->connection = $this->connection->connect();
        }
        public function loginSeller(string $correo, string $clave){
            $result = $this->connection->prepare("SELECT id, Correo, Rol FROM usuarios WHERE Correo = ? AND Password = ?");
            if($result === false){
                $errorObject = new stdClass();
                $errorObject->error = $this->connection->error;
                return $errorObject;
            }
            $result->bind_param("ss", $correo, $clave);
            $result->execute();
            $result->store_result();
            if($result->num_rows == 1){
                $result->bind_result($id, $cor, $rol);
                $result->fetch();
                $user = new stdClass();
                $user->id = $id;
                $user->Correo = $cor;
                $user->Rol = $rol;
                $result->close();
                return $user;
            }
            else {
                $result->close();
                $errorObject = new stdClass();
                $errorObject->result = "Usuario o Contraseña incorrectos";
                return $errorObject;
            }
        }
    }
?>