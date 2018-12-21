using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Mail;
using System.Net;
using System.IO;

namespace BackOfficeLU.Utilidades
{
    public class EnvioMail
    {
        public void EnviarCorreoClase(EmailClase emailClase, string templatePath)
        {
            SmtpClient client = new SmtpClient("smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("bca43efcf06a72", "4ff096a4ac34d0"),
                EnableSsl = true
            };            
            MailMessage message = new MailMessage();

            message.From = new MailAddress("university@lagash.com");

            foreach (var email in emailClase.CorreoElectronicoPostulantes)
            {
                message.To.Add(new MailAddress(email));                
            }
            
            message.Subject = $"Infomacion Clase #{emailClase.NumeroClase} - {emailClase.Fecha.ToString("dd/MM/yyyy")}";
            
            string body = string.Empty;      
            using(StreamReader reader = new StreamReader(templatePath))  
            {  
                body = reader.ReadToEnd();  
            }  

            body = body.Replace("{NUMEROCLASE}", emailClase.NumeroClase.ToString());
            body = body.Replace("{FECHA}", emailClase.Fecha.ToString()); //replacing the required things  
            body = body.Replace("{RESPONSABLE1}", emailClase.Responsable1);
            body = body.Replace("{RESPONSABLE2}", emailClase.Responsable2);
            body = body.Replace("{TITULOCLASE}", emailClase.TituloClase);
            
            var html = "";
            for(int i= 0; i < emailClase.Temas.Length; i++)
            {
                html += "<li>" + emailClase.Temas[i] + "</li>";
            }

            body = body.Replace("{TEMAS}", html);
            message.Body = body;
            message.IsBodyHtml = true; 
  
            client.Send(message);
        }
    }
}