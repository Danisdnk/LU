
function validateEditions(isValid) {
  
  $.ajax ({
    type : "GET",
    async: false,
    url : '/api/Edicion/List/',
    dataType : "json",
    success : function (data)
    {
    
    var numEdicion = $("#NumeroEdicion").val();
    var IsInList = data.filter(function(x) { return x == numEdicion }).length > 0; 
    //console.log(IsInList);

    if ( IsInList == true )
    {
      $('.EdicionRepetida').show();
      $('#NumeroEdicion').css('border-color','Red');
      isValid = false;
    }

    else
    {
      $('.EdicionRepetida').hide();
      $('#NumeroEdicion').css('border-color','Green');
    }

    }

  })

  return isValid;

}
 

//Fecha Ediciones

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

          
          //enlista las locaciones
          // function getData(){
          // $.ajax({
          //   type: "GET",
          //   url: 'api/Locacion',
          //   dataType: "json",
          //   success: function(data){
          //     $.each(data,function(key, registro) {
          //       $("#Locacion").append('<option value='+registro.idLocacion+'>'+registro.nombre+'</option>');
          //     });
          //   },
          //   error: function(data) {
          //     alert('error');
          //   }});
          // }
          listarEdiciones();

          // crear/guardar una edicion - modal
          $("#botonCrearEdicion").click(function() {
            var validar = validarEdicion();
            if (validar == false) {
            return false;
            }

              var objeto = {  
                Locacion: { 
                  IdLocacion: parseInt($("#Locacion").val()) 
                }, 
                FechaInicio: moment($("#FechaInicio").val(), 'DD-MM-YYYY').toISOString(), 
                FechaFin: moment($("#FechaFin").val(),'DD-MM-YYYY').toISOString(),
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
                  $('#FechaInicio').val("");
                  $('#FechaFin').val("");
                  $('#NumeroEdicion').val("");
                  $('#NumeroPostulante').val("");
                  $('#Locacion').val("")

                  $('input, select', '#modalEdicion').css('border-color', '');
                  listarEdiciones();
                  
                })
              });

              listarEdiciones();


              //lista todas las ediciones
            function listarEdiciones(){
              $.ajax({
                method: "Get",
                url: "api/Edicion/",                
                contentType: "application/json"
              })
              .then(function(ediciones)
              {
                var html = "";
                for(var i=0; i < ediciones.length; i++)
                {
                  html += '<tr class="text-secondary">' +
                            '<td>' + ediciones[i].numeroEdicion + '</td>' +
                            '<td>' + moment(ediciones[i].fechaInicio).format('DD-MM-YYYY') + '</td>' +
                            '<td>' + moment(ediciones[i].fechaFin).format('DD-MM-YYYY') + '</td>' +
                            '<td>' + ediciones[i].cantidadPostulantes + '</td>' +
                            '<td>' + ediciones[i].locacion.nombre + '</td>' +
                            '<td><button class="btn btn-light" data-id-edicion="'+ ediciones[i].idEdicion +'"><span class="text-primary" data-feather="eye"></span></button></td>'+
                          '</tr>'                                
                }
                $("#tabla-ediciones tbody").html(html);
                feather.replace();
              });
            }
            

            //No permite ingresar caracteres que no son numericos
            $("#NumeroPostulante, #NumeroPostulanteEditar, #NumeroEdicion, #NumeroEdicionEditar").on('input', function (){
              this.value = (this.value + '').replace(/[^0-9]/g, '');
            });

                
            $("#tabla-ediciones").on("click", "tbody button", function() {
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

  if(FechaInicio.trim() == "")
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

  if ( NumeroEdicion != "" )
  {
    isValid = validateEditions(isValid);
    //console.log(isValid);
  }

  
  return isValid;

}