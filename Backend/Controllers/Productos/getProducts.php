<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["call"]){
            $productController = new Producto;
            $productController = $productController->getProducts();
            if($productController != false){
                echo json_encode($productController);
            }
            else{
                echo "Error";
            }
        }
    }
?>