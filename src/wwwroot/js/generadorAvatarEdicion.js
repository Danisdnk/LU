$(document).ready(function () {
    // getData();
  
    edicionActiva = sessionStorage.getItem('Edicion');
    edicionActiva = JSON.parse(edicionActiva);
    var num = edicionActiva.numeroEdicion.toString().split('')
    var realDigits = num.map(Number)
    
    function Generador() {
      if (realDigits[1]== undefined) {
        $('#TextoEdicion').text('Edicion: ' + realDigits[0])
        $("#Titulo").attr("title", + realDigits[0] )
      } else {
        $('#TextoEdicion').text('Edicion: ' + realDigits[0] + realDigits[1]);
        $("#Titulo").attr("title", + realDigits[0] + ' ' + realDigits[1])
      }
    }
  /* 
    var data = edicionActiva.locacion.nombre.split(',');
    var arr = data.split(',');
   */
    $('#LocacionEdicion').text('Edicion: ' + edicionActiva.numeroEdicion + ' - ' + edicionActiva.locacion.nombre);
    $("#Titulo").attr("title", + realDigits[0] + ' ' + realDigits[1])
    $('#TextoEdicion').text('Edicion: ' + realDigits[0] + realDigits[1]);
    $('#PaisLu').text(edicionActiva.locacion.nombre);
    
    Generador();
  });