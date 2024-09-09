<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
    <title>Gestion de Productos</title>
</head>
<body onload="getProducts()">
    <?php
        require_once __DIR__."/template/navBar.php";
    ?>
    <div class="spinnerDiv" id="loading-spinner">
        <div class="spinner"></div>
    </div>
    <div class="main" id="productsContainer"></div>
    <div id="overlay"></div>
    <div class="modal">
        <form id="inventoryForm">
            <section>
                <h2 class="pr">
                    Añadir inventario de productos
                </h2>
                <h3 id = "modalInventory">
                    Inventario actual:
                </h3>
                <h3>
                    Ingrese la cantidad de productos que desea añadir al inventario:
                    <span>
                        <input type="number" min= "0" max="10000" name="cantidad" required>
                    </span>
                </h3>
                <button type="submit" class="buttonBack">
                    Actualizar Inventario
                </button>
            </section>
        </form>
        <button class="closeModal" id="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </button>
    </div>
    <button class="add" id="add" onclick="addPage()">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
        </span>
    </button>
    <?php
        require_once __DIR__."/template/footer.php";
    ?>
</body>
<script src="myFunctions.js"></script>
<script src="frontendPrivate.js"></script>
</html>