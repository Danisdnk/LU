
        $(document).ready(function(){
            getData();
         });
  
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

          $('#btnCrearNuevaEdicion').click(function() {
            $('.invalid-feedback').html('');
          })
  
          $("#botonCrearEdicion").click(function() {
            $('.invalid-feedback').html('');

              var objeto = {  
                Locacion: { 
                  IdLocacion: parseInt($("#Locacion").val()) 
                }, 
                FechaInicio: $("#FechaInicio").val(), 
                FechaFin: $("#FechaFin").val(),
                CantidadPostulantes: $("#NumeroPostulante").val()
              };
  
              $.ajax({
                method: "POST",
                url: "api/Edicion/Crear",
                data: JSON.stringify(objeto),
                contentType: "application/json"
              })
                .then(function() {        
                  $('.invalid-feedback').html('')
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
                  $('#NumeroPostulante').val("");
                  $('#Locacion').val("")
                }) 
                .fail(function(jqXHR, textStatus, errorThrown) {
                  $('.invalid-feedback').html("<div class='alert alert-danger'>"+ jqXHR.responseText+"</div>");
                
                })
              });
        
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
                            '<td>' + ediciones[i].idEdicion + '</td>' +
                            '<td>' + moment(ediciones[i].fechaInicio).format('DD-MM-YYYY') + '</td>' +
                            '<td>' + moment(ediciones[i].fechaFin).format('DD-MM-YYYY') + '</td>' +
                            '<td>' + ediciones[i].cantidadPostulantes + '</td>' +
                            '<td>' + ediciones[i].locacion.nombre + '</td>' +
                            '<td><button class="btn btn-light" data-id-edicion="'+ ediciones[i].idEdicion +'"><span class="text-primary" data-feather="edit-2"></span></button></td>'+
                          '</tr>'                                
                }
                $("#tabla-ediciones tbody").html(html);
                feather.replace();
              });
            }
            listarEdiciones();

              
              $(document).ready(function(){
                getEdit();
              });

              function getEdit(){
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
              

              $("#tabla-ediciones").on("click", "tbody button", function() {
                var idEdicion = $(this).data("idEdicion");

                $.ajax({
                  method: "GET",
                  url: "api/Edicion/" + idEdicion,
                  contentType: "application/json"
                })
                  .then(function(edicion) {         
                    $('#FechaInicioEditar').val(moment(edicion.fechaInicio).format('YYYY-MM-DD'));
                    $('#FechaFinEditar').val(moment(edicion.fechaFin).format('YYYY-MM-DD'));
                    $('#NumeroPostulanteEditar').val(edicion.cantidadPostulantes);
                    $('#LocacionEditar').val(edicion.locacion.idLocacion)
                    setEventoEditarEdicion(idEdicion);
                    $('.invalid-feedback').html('');
                    $("#modalEdicionEditar").modal('show');
                  })
              });

              function setEventoEditarEdicion(idEdicion) {
                $("#botonEditarEdicion").click(function() {
                  var objeto = {  
                    Locacion: { 
                      IdLocacion: parseInt($("#LocacionEditar").val()) 
                    }, 
                    FechaInicio: $("#FechaInicioEditar").val(), 
                    FechaFin: $("#FechaFinEditar").val(),
                    CantidadPostulantes: $("#NumeroPostulanteEditar").val()
                  }
      
                  $.ajax({
                    method: "PUT",
                    url: "api/Edicion/" + idEdicion,
                    data: JSON.stringify(objeto),
                    contentType: "application/json"
                  })
                  
                    .then(function() {         
                      $('.invalid-feedback').html('')
                      swal({
                        position: 'top-center',
                        type: 'success',
                        title: 'La Edicion ha sido guardada',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      listarEdiciones();
                      $("#modalEdicionEditar").modal('hide');
                      $("#botonEditarEdicion").off();
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                      $('.invalid-feedback').html("<div class='alert alert-danger'>"+ jqXHR.responseText+"</div>");
                    })
                  })};
                
              
            
