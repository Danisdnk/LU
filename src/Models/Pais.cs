using System.ComponentModel.DataAnnotations;

namespace BackOfficeLU.Models
{
    public class Pais
    {
        public int? IdPais {get;set;}
        
        [Required]
        public string Descripcion {get;set;}
    }
}