<?php
    require_once __DIR__."/../Libraries/Connection.php";
    class Producto{
        private $connection;
        public function __construct()
        {
            $this->connection = new Connection;
            $this->connection = $this->connection->connect();
        }
        public function getProducts() {
            $result = $this->connection->query("CALL getProducts();");
            if($result != false){
                $arr = null;
                while($obj = $result->fetch_object()){
                    $arr[] = $obj;
                }
                return $arr;
            }
            return $result;
        }
        public function addProduct(string $nombre, string $descripcion, string $precio, $imagen) {
            $result = $this->connection->query("CALL addProduct('{$nombre}','{$descripcion}','{$precio}','{$imagen}')");
            if($result){
                return "Producto Añadido Exitosamente";
            }
            return "Ha ocurrido un error";
        }
    }
?>