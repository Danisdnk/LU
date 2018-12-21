using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;

namespace BackOfficeLU.Utilidades
{
    public class EmailClase
    {
        public string[] CorreoElectronicoPostulantes { get; set; }
        public int NumeroClase {get; set;}
        
        public string Responsable1 {get;set;}
        public string Responsable2 {get;set;}        
        
        public DateTime Fecha {get;set;}

       public string TituloClase {get;set;}

        public string[] Temas {get;set;}
    }
}