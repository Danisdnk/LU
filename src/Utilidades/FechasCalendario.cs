using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.IO;

namespace BackOfficeLU.Utilidades
{
    public class FechasCalendario
    {  
        public int id {get; set;}
        
        public string title {get;set;}
        public DateTime start {get;set;}        
        
        public bool allDay {get;set;}

       public string className {get;set;}

    }
}