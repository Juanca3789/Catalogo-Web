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
                return "Producto Aniadido Exitosamente";
            }
            return "Ha ocurrido un error";
        }
        public function editProduct(int $id, string $nombre, string $descripcion, string $precio, $imagen) {
            $result = $this->connection->query("CALL editProduct('{$id}','{$nombre}','{$descripcion}','{$precio}','{$imagen}')");
            if($result){
                return "Producto editado correctamente";
            }
            return "Ha ocurrido un error";
        }
        public function selectProduct(int $id) {
            $result = $this->connection->query("CALL selectProduct('{$id}')");
            $result = $result->fetch_object();
            return $result;
        }
    }
?>