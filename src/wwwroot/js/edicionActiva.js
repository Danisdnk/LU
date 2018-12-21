$(document).ready(function(){

  feather.replace()
  $('.dropdown-toggle').dropdown()
  getData()

//enlista las locaciones
function getData(){
  $.ajax({
    type: "GET",
    url: 'api/Locacion',
    dataType: "json",
    success: function(data){
      $.each(data,function(key, registro) {
        $("#Locacion").append('<option value='+registro.idLocacion+'>'+registro.nombre+'</option>');
      });
    },
    error: function(data) {
      alert('error');
    }});
  }

  function validarEdicionEditar( idEdicion, callback) {
  
    $.ajax ({
      type : "GET",
      async: false,
      url : '/api/Edicion/List/',
      data: {
        idEdicionExcluido: idEdicion
      },
      dataType : "json",
      success : function (data)
      {      
        var numEdicion = $("#NumeroEdicionEditar").val();  
        var IsInList = data.filter(function(x) { return x == numEdicion}).length > 0; 
        //console.log(IsInList);
        if ( IsInList )
        {
          $('.errorEdicionRepetida').show();
          $('#NumeroEdicionEditar').css('border-color','Red');
          isValid = false;
        }
        else
        {
          $('.errorEdicionRepetida').hide();
          $('#NumeroEdicionEditar').css('border-color','Green');
          callback();
        }
     }
  
    })
  }
  //Calendar Ediciones

  $("#FechaInicio").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    onSelect: function(date) {
      $("#FechaFin").datepicker('destroy');
      $("#FechaFin").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: moment(date, "DD-MM-YYYY").toDate(),
        maxDate: moment(date, "DD-MM-YYYY").add(15, 'week').toDate(),
      });
    }
  });

  $("#FechaFin").datepicker({
    minDate: new Date(),
    maxDate: moment(new Date()).add(15, 'week').toDate()
  });

  //Calendario Ediciones Modificar

  $("#FechaInicioEditar").datepicker({
    dateFormat: "dd-mm-yy",
    minDate: new Date(),
    onSelect: function(date) {
      $("#FechaFinEditar").datepicker('destroy');
      $("#FechaFinEditar").datepicker({
        dateFormat: "dd-mm-yy",
        minDate: moment(date, "DD-MM-YYYY").toDate(),
        maxDate: moment(date, "DD-MM-YYYY").add(15, 'week').toDate(),
      });
    }
  });

  $("#FechaFinEditar").datepicker({
    minDate: new Date(),
    maxDate: moment(new Date()).add(15, 'week').toDate()
  });

  //Crear Edicion

  $("#botonCrearEdicion").click(function() {
    debugger
    var validar = validarEdicion();
    if (validar == false) {
      return false;
    }

    var objeto = {  
      Locacion: { 
        IdLocacion: parseInt($("#Locacion").val()) 
      }, 
      FechaInicio: moment($("#FechaInicio").val(), 'DD-MM-YYYY').toISOString(), 
      FechaFin: moment($("#FechaFin").val(), 'DD-MM-YYYY').toISOString(),
      NumeroEdicion : $('#NumeroEdicion').val(),
      CantidadPostulantes: $("#NumeroPostulante").val()
    };

    $.ajax({
      method: "POST",
      url: "api/Edicion/Crear",
      data: JSON.stringify(objeto),
      contentType: "application/json"
    })
      .then(function() {        
          swal({
            position: 'top-center',
            type: 'success',
            title: 'La Edicion ha sido guardada',
            showConfirmButton: false,
            timer: 1500
          })  
        $("#modalEdicion").modal('hide');
        $('#NumeroEdicion').val("");
        $('#FechaInicio').val("");
        $('#FechaFin').val("");
        $('NumeroEdicion').val(""),
        $('#NumeroPostulante').val("");
        $('#Locacion').val("")
        listarEdicionesActivas();
      }) 
  });

listarEdicionesActivas();

// lista las ediciones activas en el inicio
function listarEdicionesActivas(){
    $.ajax({
      method: "Get",
      url: "api/Edicion/",  
      data: {
        soloActivas: true
      },              
      contentType: "application/json"
    })
    .then(function(ediciones)
    {
      if(ediciones == null || ediciones.length == 0)
      {
        $('#SinEdiciones').removeClass('d-none');
        $('#ediciones-activas').addClass('d-none');
        $('#inicio').addClass('disabled');
        $('#cronograma').addClass('disabled');
        $('#postulante').addClass('disabled');
        $('#PanelEdicion').addClass('inactivo');
       

        $("#inicio").removeAttr('href');
        $("#cronograma").removeAttr('href');
        $("#postulante").removeAttr('href');

      }
      else {
        $('#SinEdiciones').addClass('d-none');
        $('#ediciones-activas').removeClass('d-none');
        $("#inicio").removeAttr('href');
        $("#cronograma").removeAttr('href');
        $("#postulante").removeAttr('href');
        $('#PanelEdicion').removeClass('inactivo');
        $('#ediciones-activas').removeClass('d-none');

      }
  
      var html = "";
      for(var i=0; i < ediciones.length; i++)
      {
        html += '<tr class="text-secondary tabla-ediciones-activas">' +
                  '<td>' + ediciones[i].numeroEdicion + '</td>' +
                  '<td>' + moment(ediciones[i].fechaInicio).format('DD-MM-YYYY') + '</td>' +
                  '<td>' + moment(ediciones[i].fechaFin).format('DD-MM-YYYY') + '</td>' +
                  '<td>' + ediciones[i].cantidadPostulantes + '</td>' +
                  '<td>' + ediciones[i].locacion.nombre + '</td>' +
                  '<td><button class="btn btn-light btn-modificar-edicion" data-id-edicion="'+ ediciones[i].idEdicion +'"><span class="text-primary" data-feather="edit-2"></span></button>'+
                      '<button class="btn btn-light btn-visualizar-edicion" data-id-edicion="'+ ediciones[i].idEdicion +'"><span class="text-primary" data-feather="eye"></span></button></td>'+
                '</tr>'   
      }      
      $("#tabla-ediciones-activas tbody").html(html);
      feather.replace();
    });
  }
    
    //prepara la locacion de una edicion para ser modificada
    getLocacionEdit();
    function getLocacionEdit(){
        $.ajax({
            type: "GET",
            url: 'api/Locacion',
            dataType: "json",
            success: function(data){
                $.each(data,function(key, registro) {
                    $("#LocacionEditar").append('<option value='+registro.idLocacion+'>'+registro.nombre+'</option>');
                });
            },
            error: function(data) {
                alert('error');
            }});
    }
    //Modificar Edicion
    $("#tabla-ediciones-activas").on("click", "tbody button.btn-modificar-edicion", function() {
        var idEdicion = $(this).data("idEdicion");

        $.ajax({
          method: "GET",
          url: "api/Edicion/" + idEdicion,
          contentType: "application/json"
        })
          .then(function(edicion) {         
            $('#FechaInicioEditar').val(moment(edicion.fechaInicio).format('DD-MM-YYYY'));
            $('#FechaFinEditar').val(moment(edicion.fechaFin).format('DD-MM-YYYY'));
            $('#NumeroEdicionEditar').val(edicion.numeroEdicion);
            $('#NumeroPostulanteEditar').val(edicion.cantidadPostulantes);
            $('#LocacionEditar').val(edicion.locacion.idLocacion)
            setEventoEditarEdicion(idEdicion);
            
            $('input, select', '#modalEdicionEditar').css('border-color','');
            $('.invalid-feedback', '#modalEdicionEditar').hide();

            $("#modalEdicionEditar").modal('show');
          })
      });

      function setEventoEditarEdicion(idEdicion) {
        $("#botonEditarEdicion").click(function() {
          var validar = validarEdicionEdit(idEdicion);
          if (validar == false) {
          return false;
          }
          var objeto = {  
            Locacion: { 
              IdLocacion: parseInt($("#LocacionEditar").val()) 
            }, 
            FechaInicio: moment($("#FechaInicioEditar").val(), 'DD-MM-YYYY').toISOString(), 
            FechaFin: moment($("#FechaFinEditar").val(), 'DD-MM-YYYY').toISOString(),
            NumeroEdicion : $('#NumeroEdicionEditar').val(),
            CantidadPostulantes: $("#NumeroPostulanteEditar").val()
          }

          var NumeroEdicion = $('#NumeroEdicionEditar').val();
          if(NumeroEdicion != "") 
          {
            validarEdicionEditar(idEdicion, function(){
              $.ajax({
                method: "PUT",
                url: "api/Edicion/" + idEdicion,
                data: JSON.stringify(objeto),
                contentType: "application/json"
              })
                .then(function() {         
                  swal({
                    position: 'top-center',
                    type: 'success',
                    title: 'La Edicion ha sido modificada',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  listarEdicionesActivas();
                  $("#modalEdicionEditar").modal('hide');
                  $("#botonEditarEdicion").off();
                })

            });
          }


          
          })};

          $("#NumeroPostulante, #NumeroPostulanteEditar, #NumeroEdicion, #NumeroEdicionEditar",).on('input', function (){
            this.value = (this.value + '').replace(/[^0-9]/g, '');
          });

          //Visualizar Edicion

          $("#tabla-ediciones-activas").on("click", "tbody button.btn-visualizar-edicion", function() {
            var idEdicion = $(this).data("idEdicion");

            $.ajax({
                method: "GET",
                url: "api/Edicion/" + idEdicion,
                contentType: "application/json"
              })
                .then(function(edicion) {
                    sessionStorage.setItem('Edicion', JSON.stringify(edicion));
                    window.location='Inicio.html'
                });
          });


// Validaciones Edicion Crear

function validarEdicion(){
  var FechaInicio = $('#FechaInicio').val();
  var FechaFin = $('#FechaFin').val();
  var NumeroPostulante = $('#NumeroPostulante').val();
  var NumeroEdicion = $('#NumeroEdicion').val();

  var isValid = true;

  if( FechaInicio.trim() == "" )
  {
    $('.errorFechaIni').show("slow");
    $('#FechaInicio').css('border-color', 'Red');
      isValid = false;
  }
  else{
    $('.errorFechaIni').hide();
    $('#FechaInicio').css('border-color', 'Green');
  }

  if(FechaFin.trim() == "")
  {
    $('.errorFechaFin').show("slow");
    $('#FechaFin').css('border-color', 'Red');
    isValid = false;
  }
  else {
    $('.errorFechaFin').hide();
    $('#FechaFin').css('border-color', 'Green');
  }

  if( NumeroEdicion.trim() == "" )
  {
    $('.errorNumeroEdicion').show("slow");
    $('#NumeroEdicion').css('border-color','Red');
  }
  else
  {
    $('.errorNumeroEdicion').hide();
    $('#NumeroEdicion').css('border-color','Green');
  }

  if(NumeroPostulante.trim() == "")
  {
    $('.errorNumPostulante').show("slow");
    $('#NumeroPostulante').css('border-color', 'Red');
    isValid = false;
  }
  else {
    $('.errorNumPostulante').hide();
    $('#NumeroPostulante').css('border-color', 'green');
  }
  
  return isValid;

}


// Validaciones Edicion Modificar

function validarEdicionEdit(idEdicion){
  var FechaInicio = $('#FechaInicioEditar').val();
  var FechaFin = $('#FechaFinEditar').val();
  var NumeroPostulante = $('#NumeroPostulanteEditar').val();
  var NumeroEdicion = $('#NumeroEdicionEditar').val();

  var isValid = true;

  if(FechaInicio.trim() == "")
  {
    $('.errorFechaIniEdit').show("slow");
    $('#FechaInicioEditar').css('border-color', 'Red');
      isValid = false;
  }
  else{
    $('.errorFechaIniEdit').hide();
    $('#FechaInicioEditar').css('border-color', 'Green');
  }

  if(FechaFin.trim() == "")
  {
    $('.errorFechaFinEdit').show("slow");
    $('#FechaFinEditar').css('border-color', 'Red');
    isValid = false;
  }
  else {
    $('.errorFechaFinEdit').hide();
    $('#FechaFinEditar').css('border-color', 'Green');
  }

  if(NumeroPostulante.trim() == "")
  {
    $('.errorNumPostulanteEdit').show("slow");
    $('#NumeroPostulanteEditar').css('border-color', 'Red');
    isValid = false;
  }
  else {
    $('.errorNumPostulanteEdit').hide();
    $('#NumeroPostulanteEditar').css('border-color', 'green');
  }

  if(NumeroEdicion.trim() == "")
  {
    $('.errorNumeroEdicion').show();
    $('#NumeroEdicionEditar').css('border-color', 'Red');
    isValid = false;
  }
  else {
    $('.errorNumeroEdicion').hide();
    $('#NumeroEdicionEditar').css('border-color', 'green');
  }
  return isValid;
}

});