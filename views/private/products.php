<?php
    require_once __DIR__."../template/navBar.php";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
    <title>Gestion de Productos</title>
</head>
<body onload="getProducts()">
    <div class="main" id="productsContainer"></div>
    <?php
        require_once __DIR__."../template/footer.php";
    ?>
</body>
<script src="myFunctions.php"></script>
<script src="frontendPrivate.php"></script>
</html>