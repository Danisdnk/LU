//FEATURES
//feature imagen .demo es la clase a la que refiere

$(".demo").letterpic({
  colors: ["#3333CC", "#F6F6F8", "#222", "#333"],
  font: "Tahoma",
  fontColor: "#FFFFFF",
  fontSize: 0.3
});

$(document).ready(function () {

  var divResultados = document.querySelector("div.resultados");
  
  var iniciales = {
    inicial: ["Pau", "c", "m"],
    inicial2: ["c", "q", "g"]
  };
  //mostrar en el dom
  function MostrarPostulantes() {
    $.ajax({
      method: "GET",
      url: "/api/Postulante/List",
      //data: jQuery.parseJSON(postu),
      contentType: "application/json"

    })
      .then(response => {

        if (response.status == 200) {
          return response.json();
        }
        throw response.status;
      })
      .then(nPostulante => {

        nPostulante.results.forEach(function (ArrPost) {
          var nodo = armarDOM(ArrPost);
          divResultados.appendChild(nodo);

/*           var html = "";
          console.log(ArrPost);

          for (var i = 0; i < nPostulante.length; i++) {
           
            html += `<div class="col-4 px-0 ContenedorPadre">
        <div class="card py-0 Paneles " >
        <div class="card py-0 Paneles style="width: 30rem;" >
          <div class="d-flex bd-highlight py-3 Paneles ">
            <div class="p-2 flex-shrink-2 align-items-center bd-highlight ">
              <canvas class=" rounded-circle mx-auto d-block demo ${imagen}" title="${nPostulante[i].inicial}, ${npostulante[i].inicial2}" width="75" height="75"></canvas>
    
              <div class="p-2 flex-shrink-1 d-inline-flex
              bd-highlight mt-2">
              <span data-feather="facebook" class="mr-2"></span> 
               <span data-feather="linkedin"  class="mr-2"></span> 
                <span data-feather="mail"  class="mr-2"></span>
                <span data-feather="github"  class="mr-2"></span>
         </div>
              </div>
            <div class="p-2 w-100 bd-highlight">
              <h4 class="my-0 py-0 text-primary NombrePostulante"><small>${nPostulante[i].nombre}</small></h4>
              <h6 class="my-1 py-0"><small>Arquitecto${nPostulante[i].rol} </small></h6>
              <h6 class="my-1 py-0"><small>DNI ${nPostulante[i].apellido}</small></h6>
              <h6 class="my-1 py-0"><small> edad ${nPostulante[i].objeto.dni}</small></h6>
            
            </div>
            
          </div>
          </div>
          </div>
    `;
          }
        
 */       
              $("#ContenedorPadreFicha").html(html);

        
          feather.replace();
        
        });
      })
}
        console.log(ArrPost);
        ////////////////////////////// Helpers
function armarDOM(ArrPost){
  const divContenedor = document.createElement("div");
  const divContenido = document.createElement("div");

  divContenido.innerHTML = "<strong>"+ ArrPost.apellido +"</strong>";

  divContenedor.appendChild(divContenido);
  divContenedor.classList.add("item");

  return divContenedor;
}

MostrarPostulantes();
      } 

      
 /*  //_____________________________________________________________________________________________________________________________
  //CREAR POSTULANTE
  $("#botonGuardarPostulante").click(function () {
          $('.invalid-feedback').html('');

          var objeto = {
            idEdicion: 5,
            domicilio: {
              idDomicilio: 7,
              calle: $("#DomicilioPostulante").val(),
              numeroCalle: $("#StreetNumber").val(),
              piso: null,
              departamento: null,
              localidad: $("#Location").val(),
              provincia: $("#Province").val(),
              codigoPostal: $("#CP").val(),
              pais: {
                idPais: 1,
                iso: "AR",
                descripcion: "Argentina"
              }
            },
            rol: $("#Role").val(),
            dni: $("#DNI").val(),
            nombre: $("#NombrePostulante").val(),
            apellido: $("#Surname").val(),
            email: $("#EmailAdress").val(),
            telefono: $("#Telephone").val(),
            gitHub: $("#Git").val(),
            linkedIn: $("#Linkedin").val(),
            equipo: $("#Team").val()
          }
            ;
          //datos del objeto
          $.ajax({
            method: "POST",
            url: "api/Postulante/Add",
            data: JSON.stringify(objeto),
            contentType: "application/json"
          })
            .then(function () {
              $('.invalid-feedback').html('')
              alert('clase creada');

              swal({
                position: 'top-center',
                type: 'success',
                title: 'El postulante fue guardado',
                showConfirmButton: false,
                timer: 1500
              })

              $("#IdPostulante").val();
              $("#NombrePostulante").val();
              $("#Surname").val();
              $("#DNI").val();
              $("#Telephone").val();
              $("#Role").val();
              $("#DomicilioPostulante").val();
              $("#RegionPostulante").val();
              $("#Location").val();
              $("#Git").val();
              $("#EmailAdress").val();
              $("#Linkedin").val();
              $("#Team").val();

            })

            .fail(function (jqXHR, textStatus, errorThrown) {
              $('.invalid-feedback').html("<div class='alert alert-danger'>" + jqXHR.responseText + "</div>");
            })

          $("#PostulanteModal").modal('hide');

        });

    MostrarPostulantes();
  });

 *///