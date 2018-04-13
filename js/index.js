var flagFiltros = false;
/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 100000,
    prefix: "$"
  });
}

inicializarSlider();

function insertarPublicaciones(publicacion){
  $(".publicaciones").empty();
  $.each(publicacion,function(indice,elemento){
    if (flagFiltros == true) {
      var elemento =JSON.parse(elemento)
    }
    var insertar = `<div class="card">
            <div class="itemMostrado ">
              <img src="img/home.jpg" alt="">
              <div class="card-stacked">
                <p class="infoCard"><strong>Direccion: </strong>${elemento.Direccion}</p>
                <p class="infoCard"><strong>Ciudad: </strong>${elemento.Ciudad}</p>
                <p class="infoCard"><strong>Telefono: </strong>${elemento.Telefono}</p>
                <p class="infoCard"><strong>Codigo Postal: </strong>${elemento.Codigo_Postal}</p>
                <p class="infoCard"><strong>Tipo: </strong>${elemento.Tipo}</p>
                <p class="precioTexto">${elemento.Precio}</p>
                <div class="divider"></div>
                <div class="card-action right-align">
                  <a href="#">Ver más</a>
                </div>
              </div>
            </div>
          </div>`
    $(".publicaciones").append(insertar);
  });
}

var btnMostrarTodos = document.getElementById('mostrarTodos')
btnMostrarTodos.addEventListener('click', function(e) {
  e.preventDefault()
  $.ajax({
    url: "./data-1.json",
    type:'GET',
    data:{},
    success: function(data){
      response = JSON.parse(data)
      flagFiltros = false;
      insertarPublicaciones(response);
    }
  });
})

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function llenarFiltroCiudad(ciudades) {
  var todasLasCiudades = [];
  var todasLasCiudadesSinRepetidos = [];
  var i=0
  $.each(ciudades,function(indice,elemento){
    todasLasCiudades[i] = elemento.Ciudad
    i++
  });

  todasLasCiudadesSinRepetidos = todasLasCiudades.unique()
  for (var i = 0; i < todasLasCiudadesSinRepetidos.length; i++) {
    var insertar = `<option value="${todasLasCiudadesSinRepetidos[i]}">${todasLasCiudadesSinRepetidos[i]}</option>`
    $("#selectCiudad").append(insertar);
  }
  $(document).ready(function() {
    $('select').material_select();
  });


}

function llenarFiltroTipo(tipos) {
  var todosLosTipos = [];
  var todosLosTiposSinRepetidos = [];
  var i=0
  $.each(tipos,function(indice,elemento){
    todosLosTipos[i] = elemento.Tipo
    i++
  });
  todosLosTiposSinRepetidos = todosLosTipos.unique()
  for (var i = 0; i < todosLosTiposSinRepetidos.length; i++) {
    var insertar = `<option value="${todosLosTiposSinRepetidos[i]}">${todosLosTiposSinRepetidos[i]}</option>`
    $("#selectTipo").append(insertar);
  }
  $(document).ready(function() {
    $('select').material_select();
  });

}

function cargarFiltroCiudad() {
  $.ajax({
    url: "./data-1.json",
    type:'GET',
    data:{},
    success: function(data){
      response = JSON.parse(data)
      llenarFiltroCiudad(response);
    }
  });

}

function cargarFiltroTipo() {
  $.ajax({
    url: "./data-1.json",
    type:'GET',
    data:{},
    success: function(data){
      response = JSON.parse(data)
      llenarFiltroTipo(response);
    }
  });

}

function recuperarFiltrosPublicaciones() {
  var ciudad = $("#selectCiudad").val()
  var tipo = $("#selectTipo").val()
  var precio = $("#rangoPrecio").val()

  $.ajax({
    url:"./buscador.php",
    type:"POST",
    data:{"ciudad":ciudad,"tipo":tipo,"precio":precio},
    success: function(resultado) {
      var response = JSON.parse(resultado)
      flagFiltros=true;
      insertarPublicaciones(response);
    }
  })
}



submitButton.addEventListener('click', function(e) {
  e.preventDefault()
  recuperarFiltrosPublicaciones()
})

window.onload=function(){
  cargarFiltroCiudad()
  cargarFiltroTipo()
}
