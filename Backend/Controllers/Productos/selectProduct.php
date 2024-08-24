<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["id"]){
            $productController = new Producto;
            $id = $_POST["id"];
            $productController = $productController->selectProduct($id);
            if($productController != false){
                echo json_encode($productController);
            }
            else{
                echo "Error";
            }
        }
    }
?>