using System;
using System.ComponentModel.DataAnnotations;

namespace BackOfficeLU.Models
{
    public class Edicion
    {
        public int IdEdicion { get; set; }
        
        [Required (ErrorMessage = "El campo Numero de edición es requerido")]
        public int NumeroEdicion {get;set;}

        [Required]
        public Locacion Locacion { get; set; }
 
        [Required(ErrorMessage = "El campo Fecha de Inicio es requerido")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/mm/yyyy}")]
        public DateTime? FechaInicio { get; set; }

        [Required(ErrorMessage = "El campo Fecha de Culminación es requerido")]
        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/mm/yyyy}")]
        public DateTime? FechaFin { get; set; }

        [Required(ErrorMessage = "El campo Numero de Postulante es requerido")]
        public int? CantidadPostulantes { get; set; }
        
    }
}
    
