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
            $result = $this->connection->query("CALL loginSeller('{$correo}', '{$clave}');");
            if($result != false){
                $result = $result->fetch_object();
                return $result;
            }
            return false;
        }
    }
?>