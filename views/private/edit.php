<?php
    require_once __DIR__."/template/navBar.php";
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
    <div class="main">
        <form id="editProduct" class="editPage">
            <section>
                <h2 class="pr titleVP">Vista Previa</h2>
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
                        <img id="previewImage" src="../../Assets/descarga.jpg" class="img" width="270px" height="145px">
                        <h3 class="pr" id="previewName">Nombre Producto</h3>
                        <h3 class="pr" id="previewPrecio">Precio</h3>
                        <label for="file-upload" class="fakeFile">Seleccionar Imagen</label>
                        <input id="file-upload" class="trueFile" type="file" accept="image/*" name="img">
                    </section>
            </section>
            </section>
            <section class="sectionInput">
                <h2 class="pr" id="header">Editando Producto</h2>
                <section>
                    <h4 class="pr">Nombre:</h6>
                    <input name="nombre" id="name" type="text" placeholder="Nombre" class="formEditText" autocomplete="off" required>
                </section>
                <section>
                    <h4 class="pr">Precio:</h4>
                    <input name="precio" id="precio" type="number" placeholder="Precio" pattern="[0-9]*" class="formEditText" required>
                </section>
                <section>
                    <h4 class="pr">Descripción:</h4>
                    <input name="descripcion" id="desc" type="text" placeholder="Descripción" class="formEditText" autocomplete="off" required>
                </section>
                <button id="submit" type="submit" class="sendButton">Confirmar Cambios</button>
            </section>
        </form>
    </div>
    <?php
        require_once __DIR__."/template/footer.php";
    ?>
</body>
<script src="editFunctions.js"></script>
<script src="frontendPrivate.js"></script>
</html>