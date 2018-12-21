/* edicionActiva = sessionStorage.getItem('Edicion');
edicionActiva = JSON.parse(edicionActiva);

$(document).ready(function(){
  getData()
SelectEdicion()
  function SelectEdicion(){
    $.ajax({
       method: "GET",
       url: "api/Edicion/",
       contentType: "application/json"
     })
     .then(function(data){
         $.each(data,function(key, registro) {
           $(".Select").append('<option value='+registro.idEdicion+'>'+registro.idEdicion+'</option>');
         });         
     });
   }


 */

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
          $('.invalid-feedback').html('');
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
          listarEdicionesActivas();
        }) 
        .fail(function(jqXHR, textStatus, errorThrown) {
          $('.invalid-feedback').html("<div class='alert alert-danger'>"+ jqXHR.responseText+"</div>");
        
        })
      });

listarEdicionesActivas();

// lista las edicones activas en el inicio
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
         

        $("#inicio").removeAttr('href');
        $("#cronograma").removeAttr('href');
        $("#postulante").removeAttr('href');

     /*    $("#postulante").attr('href');
        $("#inicio").attr('href');
        $("#cronograma").attr('href');
        $("#postulante").attr('href'); */
        $('#PanelEdicion').removeClass('inactivo');

        $('#ediciones-activas').removeClass('d-none');

      }
  
      var html = "";
      for(var i=0; i < ediciones.length; i++)
      {
        html += '<tr class="text-secondary tabla-ediciones-activas">' +
                  '<td>' + ediciones[i].idEdicion + '</td>' +
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
                title: 'La Edicion ha sido modificada',
                showConfirmButton: false,
                timer: 1500
              })
              listarEdicionesActivas();
              $("#modalEdicionEditar").modal('hide');
              $("#botonEditarEdicion").off();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
              $('.invalid-feedback').html("<div class='alert alert-danger'>"+ jqXHR.responseText+"</div>");
            })
          })};

          $("#NumeroPostulante, #NumeroPostulanteEditar").on('input', function (){
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


