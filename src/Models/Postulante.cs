using System.ComponentModel.DataAnnotations;

namespace BackOfficeLU.Models
{
    public class Postulante
    {
        public int IdPostulante {get;set;}

        [Required]
        public int IdEdicion {get;set;}

        [Required]
        public string NombreyApellido {get;set;}
        
        [Required]
        public Domicilio Domicilio {get;set;}

        [Required]
        public string Rol {get;set;}
        
        [Required]
        public string DNI {get;set;}
        
        [Required(ErrorMessage = "El Email es obligatorio")]
        [EmailAddress(ErrorMessage = "Por favor, ingrese una dirección de Email válida")]
        public string Email { get; set; }

        [Required]
        public string Telefono {get;set;}
  
        public string GitHub {get;set;}
        public string LinkedIn {get;set;}
        public string Equipo {get;set;}
        
    }
}