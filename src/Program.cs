using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BackOfficeLU.DAL;
using BackOfficeLU.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace BackOfficeLU
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
            
        }

        public static void ProcessPostulante(Postulante postulante, IPostulanteRepository repository)
            {
            
            if ( postulante.Domicilio.Pais.IdPais == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Calle == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.NumeroCalle == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Localidad == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Provincia == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.CodigoPostal == null)
            {
                throw new ArgumentNullException();
            }

            if (postulante.Rol == null)
            {
                throw new ArgumentNullException();
            }
            if (!( postulante.Rol == "BackEnd" || postulante.Rol == "FrontEnd" || postulante.Rol == "FullStack"))
            {
                throw new System.ArgumentException("El rol solo puede ser : 'FrontEnd', 'BackEnd' o 'FullStack'", "postulante.Rol");
            }

            var postulantes = repository.GetPostulantes(postulante.IdEdicion);
            bool? find = postulantes.Any(item => item.DNI == postulante.DNI);

            if (postulante.DNI != null && find == true )
            {
                throw new System.ArgumentException("Ya existe un postulante con el DNI ingresado", "postulante.DNI");
            }

            if (postulante.DNI == null)
            {
                throw new ArgumentNullException();
            }

            if (postulante.NombreyApellido == null)
            {
                throw new ArgumentNullException();
            }

            if (postulante.Email == null)
            {
                throw new ArgumentNullException();
            }
            if (postulante.Telefono == null)
            {
                throw new ArgumentNullException();
            }

            }

            public static void ProcessPostulantePut(Postulante postulante, IPostulanteRepository repository)
            {
            
            if ( postulante.Domicilio.Pais.IdPais == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Calle == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.NumeroCalle == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Localidad == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.Provincia == null)
            {
            throw new ArgumentNullException();
            }
            if ( postulante.Domicilio.CodigoPostal == null)
            {
                throw new ArgumentNullException();
            }

            if (postulante.Rol == null)
            {
                throw new ArgumentNullException();
            }
            if (!( postulante.Rol == "BackEnd" || postulante.Rol == "FrontEnd" || postulante.Rol == "FullStack"))
            {
                throw new System.ArgumentException("El rol solo puede ser : 'FrontEnd', 'BackEnd' o 'FullStack'", "postulante.Rol");
            }

            if (postulante.DNI == null)
            {
                throw new ArgumentNullException();
            }
            if (postulante.NombreyApellido == null)
            {
                throw new ArgumentNullException();
            }

            if (postulante.Email == null)
            {
                throw new ArgumentNullException();
            }
            if (postulante.Telefono == null)
            {
                throw new ArgumentNullException();
            }

            }

        public static void ProcessLessonInsert(Clase clase, IClaseRepository repository)
        {

            if ( clase.Fecha == null )
            { 
            throw new ArgumentNullException();
            }
            int ClaseRepetida = repository.SearchClaseRepetida(clase);

            if ( clase.Fecha != null && ClaseRepetida == -1 )
            {
                throw new System.ArgumentException("Ya existe una clase con la fecha ingresada");
            }

            var numclases = repository.GetAllClases(clase.IdEdicion);

            if (clase.NumeroClase == null )
            {
                throw new ArgumentNullException();
            }
            
            if (numclases !=null)
            {
                foreach ( var item in numclases)
                {
                    if ( item.NumeroClase == clase.NumeroClase)
                    {
                    throw new System.ArgumentException("La clase número "+clase.NumeroClase+" ya existe. ");
                    }
                }
            }
            
            if ( clase.Responsable1 == null && (clase.Responsable2 == null || clase.Responsable2 != null))
            {
            throw new ArgumentNullException();
            }

            if( clase.Responsable1 != null && clase.Responsable2!=null)
            {
                if( clase.Responsable1.NombreyApellido.ToLower() == clase.Responsable2.NombreyApellido.ToLower())
                {
                    throw new System.ArgumentException("'Responsable Principal' y 'Responsable Secundario' no deben coincidir.");
                }
            }

            if ( clase.TituloClase == null)
            {
            throw new ArgumentNullException();
            }


            if (clase.Temas == null)
            {
                throw new ArgumentNullException();
            }

        }

        public static void ProcesoEdicionPost(Edicion edicion, IEdicionRepository _edicionRepository)
        {
            
            if (edicion.FechaInicio == null)
            {
            throw new ArgumentNullException();
            }
            if (edicion.FechaInicio == null)
            {
            throw new ArgumentNullException();
            }
            if(edicion.FechaInicio > edicion.FechaFin)
            {
                throw new ArgumentException("Verifique la fecha de inicio y de culminación");
            }
            if (edicion.CantidadPostulantes == null)
            {
            throw new ArgumentNullException();
            }
            var Cantidad = int.Parse(Console.ReadLine()); 
            if (edicion.CantidadPostulantes != Cantidad)
            {
                throw new ArgumentException("El campo Numero de Postulante debe ser un numero entero");
            }
            if (edicion.Locacion.Nombre == null)
            {
            throw new ArgumentNullException();
            }  

        } 

        public static void ProcesoEdicionPut(Edicion edicion, IEdicionRepository _edicionRepository)
        {
            
            if (edicion.FechaInicio == null)
            {
            throw new ArgumentNullException();
            }
            if (edicion.FechaInicio == null)
            {
            throw new ArgumentNullException();
            }
            if(edicion.FechaInicio > edicion.FechaFin)
            {
                throw new ArgumentException("Verifique la fecha de inicio y de culminación");
            }
            if (edicion.CantidadPostulantes == null)
            {
            throw new ArgumentNullException();
            }
            var Cantidad = int.Parse(Console.ReadLine()); 
            if (edicion.CantidadPostulantes != Cantidad)
            {
                throw new ArgumentException("El campo Numero de Postulante debe ser un numero entero");
            }
            if (edicion.Locacion.Nombre == null)
            {
            throw new ArgumentNullException();
            }  

        } 

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();

    }

    
}
