using System.Collections.Generic;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using BackOfficeLU.DAL;
using BackOfficeLU.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BackOfficeLU.Controllers
{
    public class PostulanteController : ControllerBase
    {

        private readonly IPostulanteRepository repository;

        public PostulanteController (IPostulanteRepository repository)
        {
            this.repository = repository;
        }

        
        [HttpPost]
        [Route("/api/Postulante/Add")]
        public bool Post([FromBody] Postulante postulante)
        {

            if(this.ModelState.IsValid) 
            {
                try
                {
                    Program.ProcessPostulante(postulante, repository);
                }

                catch (Exception e)
                {
                    Console.WriteLine("{0} Ha ocurrido un error.", e);
                    return false;
                    
                }

                repository.InsertPostulante(postulante, postulante.IdEdicion, postulante.Domicilio.Pais.IdPais);
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
        [Route("/api/Postulante/List/{idEdicion}")]
        public IEnumerable <Postulante> GetPostulantes(int idEdicion)
        {
            return repository.GetPostulantes(idEdicion);    
        }


        [HttpGet]
        [Route("/api/Postulante/{idPostulante}")]
        public Postulante GetPostulante(int idPostulante)
        {
            return repository.GetPostulante(idPostulante);    
        }
        
        [HttpGet]
        [Route("/api/Paises/List")]

        public IEnumerable<Pais> GetPaises ()
        {
            return repository.GetPaises();
        }

        [HttpPut]
        [Route("/api/Postulante/Update/{idPostulante}")] 
        public bool Put([FromBody] Postulante postulante, int idPostulante)
        {

            if(this.ModelState.IsValid) 
            {
                try
                {
                    Program.ProcessPostulantePut(postulante, repository);
                }

                catch (Exception e)
                {
                    Console.WriteLine("{0} Exception caught.", e);
                    return false;
                    
                }

                postulante.IdPostulante = idPostulante;
                repository.Update(postulante, idPostulante, postulante.Domicilio.Pais.IdPais);
                return true;

            }

             else {

                var tt = this.ModelState.Select(x => x.Value.Errors)
                           .Where(y=>y.Count>0)
                           .ToList();
                           return false;
            }
            
        }
        
    }
}