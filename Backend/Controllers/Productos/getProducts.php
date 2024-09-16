<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["call"]){
            $productController = new Producto;
            $productController = $productController->getProducts();
            if($productController != false){
                header('Content-Type: text/plain');
                echo json_encode($productController);
            }
            else{
                $objetoError = new stdClass;
                $objetoError->Error = "Ha ocurrido un error obteniendo los productos";
                echo json_encode($objetoError);
            }
        }
    }
?>