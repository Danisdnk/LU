using System;
using System.Collections.Generic;
using BackOfficeLU.DAL;
using Microsoft.AspNetCore.Mvc;
using BackOfficeLU.Models;
using System.Linq;
using BackOfficeLU.Utilidades;
using Microsoft.AspNetCore.Hosting;

namespace BackOfficeLU.Controllers
{
    public class ClasesController : ControllerBase
    {
        private readonly IClaseRepository repository;
        private readonly IResponsableRepository repositoryRes;
        private IHostingEnvironment _env;

        public ClasesController (IClaseRepository repository, IResponsableRepository repositoryRes, IHostingEnvironment env)
        {
            this.repository = repository;
            this.repositoryRes = repositoryRes;
            this._env = env;
        }

        
        [HttpPost]
        [Route("/api/Clase/Create")]/*  */
        public bool Post([FromBody] Clase clase)
        {
            if(this.ModelState.IsValid) 
            {
                try
                {
                    Program.ProcessLessonInsert(clase, repository);
                }

                catch (Exception e)
                {
                    Console.WriteLine("{0} Ha ocurrido un error.", e);
                    return false;
                    
                }
                repository.InsertClase(clase);
                return true;
            }

             else {

                var tt = this.ModelState.Select(x => x.Value.Errors)
                           .Where(y=>y.Count>0)
                           .ToList();
                return false;
            }

        }

        [HttpGet]
        [Route("/api/Clase/Fechas/{idEdicion}")]
        public IEnumerable<DateTime> GetFechasClases (int idEdicion)
        {
            return repository.GetFechasClases(idEdicion);    
        }

        [HttpGet]
        [Route("/api/Clase/FechasCalendario/{idEdicion}")]
        public IEnumerable<FechasCalendario> GetFechasCalendario(int idEdicion )
        {
            return repository.GetAllClases(idEdicion).Select(x => new FechasCalendario() {
                title = x.TituloClase, 
                allDay = true,
                id = x.IdClase.Value,
                start = x.Fecha,
                className = "info"
            });
        }

        [HttpGet]
        [Route("/api/Clase/{id}")]
        public Clase GetClase(int id)
        {
            return repository.GetClase(id);    
        }


        [HttpGet]
        [Route("/api/Clase/List")]
        public IEnumerable<Clase> GetClasesList(int idEdicion, DateTime fechaInicio, DateTime fechaFin)
        {
            return repository.GetClasesEdicionPorFechas(idEdicion, fechaInicio, fechaFin);
        }

        [HttpGet]
        [Route("/api/Clase/List/{idEdicion}")]
        public IEnumerable<Clase> GetClasesPorEdicion(int idEdicion)
        {
            return repository.GetAllClases(idEdicion);
        }


        [Route("/api/Clase/Responsables/{idEdicion}")]
        public IEnumerable <Responsable> GetResponsables (int idEdicion)
        {
            return repositoryRes.GetAllResponsables(idEdicion);    
        }

        [HttpPut]
        [Route("/api/Clase/{idClase}")]
        public IActionResult Put([FromBody] Clase clase, int idClase)
        {

             if(this.ModelState.IsValid)
            { 
                clase.IdClase = idClase;
                return Ok(repository.Update(clase));                
            }
            else 
            {
                var errors = string.Join("<br/>", this.ModelState.Values.SelectMany(e=> e.Errors.Select(er=>er.ErrorMessage)));
                return BadRequest(errors);
            }
            
        }

        [HttpDelete]
        [Route("/api/Clase/{id}")]
        public void Delete(int id)
        {
            repository.Delete(id);
        } 
      
        [HttpPost]
        [Route("/api/Clase/{idclase}/EnviarMail")]
        public void Post( int idclase)
        {
            EnvioMail envioMail = new EnvioMail();
            EmailClase Correo = new EmailClase();
            Clase clase = repository.GetClase(idclase);

            Correo.Fecha = clase.Fecha;
            Correo.NumeroClase = clase.NumeroClase.Value;
            Correo.Responsable1 = clase.Responsable1.NombreyApellido;

            if (clase.Responsable2 != null) 
            {
                Correo.Responsable2 = clase.Responsable2.NombreyApellido; 
            }
            else 
            {
                Correo.Responsable2 = "N/A";
            }

            Correo.Temas = clase.Temas.Select(x => x.TituloTema).ToArray();
            Correo.TituloClase = clase.TituloClase;

            Correo.CorreoElectronicoPostulantes = new string[1] { "Deixi@gmail.com" };

            envioMail.EnviarCorreoClase(Correo, System.IO.Path.Combine(_env.ContentRootPath, "CorreoDelDia.html"));
        }

    }
}
