using System;
using System.Collections.Generic;
using BackOfficeLU.DAL;
using Microsoft.AspNetCore.Mvc;
using BackOfficeLU.Models;
using System.Linq;

namespace BackOfficeLU.Controllers
{
    public class EdicionController : ControllerBase
    {
        private readonly IEdicionRepository _edicionRepository;
        private readonly ILocacionRepository    _LocacionRepository;
        public EdicionController (IEdicionRepository _edicionRepositoryGenerado, ILocacionRepository _LocacionRepositoryGenerado)
        {
            this._edicionRepository = _edicionRepositoryGenerado;
            this._LocacionRepository = _LocacionRepositoryGenerado;
        }

        [HttpGet("{idEdicion}")]
        [Route("/api/Edicion/{idEdicion}")]
        public IActionResult Get(int idEdicion)
        {
            Edicion edicionValida = _edicionRepository.GetEdicion(idEdicion);
            if (edicionValida == null)
            {
                return BadRequest("Esta edición no existe");
            }      
            return Ok(edicionValida);
        }
        

        [HttpGet]
        [Route("/api/Edicion/")]
        public IEnumerable<Edicion> Get(bool soloActivas = false)
        {
            if (soloActivas == true) {
                return _edicionRepository.GetEdicionesActiva();
            }
            else {
                return _edicionRepository.GetAllEdition();
            }
        }

        [HttpGet]
        [Route("api/Edicion/List/")]
        public IEnumerable<int> GetEditions(int idEdicionExcluido = 0)
        {
                return _edicionRepository.GetNumberEdition(idEdicionExcluido);   
        }
        
        [HttpPost]
        [Route("/api/Edicion/Crear")]
        public IActionResult Post([FromBody] Edicion edicion)
        {
            if(this.ModelState.IsValid)
            { 
                if (edicion.FechaInicio > edicion.FechaFin)
                {
                    return BadRequest("Verifique la fecha de inicio y de culminación");
                }
                else {
                    _edicionRepository.Insert(edicion); 
                }
            }
            else 
            {
                return BadRequest(string.Join("<br/>", this.ModelState.Values.SelectMany(e=> e.Errors.Select(er=>er.ErrorMessage))));
            }
            return Ok();
        }

        [HttpPut]
        [Route("/api/Edicion/{idEdicion}")] 
        public IActionResult Put([FromBody] Edicion edicion, int idEdicion)
        {
            if(this.ModelState.IsValid)
            { 
                if (edicion.FechaInicio > edicion.FechaFin)
                {
                    return BadRequest("Verifique la fecha de inicio y de culminación");
                }
                else {
                edicion.IdEdicion = idEdicion;

                return Ok(_edicionRepository.Update(edicion));
                }
            }
            else 
            {
                return BadRequest(string.Join("<br/>", this.ModelState.Values.SelectMany(e=> e.Errors.Select(er=>er.ErrorMessage))));
            }
        }

        [HttpGet]
        [Route ("/api/Locacion")]
        public IEnumerable<Locacion> GetAll()
        {
            return _LocacionRepository.GetAllLocacion();
        }
    }
}