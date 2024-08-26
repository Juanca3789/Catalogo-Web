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
            $result = $this->connection->query("SELECT * FROM productos WHERE 1;");
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
            $result = $this->connection->query("INSERT INTO `productos`(`nombre`, `descripcion`, `precio`, `cantidad`, `imagen`) VALUES ('{$nombre}', '{$descripcion}', '{$precio}', 0, '{$imagen}');");
            if($result){
                return "Producto Aniadido Exitosamente";
            }
            return "Ha ocurrido un error";
        }
        public function editProduct(int $id, string $nombre, string $descripcion, string $precio, $imagen) {
            $result = $this->connection->multi_query("SELECT @pcantidad := cantidad FROM productos WHERE id = {$id}; UPDATE `productos` SET `nombre`= '{$nombre}',`descripcion`='{$descripcion}',`precio`='{$precio}',`cantidad`= @pcantidad,`imagen`= '{$imagen}' WHERE id = {$id};");
            if($result){
                return "Producto editado correctamente";
            }
            return "Ha ocurrido un error";
        }
        public function selectProduct(int $id) {
            $result = $this->connection->query("SELECT * FROM productos WHERE id = {$id};");
            $result = $result->fetch_object();
            return $result;
        }
        public function searchProducts(string $pattern){
            $result = $this->connection->query("SELECT * FROM productos WHERE nombre LIKE CONCAT('%', '{$pattern}', '%')");
            if($result != false){
                $arr = null;
                while($obj = $result->fetch_object()){
                    $arr[] = $obj;
                }
                return $arr;
            }
            return $result;
        }
    }
?>