using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace BackOfficeLU.Models
{

    
    public class Clase
    {
        public int? IdClase {get;set;}

        [Required]
        public int? NumeroClase {get; set;}

        [Required]
        public int IdEdicion {get;set;}
        
        [Required]
        public Responsable Responsable1 {get;set;}
        
        public Responsable Responsable2 {get;set;}        
        
        [Required(ErrorMessage = "La fecha es obligatoria")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0: mm/dd/yy}", ApplyFormatInEditMode = true)] 
        public DateTime Fecha {get;set;}

        [Required(ErrorMessage = "El titulo es obligatorio")]
        [StringLength(60, ErrorMessage = "El titulo del tema no puede contener más de 60 caracteres. ")]
       public string TituloClase {get;set;}

       [Required(ErrorMessage = "Debe ingresar al menos un Tema")]
        public IEnumerable<Tema> Temas {get;set;}
    }
}