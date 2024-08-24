<?php
    session_start();
    if(!isset($_SESSION["rol"]) || $_SESSION["rol"] != "SELLER"){
        header("Location: /catalogo/views/index.html");
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../styles.css">
    <title>Editar Producto</title>
</head>
<body>
    <ul class="navBar">
        <li>
            <button class="navBarButton MainPageButton" onclick="mainPage()">
                Pagina Principal
            </button>
        </li>
        <li>
            <button class="navBarButton usButton" onclick="usPage()">
                Nosotros
            </button>
        </li>
        <li>
            <button class="navBarButton catalogButton" onclick="catalogPage()" disabled>
                Productos
            </button>
        </li>
        <li>
            <form action="" method="get" class="navBarSearch">
                <div class="inputText">
                    <input type="text" name="aBuscar" class="textSearch" placeholder="Buscar Productos" required disabled>
                    <button type="submit" class="buttonSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" class="iconSearch" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </form>
        </li>
    </ul>
    <div class="main">
        <form id="editProduct" class="editPage">
            <section class="preview">
                <button class="reloadButton" type="button" onclick="changePreview()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 15">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5"/>
                    </svg>
                </button>
                <section class="backPreview" id="backPreview">
                    <section class="content">
                        <h3 id="backName" class="pr">Nombre Producto</h3>
                        <h5>
                            Descripción:
                        </h5>
                        <p id="backDesc">
                            Descripción detallada del producto
                        </p>
                        <h3 id="backPrecio" class="pr">Precio: $</h3>
                    </section>
                </section>
                <section class="imageSelector" id="imageSelector">
                    <img id="previewImage" src="../../Assets/descarga.jpg" class="img">
                    <h3 class="pr" id="previewName">Nombre Producto</h3>
                    <h3 class="pr" id="previewPrecio">Precio</h3>
                    <label for="file-upload" class="fakeFile">Seleccionar Imagen</label>
                    <input id="file-upload" class="trueFile" type="file" accept="image/*" name="img">
                </section>
            </section>
            <section class="sectionInput">
                <input name="nombre" id="name" type="text" placeholder="Nombre" class="formEditText" autocomplete="off" required>
                <input name="precio" id="precio" type="number" placeholder="Precio" pattern="[0-9]*" class="formEditText" required>
                <input name="descripcion" id="desc" type="text" placeholder="Descripción" class="formEditText" autocomplete="off" required>
                <button id="submit" type="submit" class="sendButton">Confirmar Cambios</button>
            </section>
        </form>
    </div>
    <footer class="footer">
        <h2>
            Nombre empresa
        </h2>
        <div class="info">
            <p>
                Nombre encargado
            </p>
            <p>
                Numero telefono
            </p>
            <p>
                Dirección
            </p>
            <p>Información adicional
            </p>
        </div>
    </footer>
</body>
<script src="privateFunctions.php"></script>
</html>