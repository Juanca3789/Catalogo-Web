<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["id"] && $_POST["cantidad"]){
            $productController = new Producto;
            $id = $_POST["id"];
            $cantidad = $_POST["cantidad"];
            $productController = $productController->addInventory($id, $cantidad);
            echo $productController;
        }
    }
?>