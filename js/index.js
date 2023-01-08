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
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

/*Función para mostrar todas las opciones */
function mostrarTodo(){
  $.ajax({ 
    url: "./data-1.json",  
    dataType: "text",  
    cache: false,
    contentType: false,
    processData: false, 
    type: 'POST',
    success: function(response){

      const contenido = $("#uno")
      const objeto = JSON.parse(response) 
      var vista = ``;
      for(i=0; i<objeto.length; i++){
        vista += `<div class="itemMostrado card">
                    <img src="img/home.jpg">
                    <div class="card-stacked">
                      <div class="card-content">
                        <p><b>Dirección:</b> ${objeto[i].Direccion}</p>
                        <p><b>Ciudad:</b> ${objeto[i].Ciudad}</p>
                        <p><b>Telefono:</b> ${objeto[i].Telefono}</p>
                        <p><b>Codigo Postal:</b> ${objeto[i].Codigo_Postal}</p>
                        <p><b>Tipo:</b> ${objeto[i].Tipo}</p>
                        <p><b>Precio:</b> <span class="precioTexto">${objeto[i].Precio}</span></p>
                      </div>  
                      <div class="card-action">
                        <a href="#" class="">VER MAS</a>
                      </div>
                      
                    </div>
                  </div>`
      }
      contenido.html(vista)
    }
  })
}

/*funcion para inicializar los select*/
function cargardatos() {
  $.ajax({
    url: "./data-1.json",
    success: function(datos) {
      var datosCiudad = [];
      var datosTipo =[];
      for (var i = 0; i < datos.length; i++) {
        if (datosCiudad.includes(datos[i].Ciudad) == false) {
          $('#selectCiudad').append(`<option value="${datosCiudad.push(datos[i].Ciudad)}">${datos[i].Ciudad}</option>`)
          /*console.log(datos[i].Ciudad);*/
        }
        if(datosTipo.includes(datos[i].Tipo) == false){
          $('#selectTipo').append(`<option value=" ${datosTipo.push(datos[i].Tipo)}">${datos[i].Tipo}</option>`)
        }
      }

      $('select').material_select();
    }
  });
}

$("#mostrarTodos").click(mostrarTodo);

cargardatos();
inicializarSlider();
playVideoOnScroll();
