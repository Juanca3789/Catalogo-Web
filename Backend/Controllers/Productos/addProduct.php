<?php
    require_once __DIR__."/../../Models/ModeloProducto.php";
    if($_POST){
        if($_POST["nombre"] && $_POST["descripcion"] && $_POST["precio"] && $_POST["img"]){
            $productController = new Producto;
            $nombre = trim($_POST["nombre"]);
            $descripcion = trim($_POST["descripcion"]);
            $precio = trim((string)$_POST["precio"]);
            $img = $_POST["img"];
            $productController = $productController->addProduct($nombre, $descripcion, $precio, $img);
            echo $productController;
        }
    }
?>