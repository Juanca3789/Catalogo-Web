<?php
    if(!isset($_SESSION["rol"]) || $_SESSION["rol"] != "SELLER"){
        header("Location: /catalogo/views/index.html");
    }
?>
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