<?php

$ciudad = $_POST["ciudad"];
$tipo = $_POST["tipo"];
$precio = $_POST["precio"];


// recupero el json
$data = file_get_contents("./data-1.json");
$publicaciones = json_decode($data, true);
$valor = explode(";",$precio);
// *******************************************

$listaPublicaciones = array();
$flag = false;

// veo si se filtro por ciudad sino paso a tipo
// y si se filtro armo la lista correspondiente
if (($ciudad != "")&&($tipo == "")&&($valor[0]==200)&&($valor[1]==100000)) {
  foreach ($publicaciones as $publicacion) {
    if ($publicacion["Ciudad"] == $ciudad) {
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}

// veo si se filtro por tipo sino paso a precio
// y si se filtro armo la lista correspondiente
if (($ciudad == "")&&($tipo != "")&&($valor[0]==200)&&($valor[1]==100000)) {
  foreach ($publicaciones as $publicacion) {
    if ($publicacion["Tipo"] == $tipo) {
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}

// veo si se filtro por precio sino paso a tipo y ciudad
// y si se filtro armo la lista correspondiente
if (($ciudad == "")&&($tipo == "")&&(($valor[0]!=200)||($valor[1]!=100000))) {
  foreach ($publicaciones as $publicacion) {
    $publicacionPrecio = explode("$",$publicacion["Precio"]);
    $publicacionPrecio = str_replace(",","",$publicacionPrecio);
    if(($publicacionPrecio[1] >= $valor[0]) && ($publicacionPrecio[1]<=$valor[1])){
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}

// veo si se filtro por tipo y ciudad sino paso a tipo y precio
// y si se filtro armo la lista correspondiente

if (($ciudad != "")&&($tipo != "")&&($valor[0]==200)&&($valor[1]==100000)) {
  foreach ($publicaciones as $publicacion) {
    if (($publicacion["Tipo"] == $tipo)&&($publicacion["Ciudad"] == $ciudad)) {
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}

// veo si se filtro por tipo y precio sino paso a ciudad y precio
// y si se filtro armo la lista correspondiente
if (($ciudad == "")&&($tipo != "")&&(($valor[0]!=200)||($valor[1]!=100000))) {
  foreach ($publicaciones as $publicacion) {
    $publicacionPrecio = explode("$",$publicacion["Precio"]);
    $publicacionPrecio = str_replace(",","",$publicacionPrecio);
    if(($publicacionPrecio[1] >= $valor[0]) && ($publicacionPrecio[1]<=$valor[1])&&($publicacion["Tipo"] == $tipo)){
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}



// veo si se filtro por ciudad y precio sino paso a ciudad tipo y precio
// y si se filtro armo la lista correspondiente
if (($ciudad != "")&&($tipo == "")&&(($valor[0]!=200)||($valor[1]!=100000))) {
  foreach ($publicaciones as $publicacion) {
    $publicacionPrecio = explode("$",$publicacion["Precio"]);
    $publicacionPrecio = str_replace(",","",$publicacionPrecio);
    if(($publicacionPrecio[1] >= $valor[0]) && ($publicacionPrecio[1]<=$valor[1])&&($publicacion["Ciudad"] == $ciudad)){
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}



// veo si se filtro por  ciudad tipo y precio
// y si se filtro armo la lista correspondiente
if (($ciudad != "")&&($tipo != "")&&(($valor[0]!=200)||($valor[1]!=100000))) {
  foreach ($publicaciones as $publicacion) {
    $publicacionPrecio = explode("$",$publicacion["Precio"]);
    $publicacionPrecio = str_replace(",","",$publicacionPrecio);
    if(($publicacionPrecio[1] >= $valor[0]) && ($publicacionPrecio[1]<=$valor[1])&&($publicacion["Ciudad"] == $ciudad)&&($publicacion["Tipo"] == $tipo)){
      $listaPublicaciones[] = json_encode($publicacion);
    }
  }
}


echo json_encode($listaPublicaciones);
?>
