edicionActiva = sessionStorage.getItem('Edicion');
edicionActiva = JSON.parse(edicionActiva);


feather.replace();
// $('.dropdown-toggle').dropdown();

var paises = [];
var ArrIdCards = [];

function getCountries(){
  $.ajax({
    type: "GET",
    url: 'api/Paises/List', 
    dataType: "json",
    
  })
  .then(function(data){
      $.each(data,function(key, registro) {
        $(".Select").append('<option value='+registro.idPais+'>'+registro.descripcion+'</option>');
      });         
  });
}

function GetIdCard() {
  $.ajax({
    type: "GET",
    url : 'api/Postulante/List/'+edicionActiva.idEdicion,
  })
}


function CandidateValidate(isValid) {
  
  var i = 0;
  
  $.ajax ({
    type : "GET",
    async: false,
    url : '/api/Postulante/List/'+edicionActiva.idEdicion,
    dataType : "json",
    success : function (data)
    {
    $.each (data, function (key, registro)
  {
    ArrIdCards[i] = registro.dni;
    i++;
  })
  console.log (ArrIdCards)
  var foundIdCard = $.inArray($("#DNI").val(), ArrIdCards) > -1;
  console.log(foundIdCard)

  if ( foundIdCard )
  {
    $('#RepeatedCandidate').show();
    $('#DNI').css('border-color','Red');
    isValid = false;
  }

  else 
  {
    $('#RepeatedCandidate').hide ();
    $('#DNI').css('border-color','Green');
  }

}
  })

  return isValid;

}
  
$(document).ready(function(){

      $(".Select").val("0");
       getCountries();
     

       $("#StreetNumber, #DNI, #Telephone, #Floor, #Team").on('input', function (){
        this.value = (this.value + '').replace(/[^0-9]/g, '');
      });
    })
    
      function validateEmail( $email ) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );

        function validar(e) {
          if (e.target.value.trim() == "")
           alert("debe ingresar un valor en el campo");
          else
           alert("ingreso "+e.target.value.trim()+", es correcto!");
         }
      }

  function validate() {
    var FullName = $('#Fullname').val();
    var IdCard = $('#DNI').val();
    var Role = $('#Role').val();
    var Street = $('#Street').val();
    var StreetNumber = $('#StreetNumber').val();
    var location = $('#Location').val();
    var Province = $('#Province').val();
    var CP = $('#CP').val();
    var Country = $('#Country').val();
    var Telephone = $('#Telephone').val();
    var Email = $('#Email').val();
    var Department = $('#Department').val();
    var Floor = $('#Floor').val();
    var LinkedIn = $('#LinkedIn').val();
    var Github = $('#GitHub').val();

    var isValid = true;

    if( FullName.trim() == "")
    {
      $('#incFullname').show("slow");
      $('#Fullname').css('border-color', 'Red');
      isValid = false;
    }
   
    else{
      $('#incFullname').hide();
      $('#Fullname').css('border-color', 'Green');
    }

    if ( IdCard == "" )
    {
      $('#incIdCard').show("slow");
      $('#DNI').css('border-color','Red');
      isValid = false;
    }
    else
    {
      $('#incIdCard').hide("slow");
      $('#DNI').css('border-color','Green');
    }

    if ( $('#DNI').val() != "" )
    {
      isValid = CandidateValidate(isValid);
    console.log(isValid);
    }
    if( Role == "")
    {
      $('#incRole').show("slow");
      $('#Role').css('border-color', 'Red');
      isValid = false
    }

    else
    {
      $('#incRole').hide();
      $('#Role').css('border-color', 'Green');
    }

      if( Street.trim() == "" )
      {
        $('#incStreet').show("slow");
        $('#Street').css('border-color', 'Red');
        isValid = false;
      }

      else
      {
        $('#incStreet').hide();
        $('#Street').css('border-color', 'Green');
      }
    

      if ( StreetNumber == "" )
      {
        $('#incStNumber').show();
        $('#StreetNumber').css('border-color','Red');
        isValid = false;
      }

      else
      {
        $('#incStNumber').hide();
        $('#StreetNumber').css('border-color','Green');
      }
      
      if ( location.trim() == "" )
      {
        $('#incLoc').show();
        $('#Location').css('border-color','Red');
        isValid = false;
      }
      else
      {
        $('#incLoc').hide();
        $('#Location').css('border-color','Green');
      }
      
      if ( Province.trim() == "" )
      {
        $('#incProv').show();
        $('#Province').css('border-color', 'Red');
        isValid = false;
      }
      else
      {
        $('#incProv').hide();
        $('#Province').css('border-color', 'Green');
      }

      if ( CP == "" )
      {
        $('#incCP').show();
        $('#CP').css('border-color', 'Red');
        isValid = false;
      }
      else
      {
        $('#incCP').hide();
        $('#CP').css('border-color', 'Green');
      }

      if ( Country == "" )
      {
        $('#incCountry').show();
        $('#Country').css('border-color', 'Red');
        isValid = false;
      }
      else
      {
        $('#incCountry').hide();
        $('#Country').css('border-color', 'Green');
      }

      if ( ( Department.trim() == "" && Floor != "" ) || ( Department.trim() != "" && Floor == "" ) )
      {
        $('#incDepOrFloor').show();
        $('#Department').css('border-color','Red');
        $('#Floor').css('border-color','Red');
        isValid = false;

      }
      else if ( ( Department.trim() != "" && Floor != "") )
      {
        $('#incDepOrFloor').hide();
        $('#Department').css('border-color','Green');
        $('#Floor').css('border-color','Green');

      }
      else if ( (Department.trim() == "" && Floor == "") )
      {
        $('#incDepOrFloor').hide();
        $('#Department').css('border-color','Grey');
        $('#Floor').css('border-color','Grey');
      }

      if( Telephone == "" )
      {
        $('#incTel').show();
        $('#Telephone').css('border-color', 'Red');
        isValid = false;
      }
      else
      {
        $('#incTel').hide();
        $('#Telephone').css('border-color', 'Green');
      }

      if ( Email.trim() == "" )
      {
        $('#incEmail').show();
        $('#Email').css('border-color', 'Red');
        isValid = false;
      }
      else
      {
        $('#incEmail').hide();
        $('#Email').css('border-color', 'Green');
      }

      if ( Email.trim() != "" && !validateEmail(Email) )
      {
        $('#invalidEmail').show();
        $('#Email').css('border-color', 'Red');
        isValid = false;
       }
       else if ( Email.trim() != "" && validateEmail(Email))
       {
        $('#invalidEmail').hide();
        $('#Email').css('border-color', 'Green');
       }

       if( LinkedIn != "" && (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(LinkedIn) && LinkedIn.toLowerCase().indexOf("linkedin.com") > 0) )
       {
         $('#invalidLinkedIn').hide();
         $('#LinkedIn').css('border-color','Green'); 
         }
         else if ( LinkedIn != "" && !(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(LinkedIn) && LinkedIn.toLowerCase().indexOf("linkedin.com") > 0))
         {
         $('#invalidLinkedIn').show();
         $('#LinkedIn').css('border-color','Red');
         isValid = false;
       }
       else if ( LinkedIn == "" )
       {
         $('#invalidLinkedIn').hide();
         $("#LinkedIn").css('border-color', ' ');
       }
     
       if( Github != "" && (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(Github) && Github.toLowerCase().indexOf("github.com") > 0) )
       {
         $('#invalidGithub').hide();
         $('#GitHub').css('border-color','Green'); 
         }
         else if ( Github != "" && !(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(Github) && Github.toLowerCase().indexOf("github.com") > 0))
         {
         $('#invalidGithub').show();
         $('#GitHub').css('border-color','Red');
         isValid = false;
       }
       else if ( Github == "" )
       {
         $('#invalidGithub').hide();
         $("#GitHub").css('border-color', ' ');
       }

    return isValid;
  }


  function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    if ( $('#Department').val() == "" )
    {
      $('#Department').val(null);
    }
    if ( $('#Floor').val() == "" )
    {
      $('#Floor').val(null);
    }
    if ( $('#GitHub').val() == "" )
    {
      $('#GitHub').val(null);
    }
    if ( $('#LinkedIn').val() == "" )
    {
      $('#LinkedIn').val(null);
    }
    if ( $('#Team').val() == "" )
    {
      $('#Team').val(null);
    }
    
      var obj = {

        domicilio : {
          calle : $('#Street').val(),
          pais : {
            idPais : parseInt($("#Country").val()),
            descripcion : $("#Country :selected").text()

          },
          numeroCalle : $('#StreetNumber').val(),
          localidad : $('#Location').val (),
          provincia : $('#Province').val(),
          codigoPostal : $ ('#CP').val(),
          departamento : $('#Department').val(),
          piso : $('#Floor').val(),
          
        },
        rol : $('#Role').val(),
        dni : $('#DNI').val(),
        nombreyApellido: $('#Fullname').val(),
        email : $('#Email').val(),       
        telefono : $('#Telephone').val(),
        gitHub : $('#GitHub').val(),
        linkedIn : $('#LinkedIn').val(),
        equipo : $('#Team').val(),
        idEdicion : edicionActiva.idEdicion
  
      };

    $.ajax({
        url: "/api/Postulante/Add/",
        async: false,
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json"
    })
    .then( function ()
    {
      swal({
        position: 'top-center',
        type: 'success',
        title: 'El candidato ha sido agregado correctamente',
        showConfirmButton: false,
        timer: 2000
      })
      
      $('#CandidateModal').modal('hide');
      $('#candform').trigger("reset");
      $("input, select", "#CandidateModal").css('border-color', '');

      MostrarPostulantes();
    })
    .fail(console.log)
}


function validateModification() {

  var FullName = $('#FullnameModif').val();
  var IdCard = $('#DNIModif').val();
  var Role = $('#RoleModif').val();
  var Street = $('#StreetModif').val();
  var StreetNumber = $('#StreetNumberModif').val();
  var location = $('#LocationModif').val();
  var Province = $('#ProvinceModif').val();
  var CP = $('#CPModif').val();
  var Country = $('#CountryModif').val();
  var Telephone = $('#TelephoneModif').val();
  var Email = $('#EmailModif').val();
  var Department = $('#DepartmentModif').val();
  var Floor = $('#FloorModif').val();
  var LinkedIn = $('#LinkedInModif').val();
  var Github = $('#GitHubModif').val();

  var isValid = true;

  if( FullName.trim() == "")
  {
    $('#incFullnameModif').show("slow");
    $('#FullnameModif').css('border-color', 'Red');
    isValid = false;
  }
 
  else{
    $('#incFullnameModif').hide();
    $('#FullnameModif').css('border-color', 'Green');
  }

  if ( IdCard == "" )
  {
    $('#incIdCardModif').show("slow");
    $('#DNIModif').css('border-color','Red');
    isValid = false;
  }
  else
  {
    $('#incIdCardModif').hide("slow");
    $('#DNIModif').css('border-color','Green');
  }

  if ( $('#DNIModif').val() != "" )
  {
    isValid = CandidateValidate(isValid);
  console.log(isValid);
  }
  if( Role == "")
  {
    $('#incRoleModif').show("slow");
    $('#RoleModif').css('border-color', 'Red');
    isValid = false
  }

  else
  {
    $('#incRoleModif').hide();
    $('#RoleModif').css('border-color', 'Green');
  }

    if( Street.trim() == "" )
    {
      $('#incStreetModif').show("slow");
      $('#StreetModif').css('border-color', 'Red');
      isValid = false;
    }

    else
    {
      $('#incStreetModif').hide();
      $('#StreetModif').css('border-color', 'Green');
    }
  

    if ( StreetNumber == "" )
    {
      $('#incStNumberModif').show();
      $('#StreetNumberModif').css('border-color','Red');
      isValid = false;
    }

    else
    {
      $('#incStNumberModif').hide();
      $('#StreetNumberModif').css('border-color','Green');
    }
    
    if ( location.trim() == "" )
    {
      $('#incLocModif').show();
      $('#LocationModif').css('border-color','Red');
      isValid = false;
    }
    else
    {
      $('#incLocModif').hide();
      $('#LocationModif').css('border-color','Green');
    }
    
    if ( Province.trim() == "" )
    {
      $('#incProvModif').show();
      $('#ProvinceModif').css('border-color', 'Red');
      isValid = false;
    }
    else
    {
      $('#incProvModif').hide();
      $('#ProvinceModif').css('border-color', 'Green');
    }

    if ( CP == "" )
    {
      $('#incCPModif').show();
      $('#CPModif').css('border-color', 'Red');
      isValid = false;
    }
    else
    {
      $('#incCPModif').hide();
      $('#CPModif').css('border-color', 'Green');
    }

    if ( Country == "" )
    {
      $('#incCountryModif').show();
      $('#CountryModif').css('border-color', 'Red');
      isValid = false;
    }
    else
    {
      $('#incCountryModif').hide();
      $('#CountryModif').css('border-color', 'Green');
    }

    if ( ( Department.trim() == "" && Floor != "" ) || ( Department.trim() != "" && Floor == "" ) )
    {
      $('#incDepOrFloorModif').show();
      $('#DepartmentModif').css('border-color','Red');
      $('#FloorModif').css('border-color','Red');
      isValid = false;

    }
    else if ( ( Department.trim() != "" && Floor != "") )
    {
      $('#incDepOrFloorModif').hide();
      $('#DepartmentModif').css('border-color','Green');
      $('#FloorModif').css('border-color','Green');

    }
    else if ( (Department.trim() == "" && Floor == "") )
    {
      $('#incDepOrFloorModif').hide();
      $('#DepartmentModif').css('border-color','Grey');
      $('#FloorModif').css('border-color','Grey');
    }

    if( Telephone == "" )
    {
      $('#incTelModif').show();
      $('#TelephoneModif').css('border-color', 'Red');
      isValid = false;
    }
    else
    {
      $('#incTelModif').hide();
      $('#TelephoneModif').css('border-color', 'Green');
    }

    if ( Email.trim() == "" )
    {
      $('#incEmailModif').show();
      $('#EmailModif').css('border-color', 'Red');
      isValid = false;
    }
    else
    {
      $('#incEmailModif').hide();
      $('#EmailModif').css('border-color', 'Green');
    }

    if ( Email.trim() != "" && !validateEmail(Email) )
    {
      $('#invalidEmailModif').show();
      $('#EmailModif').css('border-color', 'Red');
      isValid = false;
     }
     else if ( Email.trim() != "" && validateEmail(Email))
     {
      $('#invalidEmailModif').hide();
      $('#EmailModif').css('border-color', 'Green');
     }
     
      if( LinkedIn != "" && (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(LinkedIn) && LinkedIn.toLowerCase().indexOf("linkedin.com") > 0) )
      {
        $('#invalidLinkedInModif').hide();
        $('#LinkedInModif').css('border-color','Green'); 
        }
        else if ( LinkedIn != "" && !(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(LinkedIn) && LinkedIn.toLowerCase().indexOf("linkedin.com") > 0))
        {
        $('#invalidLinkedInModif').show();
        $('#LinkedInModif').css('border-color','Red');
        isValid = false;
      }
      else if ( LinkedIn == "" )
      {
        $('#invalidLinkedInModif').hide();
        $("#LinkedInModif").css('border-color', ' ');
      }
    
      if( Github != "" && (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(Github) && Github.toLowerCase().indexOf("github.com") > 0) )
      {
        $('#invalidGithubModif').hide();
        $('#GitHubModif').css('border-color','Green'); 
        }
        else if ( Github != "" && !(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(Github) && Github.toLowerCase().indexOf("github.com") > 0))
        {
        $('#invalidGithubModif').show();
        $('#GitHubModif').css('border-color','Red');
        isValid = false;
      }
      else if ( Github == "" )
      {
        $('#invalidGithubModif').hide();
        $("#GitHubModif").css('border-color', ' ');
      }

      return isValid;

}
  
  //mostrar en el dom
  function MostrarPostulantes() {
    $.ajax({
      method: "GET",
      url: "/api/Postulante/List/" + edicionActiva.idEdicion,
      //data: jQuery.parseJSON(postu),
      /* dataType:"json", */
      contentType: "application/json"
    })
  
    
    .done(function (data)
      {
    
        var html = ``;
     
  
      for (var i = 0; i < data.length; i++) 
      {
       
        html  += `<div class="col-lg-4 col-6 px-0 " id="ContenedorPadre" >
        <div class="card py-0 Paneles Selector">
 
          <div class="d-flex bd-highlight py-3 Paneles ">
            <div class="p-2 flex-shrink-2 align-items-center bd-highlight ">
 
              <canvas class=" rounded-circle mx-auto d-block postulante " title="${data[i].nombreyApellido} " data-userid="${JSON.stringify([i])}" width="75" height="75"></canvas>
 
                <div class="p-2 flex-shrink-1 d-inline-flex bd-highlight mt-2">
                <a class="${!data[i].gitHub ? 'd-none' : ''}" href="${data[i].gitHub}">  <span data-feather="github"class="mr-2"></span>  </a>
                <a class="${!data[i].linkedIn ? 'd-none' : ''}" href="${data[i].linkedIn}">  <span data-feather="linkedin"class="mr-2"></span>  </a>
                <a class="${!data[i].email ? 'd-none' : ''}" href="mailto:${data[i].email}" >  <span data-feather="mail"  class="mr-2"></span> </a>
 
 
           </div>
              </div>
 
              <div class="p-2 w-100 bd-highlight " >

              <div class="row">
              <div class="col-md-8">
              <h4 class="my-0 py-0 text-primary NombrePostulante"><small>${data[i].nombreyApellido}</small></h4>
              </div>
              <div class="col-auto">
              <button class="btn btn-light btn-modificar-postulante" data-id-postulante="`+data[i].idPostulante+`" ><span class="text-primary" data-feather="edit-2"></span></button>
              </div>
              </div>
              
 
              
              <h6 class="my-1 py-0"><small><b>Rol:</b> ${data[i].rol} - <b>Equipo:</b> ${data[i].equipo || 'N/A'}  </small></h6>
 
              <h6 class="my-1 py-0"><small><b>DNI:</b> ${data[i].dni}</small></h6>
              <h6 class="my-1 py-0"><small><b>Telefono:</b> ${data[i].telefono}</small></h6>
              
 
              <div class="infoCompleta Desplegable"
              <h6 class="my-1 py-0"><small><b>Calle:</b> ${data[i].domicilio.calle} ${data[i].domicilio.numeroCalle}</small></h6>
              <h6 class="my-1 py-0"><small><b>Departamento:</b> ${data[i].domicilio.departamento || 'N/A' } - <b>Piso:</b>${data[i].domicilio.piso || 'N/A' }</small></h6>
              <h6 class="my-1 py-0"><small><b>Localidad:</b> ${data[i].domicilio.localidad} </small></h6>
              <h6 class="my-1 py-0><small><b>Codigo Postal:</b>${data[i].domicilio.codigoPostal}</small><h6>
              <h6 class="my-1 py-0"><small><b>Provincia:</b> ${data[i].domicilio.provincia} </small></h6>
              <h6 class="my-1 py-0"><small><b>Pais:</b> ${data[i].domicilio.pais.descripcion} </small></h6>
              
 
              </div>
              </div>
            </div>
        </div>
 
      </div>`   

        }
       
    $("#ContenedorPadreFicha").html(html); 

    $(".infoCompleta").hide();

       $(".Selector").mouseover(function () {
         $(this).find(".infoCompleta").slideDown('slow');

       });

       $(".Selector").mouseleave(function () {
         $(this).find(".infoCompleta" ).slideUp('slow');
       });

    feather.replace()
    $(".postulante").letterpic({
      colors: ["#3333CC", "#F6F6F8", "#222", "#333"],
      font: "Tahoma",
      fontColor: "#FFFFFF",
      fontSize: 0.3
    });
  
    })
  }
  MostrarPostulantes();

 function Modify(idPostulante) {

  var res = validateModification();
  if (res == false) {
      return false;
  }

  if ( $('#DepartmentModif').val() == "" )
  {
    $('#DepartmentModif').val(null);
  }
  if ( $('#FloorModif').val() == "" )
  {
    $('#FloorModif').val(null);
  }
  if ( $('#GitHubModif').val() == "" )
  {
    $('#GitHubModif').val(null);
  }
  if ( $('#LinkedInModif').val() == "" )
  {
    $('#LinkedInModif').val(null);
  }
  if ( $('#TeamModif').val() == "" )
  {
    $('#TeamModif').val(null);
  }

    var obj = {

      domicilio : {
        calle : $('#StreetModif').val(),
        pais : {
          idPais : parseInt($("#CountryModif :selected ").val()),
          descripcion : $("#CountryModif :selected").text()

        },
        numeroCalle : $('#StreetNumberModif').val(),
        localidad : $('#LocationModif').val (),
        provincia : $('#ProvinceModif').val(),
        codigoPostal : $ ('#CPModif').val(),
        departamento : $('#DepartmentModif').val(),
        piso : $('#FloorModif').val(),
        
      },
      rol : $('#RoleModif').val(),
      dni : $('#DNIModif').val(),
      nombreyApellido: $('#FullnameModif').val(),
      email : $('#EmailModif').val(),       
      telefono : $('#TelephoneModif').val(),
      gitHub : $('#GitHubModif').val(),
      linkedIn : $('#LinkedInModif').val(),
      equipo : $('#TeamModif').val(),
      idEdicion : edicionActiva.idEdicion

    };

    console.log(postulante.idPostulante);
    console.log(postulante)

  $.ajax({
      url: "/api/Postulante/Update/"+idPostulante, 
      async: false,
      data: JSON.stringify(obj),
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      success : function () 
      {
        swal({
         position: 'top-center',
         type: 'success',
         title: 'El candidato ha sido modificado correctamente',
         showConfirmButton: false,
         timer: 2000
        
        })

  $('#CandidateModalModif').modal('hide');
  $('#candformmodif').trigger("reset");
  $("input, select", "#CandidateModalModif").css('border-color', '');

  MostrarPostulantes();

      }
  });

}

$(document).ready (function()
{
  $("#ContenedorPadreFicha").on("click", "button.btn-modificar-postulante", function() {

    var idPostulante = $(this).data('idPostulante');
  
    $.ajax({
      type: "GET",
      url: 'api/Postulante/'+idPostulante ,
      dataType: "json",
     
    }).then (function(candidate) {
  
      $('#FullnameModif').val(candidate.nombreyApellido);
      $('#DNIModif').val(candidate.dni);
      $('#RoleModif').val(candidate.rol);
      $('#StreetModif').val(candidate.domicilio.calle);
      $('#StreetNumberModif').val(candidate.domicilio.numeroCalle);
      $('#LocationModif').val(candidate.domicilio.localidad);
      $('#CPModif').val(candidate.domicilio.codigoPostal);
      $('#DepartmentModif').val(candidate.domicilio.departamento);
      $('#FloorModif').val(candidate.domicilio.piso);
      $('#ProvinceModif').val(candidate.domicilio.provincia);
      $("#CountryModif :selected").text(candidate.domicilio.pais.descripcion);
      $('#CountryModif :selected').val(candidate.domicilio.pais.idPais);
      $('#TelephoneModif').val(candidate.telefono);
      $('#EmailModif').val(candidate.email);
      $('#GitHubModif').val(candidate.gitHub);
      $('#LinkedInModif').val(candidate.linkedIn);
      $('#TeamModif').val(candidate.equipo);
      
      $("input, select", "#CandidateModalModif").css('border-color', '');
      $(".invalid-feedback", "#CandidateModalModif").hide();

      $('#CandidateModalModif').modal('show');
      $("#buttonModifCandidate").click(function() {
      
            Modify(idPostulante);
      })
  
      });
      
  });
  
})


