edicionActiva = sessionStorage.getItem('Edicion');
edicionActiva = JSON.parse(edicionActiva);

feather.replace();
// $('.dropdown-toggle').dropdown();

var fechas = [];
var numClase = [];

function copyValue(source, destination)
{
    $("#" + destination).val($("#" + source +" :selected").text());          
    //alert("El responsable" + destintation2 + " ya fue seleccionado.");
}
//obtiene a los responsables
function getResponsables(){ 
  $.ajax({
    type: "GET",
    url: '/api/Clase/Responsables/'+edicionActiva.idEdicion, 
    dataType: "json",
    
  })
  .then(function(data){
      $(".Select").html('<option hidden>Seleccionar responsable</option>');
      $.each(data,function(key, registro) {
        $(".Select").append('<option value='+registro.idResponsable+'>'+registro.nombreyApellido+'</option>');
      });         
  });
}


function validateClases(isValid) {
  
  $.ajax ({
    type : "GET",
    async: false,
    url : '/api/Clase/List/'+edicionActiva.idEdicion,
    dataType : "json",
    success : function (data)
    {
      var numClase =$('#NumClase').val()

      var IsInList = data.filter(function(x) { return x.numeroClase == numClase }).length > 0; 

      if ( IsInList == true )
      {
        $('#errorclaserepetida').show();
        $('#NumClase').css('border-color','Red');
        isValid = false;
      }

      else
      {
        $('#errorclaserepetida').hide();
        $('#NumClase').css('border-color','Green');
      }
    }

  })
  return isValid;
}

function getFechas() {
  $.ajax({
      url:"/api/Clase/Fechas/" + edicionActiva.idEdicion,
      type:"GET",
      async : false,
      success:function(data){
        fechas = data.map(function(str) {
          return moment(str).format("DD/MM/YYYY")
        });
      },
      dataType:"json"
  });
}


$(document).ready(function()
{
    getFechas();

    $("#datepicker").datepicker({
      minDate: new Date(),
      maxDate: new Date(edicionActiva.fechaFin),
      beforeShowDay: function(date) {
        if ($.datepicker.noWeekends(date)[0] === true) {
          return [ fechas.indexOf(moment(date).format("DD/MM/YYYY")) == -1 ] 
        }
        else {
          return false 
        }
      }
    });
});
  

    $(document).ready(function(){
      $(".Select").val("0");
      $("#NumClase, #numeroClaseModificar").on('input', function (){
        this.value = (this.value + '').replace(/[^0-9]/g, '');
      });
       getResponsables(); 
       });

       //TEMAS CLASE POST
var limit = 15;

$("#botonAgregar").click(function() {
    if ($(".subtema-container").length <=limit)
    {  

      var container = $(".clonedInput:first").closest(".subtema-container");
      container.find(".errorinctema").hide();
      //se asigna a clon contoneir.clone  
      clon = container.clone(); 
      
      clon.find("input").val("");
      // la variable toma al padre de inputclonado
      container.parent().append(clon);

    } 

    else{ 

        $('#canttemas').show();
        return;
    }

  });

$(document).on("click", ".subtema-container button.remove", function() {
  if ($(".subtema-container").length > 2) {
    $(this).closest(".subtema-container").remove();

  }
});

  function validate() {
    var Fecha = $('#datepicker').val();
    var NumeroClase = $('#NumClase').val();
    var TituloClase = $('#Tema').val();
    var responsable1 = $('#ResponsableText1').val();
    var responsable2 = $('#ResponsableText2').val();
    var areEqual = (responsable1.toLowerCase()) === (responsable2.toLowerCase());

    var isValid = true;

    if( Fecha.trim() == "")
    {
      $('#errorincdate').show("slow");
      $('#datepicker').css('border-color', 'Red');
      isValid = false;
    }

    else{
      $('#errorincdate').hide();
      $('#datepicker').css('border-color', 'Green');
    }

    if ( NumeroClase.trim() == "" )
    {
      $('#errorincnum').show("slow");
      $('#NumClase').css('border-color','Red');
      isValid = false;
    }
    else
    {
      $('#errorincnum').hide("slow");
      $('#NumClase').css('border-color','Green');
    }

    if ( NumeroClase != "" )
    {

      isValid = validateClases(isValid);
      //console.log(isValid);
    }
     
    if( responsable1.trim() == "")
    {
      $('#errorincresp1').show("slow");
      $('#ResponsableText1').css('border-color', 'Red');
      isValid = false
    }
    else
    {
      $('#errorincresp1').hide();
      $('#ResponsableText1').css('border-color', 'Green');
    }

    if ( responsable1.trim()!= "" && responsable2.trim()!= "" && areEqual === true ) {

      $('#erroresp1').fadeIn("slow");
      $('#ResponsableText1').css('border-color', 'Red');
      $('#ResponsableText2').css('border-color', 'Red');
      isValid = false;
      }
      else
      {
        $('#erroresp1').hide();
        if ( responsable1.trim() != "" ){
        $('#ResponsableText1').css('border-color', 'Green');
        }
        
        $('#ResponsableText2').css('border-color', '');
      }

      if( TituloClase.trim() == "" )
      {
        $('#errorinctituloclase').show("slow");
        $('#Tema').css('border-color', 'Red');
        isValid = false;
      }

      else
      {
        $('#errorinctituloclase').hide();
        $('#Tema').css('border-color', 'Green');
      }
    
    $("[name='subtema']").each(function() {
      if ($(this).val().trim() == "") {

        $(this).siblings('.errorinctema').show();
        $(this).css('border-color', 'Red');
        isValid = false;

      }

      else
      {
        $(this).siblings('.errorinctema').hide("slow");
        $(this).css('border-color', 'Green');
      }
    });

    return isValid;
  }


  function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var subtemas = $("[name=subtema]")
      .filter(function() {
        return $(this).val() !== ""
      })
      .map(function() {
        return { TituloTema: $(this).val() };
      })
      .get();

    if( $('#ResponsableText2').val().trim() == "")
    {
    
      var claseObj = {

        Fecha: moment($("#datepicker").val(),'DD-MM-YYYY'),
        NumeroClase : $("#NumClase").val(),
        Responsable1: { IdEdicion : edicionActiva.idEdicion, NombreyApellido: $("#ResponsableText1").val()  },
        TituloClase: $("#Tema").val(),
        Temas: subtemas,
        IdEdicion: edicionActiva.idEdicion

      };
    }
    else
    {
      var claseObj = {
        
        Fecha: moment($("#datepicker").val(),'DD-MM-YYYY').toISOString(),
        NumeroClase : $("#NumClase").val(),
        Responsable1: { IdEdicion : edicionActiva.idEdicion, NombreyApellido: $("#ResponsableText1").val()  }, 
        Responsable2: { IdEdicion : edicionActiva.idEdicion, NombreyApellido: $("#ResponsableText2").val()  },
        TituloClase: $("#Tema").val(),
        Temas: subtemas,
        IdEdicion: edicionActiva.idEdicion

      };
      
    }

    $.ajax({
        url: "/api/Clase/Create",
        async: false,
        data: JSON.stringify(claseObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json"
    })
    .always ( function ()
  {
    swal({
      position: 'top-center',
      type: 'success',
      title: 'La clase ha sido creada correctamente',
      showConfirmButton: false,
      timer: 2000
    })  
    
    $('#ClaseModal').modal('hide');
    $('#ClaseForm').trigger("reset");
    $("input, select", "#ClaseModal").css('border-color', '');

    listarClase();

    })
    //.fail(console.log)
}
listarClase();

// Cronograma
function listarClase(numeroPagina) {
  numeroPagina = numeroPagina ? numeroPagina : 0;
  var fechaInicioSemana = moment(edicionActiva.fechaInicio).add(numeroPagina, 'w');
  var fechaFinSemana = moment(edicionActiva.fechaInicio).add(numeroPagina + 1, 'w');

  $.ajax({
    method: "Get",
    url: "/api/Clase/List",      
    data: {
      idEdicion: edicionActiva.idEdicion,
      fechaInicio: fechaInicioSemana.toISOString(),
      fechaFin: fechaFinSemana.toISOString()
    },          
    contentType: "application/json"
  })
  .then(function(clases)
  {
    var html = "";
    for(var i=0; i < clases.length; i++)
    {
      var tema = "<ul>";
      for(var item=0; item < clases[i].temas.length; item++)
      {
        tema += "<li>" + clases[i].temas[item].tituloTema + "</li>"
      }
      tema += "</ul>"

      html += '<tr class="text-secondary">' +
                '<td>' + moment(clases[i].fecha).format('DD-MM-YYYY') + '</td>' +
                '<td>' + clases[i].numeroClase + '</td>' +
                '<td>' + clases[i].responsable1.nombreyApellido + '</td>' +
                '<td>' + (clases[i].responsable2 ? clases[i].responsable2.nombreyApellido : "-") + '</td>' +
                '<td>' + clases[i].tituloClase + '</td>' +
                '<td>' + tema + '</td>' +
                '<td><button class="btn btn-light btn-editar-clase" data-id-clase="'+ clases[i].idClase +'"><span class="text-primary" data-feather="edit-2"></span></button>'+ 
                '<button class="btn btn-light btn-enviar-clase" data-id-clase="'+ clases[i].idClase +'"><span class="text-primary" data-feather="mail"></span></button>' +
                '<button class="btn btn-light btn-eliminar-clase" data-id-clase="'+ clases[i].idClase +'"><span class="text-primary" data-feather="x"></span></button></td>'+
              '</tr>'                                
    }
    $("#table-clase tbody").html(html);
    feather.replace();
  });
}

//Validar numero de clase edit
function validateClasesEdit(idClase, callback) {  
  $.ajax ({
    type : "GET",
    async: false,
    url : '/api/Clase/List/'+edicionActiva.idEdicion,
    dataType : "json",
    success : function (data)
    {
      var numClase = $('#NumClaseModificar').val()

      var IsInList = data.filter(function(x) { 
        return x.numeroClase == numClase 
        && x.idClase != idClase
      }).length > 0; 

      if ( IsInList == true )
      {
        $('#errorclaserepetidaMod').show();
        $('#NumClaseModificar').css('border-color','Red');
      }

      else
      {
        $('#errorclaserepetidaMod').hide();
        $('#NumClaseModificar').css('border-color','Green');
        callback()
      }
    }
  })
}

//TEMAS CLASE PUT
var limit = 15;

$("#botonAgregarTemaMod").click(function() {
    if ($(".subtema-container").length <=limit)
    {  
      var container = $(".inputClonado-editar:first").closest(".subtema-container");
      container.find(".errorinctema").hide();
      //se asigna a clon contoneir.clone  
      clon = container.clone(); 
      
      clon.find("input").val("");
      // la variable toma al padre de inputclonado
      container.parent().append(clon);

    } 
    else{ 
        $('#canttemas').show();
        return;
    }
  });

$(document).on("click", ".subtema-container button.remove", function() {
  if ($(".subtema-container").length > 2) {
    $(this).closest(".subtema-container").remove();
  }
});

//Validaciones Clase Modificar
function validateEditarClase() {
  var Fecha = $('#datepickerModificar').val();
  var NumeroClase = $('#NumClaseModificar').val();
  var TituloClase = $('#TituloModificar').val();
  var responsable1 = $('#ResponsableModificarText1').val();
  var responsable2 = $('#ResponsableModificarText2').val();
  var areEqual = (responsable1.toLowerCase()) === (responsable2.toLowerCase());

  var isValid = true;

  if( Fecha.trim() == "")
  {
    $('#errorincdateMod').show("slow");
    $('#datepickerModificar').css('border-color', 'Red');
    isValid = false;
  }

  else{
    $('#errorincdateMod').hide();
    $('#datepickerModificar').css('border-color', 'Green');
  }

  if ( NumeroClase.trim() == "" )
  {
    $('#errorincnumMod').show("slow");
    $('#NumClaseModificar').css('border-color','Red');
    isValid = false;
  }
  else
  {
    $('#errorincnumMod').hide("slow");
    $('#NumClaseModificar').css('border-color','Green');
  }
   
  if( responsable1.trim() == "")
  {
    $('#errorincresp1Mod').show("slow");
    $('#ResponsableModificarText1').css('border-color', 'Red');
    isValid = false
  }
  else
  {
    $('#errorincresp1Mod').hide();
    $('#ResponsableModificarText1').css('border-color', 'Green');
  }

  if ( responsable1.trim()!= "" && responsable2.trim()!= "" && areEqual === true ) {

    $('#erroresp1Mod').fadeIn("slow");
    $('#ResponsableModificarText1').css('border-color', 'Red');
    $('#ResponsableModificarText2').css('border-color', 'Red');
    isValid = false;
    }
    else
    {
      $('#erroresp1Mod').hide();
      if ( responsable1.trim() != "" ){
      $('#ResponsableModificarText1').css('border-color', 'Green');
      }
      
      $('#ResponsableModificarText2').css('border-color', '');
    }

    if( TituloClase.trim() == "" )
    {
      $('#errorinctituloclaseMod').show("slow");
      $('#TituloModificar').css('border-color', 'Red');
      isValid = false;
    }

    else
    {
      $('#errorinctituloclaseMod').hide();
      $('#TituloModificar').css('border-color', 'Green');
    }
  
  $("[name='subtemaModificar']").each(function() {
    if ($(this).val().trim() == "") {

      $(this).siblings('.errorinctema').show();
      $(this).css('border-color', 'Red');
      isValid = false;

    }

    else
    {
      $(this).siblings('.errorinctema').hide("slow");
      $(this).css('border-color', 'Green');
    }
  });

  return isValid;
}

//Modificar clase
           
 getResponsablesEdit();
function getResponsablesEdit(){
  $.ajax({
    type: "GET",
    url: 'api/Clase/Responsables/'+edicionActiva.idEdicion, 
    dataType: "json",
    
  })
  .then(function(data){
    $(".SelectResponsable").html('<option hidden>Seleccionar responsable</option>')
      $.each(data,function(key, registro) {
        $(".SelectResponsable").append('<option value='+registro.idResponsable+'>'+registro.nombreyApellido+'</option>');
      });        
    
  });
};  
 
getFechas();

    $("#datepickerModificar").datepicker({
      minDate: new Date(),
      maxDate: new Date(edicionActiva.fechaFin),
      beforeShowDay: function(date) {
        if ($.datepicker.noWeekends(date)[0] === true) {
          return [ fechas.indexOf(moment(date).format("DD/MM/YYYY")) == -1 ] 
        }
        else {
          return false 
        }
      }
    });

    function setTemas(temas) {
      var container = $(".inputClonado-editar:first").closest(".subtema-container");
      var clon;

      if (temas.length > 0) {
        container.find("input").val(temas[0].tituloTema);
      }

      $('.es-clon').remove();
      for (var i = 1; i < temas.length; i++){
        //se asigna a clon contoneir.clone  
        clon = container.clone(); 

        clon.find("input").val(temas[i].tituloTema);
        clon.addClass('es-clon');
        // la variable toma al padre de inputclonado
        container.parent().append(clon);
      }
    }



$("#table-clase").on("click", "tbody button.btn-editar-clase", function() {
  var idClase = $(this).data("idClase");
  
  $.ajax({
    method: "GET",
    url: "api/Clase/" + idClase,
    contentType: "application/json"
  })
    .then(function(clase) {  
      $('#datepickerModificar').val(moment(clase.fecha).format('DD-MM-YYYY'));
      $("#NumClaseModificar").val(clase.numeroClase),
      $('#ResponsableModificarText1').val(clase.responsable1.nombreyApellido);
      $('#ResponsableModificarText2').val(clase.responsable2 && clase.responsable2.nombreyApellido);
      $('#TituloModificar').val(clase.tituloClase);
      setTemas(clase.temas);
      setEventoEditarClase(idClase);
      
      $('input, select', '#modalModificarClase').css('border-color','');
      $('.invalid-feedback', '#modalModificarClase').hide();

      $("#modalModificarClase").modal('show');
    })
});


function setEventoEditarClase(idClase) {
  $("#botonModificarClase").click(function() {
    //getResponsablesEdit();
    var res = validateEditarClase();
    if (res == false) {
        return false;
    }

    var subtemas = $("[name=subtemaModificar]")
      .filter(function() {
        return $(this).val() !== ""
      })
      .map(function() {
        return { TituloTema: $(this).val() };
      })
      .get();
    
    if( $('#ResponsableModificarText2').val().trim() == "")
      {

      var claseObj = {

        Fecha: moment($("#datepickerModificar").val(),'DD-MM-YYYY').toISOString(),
        NumeroClase: $("#NumClaseModificar").val(),
        Responsable1: {
          IdEdicion : edicionActiva.idEdicion, 
          NombreyApellido: $("#ResponsableModificarText1").val()
        }, 
        TituloClase: $("#TituloModificar").val(),
        Temas: subtemas,
        IdEdicion: edicionActiva.idEdicion,
        }
      }

      else {
        var claseObj = {
          Fecha: moment($("#datepickerModificar").val(),'DD-MM-YYYY').toISOString(),
          NumeroClase: $("#NumClaseModificar").val(),
          Responsable1: {
            IdEdicion : edicionActiva.idEdicion, 
            NombreyApellido: $("#ResponsableModificarText1").val()
          }, 
          Responsable2: {
            IdEdicion : edicionActiva.idEdicion, 
            NombreyApellido: $("#ResponsableModificarText2").val()
          },
          TituloClase: $("#TituloModificar").val(),
          Temas: subtemas,
          IdEdicion: edicionActiva.idEdicion,

      }
    }

    var NumeroClase = $('#NumClaseModificar').val();
    if ( NumeroClase != "" )
    {
      validateClasesEdit(idClase, function() {
        $.ajax({
          method: "PUT",
          url: "api/Clase/" + idClase,
          data: JSON.stringify(claseObj),
          contentType: "application/json"
        })
        .then(function() {         
          swal({
            position: 'top-center',
            type: 'success',
            title: 'La clase ha sido modificada',
            showConfirmButton: false,
            timer: 1500
          })
          listarClase();
          $("#paginacionSemanas li.active a").click();
          $("#modalModificarClase").modal('hide');
          $("#botonModificarClase").off();
        })
        //.fail(console.log)
      });
    }
  }
)};

  $("#numeroClase, #numeroClaseModificar").on('input', function (){
    this.value = (this.value + '').replace(/[^0-9]/g, '');
  });

// Enviar Mail
  $("#table-clase").on("click", "tbody button.btn-enviar-clase", function() {
    var idClase = $(this).data("idClase");
    Swal({
      title: '¿Desea enviar la clase?',
      confirmButtonText:  'SI',
      cancelButtonText:  'NO',
      showCancelButton: true,
      showCloseButton: true,
    })
    .then(function(){
      $.ajax({
        method: "POST",
        url: "api/Clase/" + idClase + "/EnviarMail",
        contentType: "application/json"
      })
    })
  });


  //obtener Clases por semana

function GetPaginacion(){
  var fechaIni = moment(edicionActiva.fechaInicio),
      fechaFin = moment(edicionActiva.fechaFin);

  var diferencia = fechaFin.diff(fechaIni, 'week');
  
  var html = "";
  for (var i = 0; i < diferencia; i ++) {
    html += '<li class="page-item"><a class="page-link" onclick="listarClase(' + i + ')">' + (i + 1) + '</a></li>';
  }

  $("#paginacionSemanas").append(html);

  $("#paginacionSemanas").on('click', 'a', function(ev) {
    ev.preventDefault();

    $("#paginacionSemanas li").removeClass('active');
    $(this).closest('li').addClass('active');
  })

  $("#paginacionSemanas a:eq(0)").click();
}


GetPaginacion();


//Eliminar una clase

$("#table-clase").on("click", "tbody button.btn-eliminar-clase", function() {
  var idClase = $(this).data("idClase"); 

  Swal({
    title: '¿Seguro desea elimanar la clase?',
    confirmButtonText:  'SI',
    cancelButtonText:  'NO',
    showCancelButton: true,
    showCloseButton: true,
  })
  .then(function(respuesta) {
    if (respuesta.value) {
      $.ajax({
      method: "DELETE",
      url: "api/Clase/" + idClase,
      contentType: "application/json"
      })
      .then(function(){
        $("#paginacionSemanas a:eq(0)").click();
      })
    }})
  }
)