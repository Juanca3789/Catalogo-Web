<?php
    session_start();
    if(!isset($_SESSION["rol"]) || $_SESSION["rol"] != "SELLER"){
        header("Location: /catalogo/views/index.html");
    }
?>
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
        <button class="navBarButton catalogButton" onclick="catalogPage()">
            Productos
        </button>
    </li>
    <li>
        <button class="navBarButton" onclick="closeSession()">
            Cerrar Sesión
        </button>
    </li>
</ul>