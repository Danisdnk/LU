using System.ComponentModel.DataAnnotations;

namespace BackOfficeLU.Models
{
    public class Responsable
    {
        public int? IdResponsable {get;set;}

        [Required]
        public int IdEdicion {get;set;}
        
        
        public string NombreyApellido {get;set;}

         
    }
}