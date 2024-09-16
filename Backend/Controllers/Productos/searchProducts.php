<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["aBuscar"]){
            $productController = new Producto;
            $pattern = trim(strtolower($_POST["aBuscar"]));
            $productController = $productController->searchProducts($pattern);
            if($productController != false){
                echo json_encode($productController);
            }
            else{
                $objetoError = new stdClass;
                $objetoError->Error = "No se han encontrado productos";
                echo json_encode($objetoError);
            }
        }
    }
?>