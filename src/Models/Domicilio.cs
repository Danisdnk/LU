using System.ComponentModel.DataAnnotations;

namespace BackOfficeLU.Models
{
    public class Domicilio
    {
        public int IdDomicilio {get;set;}
        [Required]
        public string Calle {get;set;}
        [Required]
        public int? NumeroCalle {get;set;}

        public string Piso {get;set;}

        public int? Departamento {get;set;}

        [Required]
        public string Localidad {get;set;}

        [Required]
        public string Provincia {get;set;}

        [Required]
        public string CodigoPostal {get;set;}

        [Required]
        public Pais Pais {get;set;}
        
    }
}